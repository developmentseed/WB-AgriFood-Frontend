import { delaySeconds } from ".";
import { ChatMessage, ChatThreadRunStatus, DataType } from "../types/chat";
import { AssistantMessage } from "../types/assistant-message";

const API_BASE_URL = import.meta.env.WB_AGRIFOOD_API_BASE_URL;
export const MAX_ATTEMPTS = 25;
export const RETRY_DELAY_SECONDS = 5;

async function fetchAPI<T>(
  endpoint: string,
  method: string,
  body?: Record<string, unknown>,
  maxAttempts: number = MAX_ATTEMPTS,
): Promise<T> {
  let attempts = 0;
  while (attempts < maxAttempts) {
    attempts += 1;
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        if (response.status === 503) {
          // If it's a 503 error and not the last attempt, it will retry after the delay
          if (attempts < maxAttempts) {
            await delaySeconds(RETRY_DELAY_SECONDS);
            continue;
          }
        } else {
          // For any error other than 503, fail immediately
          throw new Error(
            `Failed to fetch from ${endpoint} with status: ${response.status}`,
          );
        }
      }

      // If response is okay, return the parsed JSON
      return (await response.json()) as T;
    } catch (error) {
      // For errors caught from the fetch block, including non-503 errors thrown above
      throw new Error(`Error fetching from ${endpoint}`);
    }
  }
  // If the loop completes without returning or throwing for a 503 error, throw a general error
  throw new Error(
    `Failed to fetch from ${endpoint} after ${maxAttempts} attempts.`,
  );
}

export async function createThread(query: string): Promise<string> {
  const thread = await fetchAPI<{ id: string }>("/threads", "POST", { query });
  return thread.id;
}

export async function fetchThreadRunStatus(
  threadId: string,
  runId: string,
): Promise<ChatThreadRunStatus> {
  const { status } = await fetchAPI<{ status: string }>(
    `/threads/${threadId}/runs/${runId}/status`,
    "GET",
  );

  if (
    !["in_progress", "completed", "queue", "requires_action"].includes(status)
  ) {
    throw new Error(`Unexpected status: ${status}`);
  }

  return status as ChatThreadRunStatus;
}

export async function postMessage(
  threadId: string,
  message: string,
): Promise<{
  runId: string;
}> {
  const { id: runId } = await fetchAPI<{ id: string }>(
    `/threads/${threadId}/messages`,
    "POST",
    {
      message,
    },
  );
  return {
    runId,
  };
}

export async function fetchMessages(threadId: string): Promise<ChatMessage[]> {
  const assistantMessages = await fetchAPI<AssistantMessage[]>(
    `/threads/${threadId}/messages`,
    "GET",
  );

  const messages = assistantMessages.map((m) => {
    const fullMarkdown = m.content[0].text.value;

    let json;
    let metadata = null;
    let markdown = fullMarkdown;

    const jsonMarker = "```json";

    if (fullMarkdown.indexOf(jsonMarker) > -1) {
      const jsonStart = fullMarkdown.indexOf(jsonMarker) + 7;
      const jsonEnd = fullMarkdown.indexOf("```", jsonStart);
      json = fullMarkdown.substring(jsonStart, jsonEnd).replace(/\n/g, "");
      try {
        const parsedJson = JSON.parse(json) as Record<string, unknown>;
        if (Array.isArray(parsedJson)) {
          metadata = parsedJson as DataType[];
        }
      } catch (error) {
        // do nothing when JSON parsing fails
      }

      // Strip out the JSON from the markdown
      markdown =
        `${fullMarkdown.substring(0, jsonStart - 7)}${fullMarkdown.substring(
          jsonEnd + 3,
        )}`.trim();
    }

    return {
      id: m.id,
      role: m.role,
      created_at: m.created_at,
      markdown,
      metadata,
    };
  });

  return messages;
}
