import { delaySeconds } from ".";
import { ChatMessage, ChatThreadRunStatus, DataType } from "../types/chat";
import { AssistantMessage } from "../types/assistant-message";

const API_BASE_URL = "https://hfddhc9q1b.execute-api.us-east-1.amazonaws.com";
const MAX_RETRIES = 10;
const RETRY_DELAY_SECONDS = 5;

async function fetchAPI<T>(
  endpoint: string,
  method: string,
  body?: Record<string, unknown>,
  maxRetries: number = MAX_RETRIES, // Include maxRetries parameter with a default of 10 retries
): Promise<T> {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        if (response.status === 503) {
          // Only retry on 503 errors
          throw new Error(
            `Service Unavailable - Retry attempt ${attempts + 1}`,
          );
        } else {
          attempts = maxRetries; // Exit loop on non-503 errors
          throw new Error(
            `Failed to fetch from ${endpoint} with status: ${response.status}`,
          );
        }
      }

      return (await response.json()) as T;
    } catch (error) {
      attempts++;
      if (attempts >= maxRetries) {
        throw new Error(`Failed to fetch from ${endpoint}`);
      }
      await delaySeconds(RETRY_DELAY_SECONDS);
    }
  }
  throw new Error("Unexpected loop exit"); // Safety net, should not reach here
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
