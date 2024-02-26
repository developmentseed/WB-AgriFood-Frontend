import { Flex } from "@chakra-ui/react";
import Message from "./Message";
import type { Message as MessageType } from "../chat-reducer";

function Conversation({ currentMessages }: { currentMessages: MessageType[] }) {
  return (
    <Flex
      flexDir="column"
      flex="1"
      justifyContent={"flex-start"}
      alignItems={"end"}
      gap={["2", "4"]}
      overflowY="auto"
      alignSelf={"center"}
      width="100%"
      maxW={["65ch", "75ch" ]}
    >
      {currentMessages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </Flex>
  );
}
export default Conversation;
