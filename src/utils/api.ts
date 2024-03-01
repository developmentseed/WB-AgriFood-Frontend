import { ChatMessage, ChatThreadRunStatus } from "../types/chat";

const API_BASE_URL = "https://hfddhc9q1b.execute-api.us-east-1.amazonaws.com";

async function fetchAPI<T>(
  endpoint: string,
  method: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  return response.json() as Promise<T>;
}

export async function createThread(query: string): Promise<string> {
  const thread = await fetchAPI<{ id: string }>("/threads", "POST", { query });
  return thread.id;
}

export async function fetchThreadRunStatus(
  threadId: string,
  runId: string,
): Promise<ChatThreadRunStatus> {
  const { status } = await fetchAPI<{ status: ChatThreadRunStatus }>(
    `/threads/${threadId}/runs/${runId}/status`,
    "GET",
  );
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
