import {
  Text,
  Flex,
  Avatar,
  HStack,
  Heading,
  Image,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  List,
  ListItem,
} from "@chakra-ui/react";
import "github-markdown-css";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import supersub from "remark-supersub";
import remarkMath from "remark-math";

import "./markdown.css";
import { ChatMessage } from "../types/chat";

const MarkdownContent = ({ markdown }: { markdown: string }) => {
  return (
    <Markdown
      remarkPlugins={[remarkBreaks, remarkGfm, supersub, remarkMath]}
      className={`markdown-body markdown-custom-styles`}
      components={{
        a: ({ ...props }) => {
          // eslint-disable-next-line react/prop-types
          if (!props.title) {
            return <a {...props} />;
          }
          return <a {...props} title={undefined} />;
        },
      }}
    >
      {markdown}
    </Markdown>
  );
};

const MetadataContent = ({
  metadata,
}: {
  metadata: Record<string, unknown>;
}) => {
  // metadata must be an array
  if (!Array.isArray(metadata)) {
    return (
      <div>
        <Text fontWeight="bold">Here is some unstructured data:</Text>
        <Text>{JSON.stringify(metadata)}</Text>
      </div>
    );
  }

  return (
    <SimpleGrid spacing={4} w="100%" templateColumns='repeat(auto-fill, minmax(320px, 1fr))'>
      {metadata.map((m) => {
        return (
          <Card key={m.id}>
            <CardHeader>
              <Heading size="sm" as="h4">{m.name}</Heading>
            </CardHeader>
            <CardBody>
              <List spacing={2}>
                {Object.keys(m).map((key) => {
                  if (key === "id" || key === "name") {
                    return null;
                  }
                  return (
                    <ListItem as="dl" key={key}>
                      <Heading as="dt" size="xs" color="gray.400" textTransform={"uppercase"}>{key}</Heading>
                      <Text as="dd">{m[key]}</Text>
                    </ListItem>
                  );
                })}
              </List>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

export default function Message({ message }: { message: ChatMessage }) {
  const { markdown, metadata } = message;
  const assistantMessage = message.role === "assistant";
  return (
    <Flex
      w="100%"
      maxW={["65ch", "55rem", "72rem"]}
      mx="auto"
      direction="column"
      mb={2}
      pb={2}
    >
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
      <Flex my={1} pl={8} w="100%">
        {metadata ? (
          <MetadataContent metadata={metadata} />
        ) : (
          <MarkdownContent markdown={markdown} />
        )}
      </Flex>
    </Flex>
  );
}
