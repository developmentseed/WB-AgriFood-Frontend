import { Box } from "@chakra-ui/react";
import Message from "./Message";
import type { ChatMessage } from "../types/chat";
import ScrollToBottom from "react-scroll-to-bottom";

function Conversation({
  currentMessages,
  isLoading,
}: {
  currentMessages: ChatMessage[];
  isLoading: boolean;
}) {
  return (
    <Box flex="1" alignSelf={"center"} width="100%" height="100%">
      <ScrollToBottom className="scroll-container">
        {currentMessages.map((m) => (
          <Message key={m.id} message={m} isLoading={false} />
        ))}
        {isLoading && (
          <Message
            isLoading={true}
            message={{
              id: "loading",
              created_at: 1710345532336,
              markdown: "loading",
              metadata: null,
              role: "assistant",
            }}
          />
        )}
      </ScrollToBottom>
    </Box>
  );
}
export default Conversation;
