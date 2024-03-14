import { Box } from "@chakra-ui/react";
import Message, { MessageSkeleton } from "./Message";
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
          <Message key={m.id} message={m} />
        ))}
        {isLoading && <MessageSkeleton />}
      </ScrollToBottom>
    </Box>
  );
}
export default Conversation;
