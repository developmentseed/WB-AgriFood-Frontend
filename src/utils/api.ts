import { delaySeconds } from ".";
import { ChatMessage, ChatThreadRunStatus } from "../types/chat";

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
      console.error(`Attempt ${attempts} failed: ${(error as Error).message}`);
      if (attempts >= maxRetries) {
        throw new Error(
          `Failed to fetch from ${endpoint} after ${maxRetries} attempts`,
        );
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

  if (status !== "in_progress" && status !== "completed") {
    throw new Error(`Unexpected status: ${status}`);
  }

  return status;
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
  return fetchAPI<ChatMessage[]>(`/threads/${threadId}/messages`, "GET");
}
