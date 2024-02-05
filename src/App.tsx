import React, { useState } from "react";

import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
} from "@chakra-ui/react";

function App() {
  const [formQuestion, setFormQuestion] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Your question has been submitted: ${formQuestion}`);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormQuestion(e.target.value);
  };

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
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input
            placeholder="Type your question"
            size="lg"
            onChange={handleQuestionChange}
          />
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            mt={5}
            isDisabled={formQuestion === ""}
          >
            Send Question
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default App;
