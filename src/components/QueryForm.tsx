import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

interface QueryFormProps {
  sendQuery: (question: string) => void;
}

function QueryForm({ sendQuery }: QueryFormProps) {
  const [localQuestion, setLocalQuestion] = useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendQuery(localQuestion);
        setLocalQuestion("");
      }}
    >
      <FormControl>
        <InputGroup size="lg" bg="white">
          <Input
            placeholder="Send a message to AgriFood Data Lab"
            value={localQuestion}
            onChange={(e) => {
              setLocalQuestion(e.target.value);
            }}
          />
          <InputRightElement mr="4">
            <Button
              flexShrink="0"
              type="submit"
              colorScheme="blue"
              isDisabled={localQuestion.length === 0}
            >
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}
export default QueryForm;
