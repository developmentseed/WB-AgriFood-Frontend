import { useReducer, useCallback } from "react";
import { toast } from "react-toastify";
import { ChatStatus, ChatMessage } from "../types/chat";
import {
  MAX_ATTEMPTS,
  RETRY_DELAY_SECONDS,
  createThread,
  fetchMessages,
  fetchThreadRunStatus,
  postMessage,
} from "../utils/api";
import { delaySeconds, reducerLogger } from "../utils";

interface ChatState {
  status: ChatStatus;
  threadId: string | null;
  runId: string | null;
  runStatus: string | null;
  currentQuery: string | null;
  currentMessages: ChatMessage[];
}

type ChatAction =
  | { type: "SEND_QUERY_START"; payload: { query: string } }
  | { type: "SEND_QUERY_SUCCESS"; payload: { messages: ChatMessage[] } }
  | { type: "SEND_QUERY_ERROR" }
  | {
      type: "START_THREAD";
      payload: {
        threadId: string;
      };
    }
  | {
      type: "START_RUN";
      payload: {
        runId: string;
      };
    }
  | {
      type: "RECEIVE_MESSAGES";
      payload: ChatMessage[];
    };

const initialState: ChatState = {
  status: "idle",
  threadId: null,
  runId: null,
  runStatus: null,
  currentQuery: null,
  currentMessages: [],
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "SEND_QUERY_START": {
      return {
        ...state,
        currentQuery: action.payload.query,
        currentMessages: [
          ...state.currentMessages,
          // Add a processing message to the list of messages
          {
            id: "processing",
            created_at: Date.now(),
            markdown: action.payload.query,
            metadata: null,
            role: "user",
          },
        ],
        status: "loading",
      };
    }
    case "START_THREAD": {
      return {
        ...state,
        threadId: action.payload.threadId,
      };
    }
    case "START_RUN": {
      return {
        ...state,
        runId: action.payload.runId,
      };
    }
    case "SEND_QUERY_SUCCESS": {
      return {
        ...state,
        status: "idle",
        currentQuery: null,
        currentMessages: action.payload.messages,
      };
    }
    case "SEND_QUERY_ERROR": {
      return {
        ...state,
        status: "error",
        // Clear the processing message
        currentMessages: state.currentMessages.filter(
          (m) => m.id !== "processing",
        ),
      };
    }
    default:
      return state;
  }
};

export default function useChat() {
  const [state, dispatch] = useReducer(
    reducerLogger(chatReducer),
    initialState,
  );
  const sendQuery = useCallback(
    async (query: string) => {
      try {
        dispatch({
          type: "SEND_QUERY_START",
          payload: {
            query,
          },
        });

        let threadId = state.threadId;
        if (!threadId) {
          threadId = await createThread(query);

          dispatch({
            type: "START_THREAD",
            payload: {
              threadId,
            },
          });
        }

        const { runId } = await postMessage(threadId, query);

        dispatch({
          type: "START_RUN",
          payload: {
            runId,
          },
        });

        let runStatus = "in_progress";
        let attempts = 0;
        while (runStatus !== "completed" && attempts < MAX_ATTEMPTS) {
          attempts += 1;
          runStatus = await fetchThreadRunStatus(threadId, runId);
          if (runStatus !== "completed") {
            await delaySeconds(RETRY_DELAY_SECONDS);
          }
        }

        const messages = await fetchMessages(threadId);

        dispatch({
          type: "SEND_QUERY_SUCCESS",
          payload: {
            messages: messages.sort((a, b) => a.created_at - b.created_at),
          },
        });
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
        dispatch({
          type: "SEND_QUERY_ERROR",
        });
      }
    },
    [state.threadId],
  );

  return { state, sendQuery: sendQuery as (query: string) => void };
}
