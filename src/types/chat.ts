export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  assistant_id: string | null;
  content: Content[];
  created_at: number;
  file_ids: string[];
  metadata: Record<string, unknown>; // Object with unknown structure
  object: string;
  role: ChatRole;
  run_id: string | null;
  thread_id: string;
};

export type Content = {
  text: {
    value: string;
  };
  type: "text";
};

export type ChatStatus = "idle" | "loading" | "error";

export type ChatThreadRunStatus = "in_progress" | "completed";
