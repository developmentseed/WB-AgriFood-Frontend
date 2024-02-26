import { Text, Flex, Avatar, HStack, Image } from "@chakra-ui/react";

import type { Message } from "../chat-reducer";

export default function Message({ message }: { message: Message }) {
  const content = message.content[0].text.value;
  const assistantMessage = message.role === "assistant";
  return (
    <Flex w="100%" direction="column" mb={2}>
      <HStack alignItems={"center"} spacing={2} mb={1}>
        {assistantMessage ? (
          <Image src="/World_Bank_Group_logo-symbol.svg" width="6" />
        ) : (
          <Avatar name={"you"} size="xs" />
        )}
        <Text fontWeight="bold" fontSize="sm">
          {assistantMessage ? "WB Agrifood Data Lab" : "You"}
        </Text>
      </HStack>
      <Flex my={1} px={8} pr={[0, null, 8]}>
        <Text>{content}</Text>
      </Flex>
    </Flex>
  );
}
