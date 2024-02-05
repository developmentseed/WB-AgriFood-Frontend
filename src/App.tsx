import { Box, Heading, Text, Input } from "@chakra-ui/react";

function App() {
  return (
    <Box maxW="700px" mx="auto" px="4" my="100">
      <Box
        bg="gray.200"
        w="300px"
        h="64px"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        WB Logo
      </Box>
      <Heading py={5}>World Bank Agrifood Data Lab</Heading>
      <Text py={5}>
        A tool to strengthen data use capacities across the World Bank on
        datasets, use cases, and applications related to agriculture and food.
        What specific information are you looking for today?
      </Text>
      <Input placeholder="Type your question" size="lg" />
    </Box>
  );
}

export default App;
