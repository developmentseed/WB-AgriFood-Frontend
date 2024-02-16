import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChatStatus } from "../chat-reducer";

interface QueryFormProps {
  sendQuery: (query: string) => void;
  status: ChatStatus;
}

function QueryForm({ sendQuery, status }: QueryFormProps) {
  const [localQuestion, setLocalQuestion] = useState<string>("");

  const isLoading = status !== "idle";

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
            placeholder={
              isLoading
                ? "Sending your message to Agrifood Data Lab..."
                : "Send a message to AgriFood Data Lab"
            }
            disabled={isLoading}
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
              isDisabled={isLoading || localQuestion === ""}
            >
              {isLoading ? "..." : "Send"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}
export default QueryForm;
