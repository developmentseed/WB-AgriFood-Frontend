import { Box } from "@chakra-ui/react";
import Message from "./Message";
import type { Message as MessageType } from "../chat-reducer";
import ScrollToBottom from "react-scroll-to-bottom";

function Conversation({ currentMessages }: { currentMessages: MessageType[] }) {
  return (
    <Box
      flex="1"
      alignSelf={"center"}
      width="100%"
      height="100%"
    >
      <ScrollToBottom className="scroll-container">
        {currentMessages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </ScrollToBottom>
    </Box>
  );
}
export default Conversation;
