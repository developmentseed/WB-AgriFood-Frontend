import { useReducer } from "react";

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
  currentMessages: ChatMessage[];
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
  currentMessages: [],
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  // Logs
  console.log(`threadId: ${state.threadId}`, `status: ${state.status}`);

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
    case "START_RUN": {
      return {
        ...state,
        runId: action.payload.runId,
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

export default function useChat() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const sendQuery = async (query: string) => {
    try {
      dispatch({
        type: "SET_STATUS",
        payload: "loading",
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
