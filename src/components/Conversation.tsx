import { Flex } from "@chakra-ui/react";
import Message from "./Message";
import type { Message as MessageType } from "../chat-reducer";

function Conversation({ currentMessages }: { currentMessages: MessageType[] }) {
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
