import { Flex } from "@chakra-ui/react";
import Message from "./Message";
import type { ChatMessage } from "../chat-reducer";

function Conversation({ currentMessages }: { currentMessages: ChatMessage[] }) {
  return (
    <Flex
      flexDir="column"
      flex="1"
      justifyContent={"space-between"}
      alignItems={"end"}
      gap="4"
      overflow="scroll"
      alignSelf={"center"}
    >
      {currentMessages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </Flex>
  );
}
export default Conversation;
