import { useReducer } from "react";

type ChatStatus = "loading" | "idle" | "success" | "error";

type ChatThread = {
  id: number;
  title: string;
};

export type ChatMessage = {
  id: number;
  type: "inbound" | "outbound";
  content: string;
};

interface ChatState {
  status: ChatStatus;
  currentThread: ChatThread | null;
  currentMessages: ChatMessage[];
}

type ChatAction =
  | { type: "SET_STATUS"; payload: ChatStatus }
  | { type: "SEND_QUERY"; payload: string }
  | { type: "SET_THREAD"; payload: ChatThread };

const initialState: ChatState = {
  status: "loading",
  currentThread: null,
  currentMessages: [],
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SEND_QUERY": {
      const outboundMessage: ChatMessage = {
        id: state.currentMessages.length + 1,
        type: "outbound",
        content: action.payload,
      };
      const inboundMessage: ChatMessage = {
        id: state.currentMessages.length + 2,
        type: "inbound",
        content: "At the moment, I can only respond with canned responses.",
      };
      return {
        ...state,
        currentMessages: [
          ...state.currentMessages,
          outboundMessage,
          inboundMessage,
        ],
      };
    }
    case "SET_THREAD":
      return { ...state, currentThread: action.payload };
    default:
      return state;
  }
};

export default function useChatReducer() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const setStatus = (status: ChatStatus) =>
    dispatch({ type: "SET_STATUS", payload: status });
  const sendQuery = (query: string) =>
    dispatch({ type: "SEND_QUERY", payload: query });
  const setThread = (thread: ChatThread) =>
    dispatch({ type: "SET_THREAD", payload: thread });
  return { state, setStatus, sendQuery, setThread };
}
