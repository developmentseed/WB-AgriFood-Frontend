import { Stack, Text, Flex, Avatar, HStack, Image } from "@chakra-ui/react";

import type { ChatMessage } from "../chat-reducer";

const OutboundMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <Flex w="100%" direction="column" mb={2}>
      <HStack alignItems="center" spacing={2} mb={1}>
        <Avatar name={"you"} size="xs" />
        <Text fontWeight="bold" fontSize="sm">
          You
        </Text>
      </HStack>
      <Flex my={1} px={8}>
        <Text>{message.content}</Text>
      </Flex>
    </Flex>
  );
};

const InboundMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <Flex w="100%" mb="2">
      <Stack>
        <HStack alignItems={"center"} spacing={2} mb={1}>
          <Image src="/World_Bank_Group_logo-symbol.svg" width="6" />
          <Text fontWeight="bold" fontSize="sm">
            WB Agrifood Data Lab
          </Text>
        </HStack>
        <Flex my={1} px={8}>
          <Text>{message.content}</Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default function Message({ message }: { message: ChatMessage }) {
  return message.type === "inbound" ? (
    <InboundMessage message={message} />
  ) : (
    <OutboundMessage message={message} />
  );
}
