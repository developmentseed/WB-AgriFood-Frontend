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
  Tag,
  Box,
  Stack,
  Button,
  Badge,
  Divider,
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
    <>
      <Divider ml={[-4, null, 0]} pt={[4, null, 0]} />
      <Heading size="md" as="h3" ml={[-4, null, 0]}>Results</Heading>
      <SimpleGrid
        spacing={4}
        ml={[-4, null, 0]}
        w="100%"
        templateColumns="repeat(auto-fill, minmax(20rem, 1fr))"
      >
        {metadata
          .sort((a, b) => b._distance - a._distance)
          .map((m) => {
            console.log(m);
            const typeTagColor = {
              app: "red",
              dataset: "blue",
              microdataset: "cyan",
              video: "purple",
              project: "orange",
            };
            return (
              <Card key={m.id} size={["sm", null, "md"]}>
                <CardHeader>
                  <Heading size="sm" as="h4">
                    {m.name}
                  </Heading>
                </CardHeader>
                <CardBody gap={4} pt={0}>
                  <Stack spacing="4" alignItems={"flex-start"}>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width="100%"
                    >
                      {m._distance && (
                        <Badge
                          fontSize="xs"
                          variant={
                            m._distance > 0.463
                              ? "solid"
                              : m._distance > 0.35
                                ? "subtle"
                                : "outline"
                          }
                          colorScheme="green"
                        >
                          {m._distance > 0.463
                            ? "Best Match"
                            : m._distance > 0.35
                              ? "Good Match"
                              : "Match"}
                        </Badge>
                      )}
                      {m.type && (
                        <Tag size="sm" colorScheme={typeTagColor[m.type]}>
                          {m.type.toUpperCase()}
                        </Tag>
                      )}
                    </Flex>
                    {m.description && (
                      <Box>
                        <Heading
                          size="xs"
                          color="gray.400"
                          textTransform={"uppercase"}
                        >
                          Description
                        </Heading>
                        <Text fontSize="sm">{m.description}</Text>
                      </Box>
                    )}
                    {m.explanation && (
                      <Box>
                        <details>
                          <Text
                            as="summary"
                            fontSize="sm"
                            color="gray.400"
                            textTransform={"uppercase"}
                          >
                            Why this result?
                          </Text>
                          <Text fontSize="sm">{m.explanation}</Text>
                        </details>
                      </Box>
                    )}
                    {m.url && (
                      <Button
                        size="sm"
                        as="a"
                        href={m.url}
                        title={m.url}
                        target="_blank"
                      >
                        Visit
                      </Button>
                    )}
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
      </SimpleGrid>
    </>
  );
};

export default function Message({ message }: { message: ChatMessage }) {
  const { markdown, metadata } = message;
  const assistantMessage = message.role === "assistant";
  return (
    <Flex
      w="100%"
      maxW={["48rem", "56rem", "64rem"]}
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
      <Flex my={1} pl={8} w="100%" direction="column" gap="4">
        {metadata ? (
          <MetadataContent metadata={metadata} />
        ) : (
          <MarkdownContent markdown={markdown} />
        )}
      </Flex>
    </Flex>
  );
}
