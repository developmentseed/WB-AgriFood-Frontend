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
      <FormControl maxW="75ch" mx="auto">
        <InputGroup size={["sm", "md"]} justifyContent="space-between">
          <Input
            placeholder={
              isLoading
                ? "Sending your message to Agrifood Data Lab..."
                : "Send a message to AgriFood Data Lab"
            }
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            disabled={isLoading}
            value={localQuestion}
            bg="white"
            pr={12}
            onChange={(e) => {
              setLocalQuestion(e.target.value);
            }}
          />
          <InputRightElement mr="4">
            <Button
              size={["xs", "sm"]}
              flexShrink="0"
              type="submit"
              colorScheme="blue"
              isDisabled={isLoading || localQuestion === ""}
              isLoading={isLoading}
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
