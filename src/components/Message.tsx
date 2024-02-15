import { Stack, Text, Flex, Avatar, HStack, Image } from "@chakra-ui/react";

interface MessageProps {
  messageData: {
    from: string;
    text: string;
  };
  isMyMessage: boolean;
}

export default function Message({ messageData, isMyMessage }: MessageProps) {
  if (isMyMessage) {
    return (
      <Flex w="100%" direction="column" mb={2}>
        <HStack alignItems="center" spacing={2} mb={1}>
          <Avatar name={messageData.from} size="xs" />
          <Text fontWeight="bold" fontSize="sm">
            {messageData.from}
          </Text>
        </HStack>
        <Flex my={1} px={8}>
          <Text>{messageData.text}</Text>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex w="100%" mb="2">
        <Stack>
          <HStack alignItems={"center"} spacing={2} mb={1}>
            <Image src="/World_Bank_Group_logo-symbol.svg" width="6" />
            <Text fontWeight="bold" fontSize="sm">
              {messageData.from}
            </Text>
          </HStack>
          <Flex my={1} px={8}>
            <Text>{messageData.text}</Text>
          </Flex>
        </Stack>
      </Flex>
    );
  }
}
