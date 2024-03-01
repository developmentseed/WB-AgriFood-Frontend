import { useReducer, useCallback } from "react";

import { ChatStatus, ChatMessage } from "../types/chat";
import {
  createThread,
  fetchMessages,
  fetchThreadRunStatus,
  postMessage,
} from "../utils/api";
import { delaySeconds } from "../utils";

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
          {
            id: "processing",
            assistant_id: null,
            content: [
              {
                text: {
                  value: action.payload.query,
                },
                type: "text",
              },
            ],
            created_at: Date.now(),
            file_ids: [],
            metadata: {},
            object: "message",
            role: "user",
            run_id: null,
            thread_id: state.threadId!,
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
      };
    }
    default:
      return state;
  }
};

export default function useChat() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
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
        while (runStatus !== "completed") {
          runStatus = await fetchThreadRunStatus(threadId, runId);
          if (runStatus !== "completed") {
            await delaySeconds(5);
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
        console.error("Error fetching thread ID:", error);
        dispatch({
          type: "SEND_QUERY_ERROR",
        });
      }
    },
    [state.threadId],
  );

  return { state, sendQuery: sendQuery as (query: string) => void };
}
