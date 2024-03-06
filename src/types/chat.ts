export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  created_at: number;
  markdown: string;
  metadata: DataType[] | null;
  role: ChatRole;
};

export type Content = {
  text: {
    value: string;
  };
  type: "text";
};

export type ChatStatus = "idle" | "loading" | "error";

export type ChatThreadRunStatus =
  | "in_progress"
  | "requires_action"
  | "queue"
  | "completed";

export type DataType = {
  id: string;
  name: string;
  type?: "app" | "dataset" | "microdataset" | "video" | "project";
  _distance?: number;
  description?: string;
  summary?: string;
  text_to_embed?: string;
  explanation?: string;
  url?: string;
  link?: string;
};
