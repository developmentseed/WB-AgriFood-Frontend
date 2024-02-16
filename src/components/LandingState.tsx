import { Flex, Heading, Text, Grid, Button } from "@chakra-ui/react";
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
      gap="4"
    >
      <Heading textAlign="center" size="xl" my="auto">
        What information can I help you find today?
      </Heading>
      <Text gridColumn="1/-1" textAlign="center" fontSize="lg">
        Try Asking:
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap="4" width="100%">
        {sampleQuestions.map((q) => (
          <Button
            key={q}
            size="lg"
            variant="outline"
            colorScheme="blue"
            bg="white"
            justifyContent="left"
            rightIcon={<ChevronRightIcon />}
            onClick={() => sendQuery(q)}
          >
            {q}
          </Button>
        ))}
      </Grid>
    </Flex>
  );
}
export default LandingState;
