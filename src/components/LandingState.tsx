import { Flex, Heading, Text, Grid, Button, Image } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const sampleQuestions = [
  "What types of data can I access here?",
  "How should I structure my questions?",
  "How have we improved rice production in Nigeria?",
  "Which food security programs have succeeded in Asia?",
];

function LandingState({ sendQuery }: { sendQuery: (query: string) => void }) {
  return (
    <Flex
      flexDir="column"
      flex="1"
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={["2", "4"]}
    >
      <Flex flexDir="column" alignItems={"center"} my="auto" gap="2">
        <Image src="/World_Bank_Group_logo-symbol.svg" width="8" />
        <Heading textAlign="center" size={["sm", "md", "lg"]}>
          What information can I help you find today?
        </Heading>
      </Flex>
      <Text gridColumn="1/-1" textAlign="center" fontSize={["sm", "md", "lg"]}>
        Try Asking:
      </Text>
      <Grid templateColumns={["1fr", null, "repeat(2, 1fr)"]} gap="4">
        {sampleQuestions.map((q) => (
          <Button
            key={q}
            size="sm"
            variant="outline"
            overflow="hidden"
            colorScheme="blue"
            bg="white"
            justifyContent="space-between"
            rightIcon={<ChevronRightIcon />}
            onClick={() => sendQuery(q)}
          >
            <Text textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
              {q}
            </Text>
          </Button>
        ))}
      </Grid>
    </Flex>
  );
}
export default LandingState;
