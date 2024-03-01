export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  markdown: string;
  metadata: Record<string, unknown> | null;
  role: ChatRole;
};

export type Content = {
  text: {
    value: string;
  };
  type: "text";
};

export type ChatStatus = "idle" | "loading" | "error";

export type ChatThreadRunStatus = "in_progress" | "completed";
