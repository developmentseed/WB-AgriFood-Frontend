import { useReducer } from "react";
import { generateRandomLoremIpsum } from "./utils";

export type ChatMessage = {
  id: number;
  type: "inbound" | "outbound";
  content: string;
};

interface ChatState {
  currentMessages: ChatMessage[];
}

type ChatAction = { type: "SEND_QUERY"; payload: string };

export type SendQueryFunction = (query: string) => void;

const initialState: ChatState = {
  currentMessages: [],
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "SEND_QUERY": {
      const outboundMessage: ChatMessage = {
        id: state.currentMessages.length + 1,
        type: "outbound",
        content: action.payload,
      };
      const inboundMessage: ChatMessage = {
        id: state.currentMessages.length + 2,
        type: "inbound",
        content: generateRandomLoremIpsum(Math.floor(Math.random() * 300) + 1),
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
    default:
      return state;
  }
};

export default function useChatReducer() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const sendQuery: SendQueryFunction = (query: string) =>
    dispatch({ type: "SEND_QUERY", payload: query });
  return { state, sendQuery };
}
