export type AssistantMessage = {
  id: string;
  assistant_id: string | null;
  content: Content[];
  created_at: number;
  file_ids: string[];
  metadata: Record<string, unknown>;
  object: string;
  role: "assistant" | "user";
  run_id: string | null;
  thread_id: string;
};

type Content = {
  text: TextContent;
  type: "text";
};

type TextContent = {
  annotations: unknown[];
  value: string;
};
