import { useReducer } from "react";

type Role = "assistant" | "user";

export type Message = {
  id: string;
  assistant_id: string | null;
  content: Content[];
  created_at: number;
  file_ids: string[];
  metadata: Record<string, unknown>; // Object with unknown structure
  object: string;
  role: Role;
  run_id: string | null;
  thread_id: string;
};

type Content = {
  text: {
    value: string;
  };
  type: "text";
};

export type ChatStatus = "idle" | "loading" | "error";

interface ChatState {
  status: ChatStatus;
  threadId: string | null;
  currentMessages: Message[];
}

type ChatAction =
  | { type: "SET_STATUS"; payload: ChatStatus }
  | {
      type: "START_THREAD";
      payload: {
        threadId: string;
      };
    }
  | {
      type: "RECEIVE_MESSAGES";
      payload: Message[];
    };

const initialState: ChatState = {
  status: "idle",
  threadId: null,
  currentMessages: [],
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "SET_STATUS": {
      return {
        ...state,
        status: action.payload,
      };
    }
    case "START_THREAD": {
      return {
        ...state,
        threadId: action.payload.threadId,
      };
    }
    case "RECEIVE_MESSAGES": {
      return {
        ...state,
        currentMessages: action.payload,
      };
    }
    default:
      return state;
  }
};

export default function useChatReducer() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const sendQuery = async (query: string) => {
    try {
      dispatch({
        type: "SET_STATUS",
        payload: "loading",
      });

      let threadId = state.threadId;
      if (!threadId) {
        const response = await fetch(
          `https://hfddhc9q1b.execute-api.us-east-1.amazonaws.com/threads`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          },
        );
        const thread = (await response.json()) as { id: string };

        threadId = thread.id;

        dispatch({
          type: "START_THREAD",
          payload: {
            threadId,
          },
        });
      }

      await fetch(
        `https://hfddhc9q1b.execute-api.us-east-1.amazonaws.com/threads/${threadId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: query,
          }),
        },
      ).then((response) => response.json());

      const messages = (await fetch(
        `https://hfddhc9q1b.execute-api.us-east-1.amazonaws.com/threads/${threadId}/messages`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((response) => response.json())) as Message[];

      dispatch({
        type: "RECEIVE_MESSAGES",
        payload: messages.sort((a, b) => a.created_at - b.created_at),
      });

      dispatch({
        type: "SET_STATUS",
        payload: "idle",
      });
    } catch (error) {
      console.error("Error fetching thread ID:", error);
      dispatch({
        type: "SET_STATUS",
        payload: "error",
      });
    }
  };

  return { state, sendQuery: sendQuery as (query: string) => void };
}
