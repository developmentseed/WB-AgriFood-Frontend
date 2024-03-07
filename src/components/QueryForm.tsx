import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ChatStatus } from "../types/chat";

interface QueryFormProps {
  sendQuery: (query: string) => void;
  status: ChatStatus;
}

function QueryForm({ sendQuery, status }: QueryFormProps) {
  const [localQuestion, setLocalQuestion] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = status !== "idle" && status !== "error";

  useEffect(() => {
    if (status === "idle") {
      setLocalQuestion("");
    }
    inputRef?.current?.focus();
  }, [status]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendQuery(localQuestion);
      }}
    >
      <FormControl maxW={["48rem", "56rem", "64rem"]} mx="auto">
        <InputGroup size={["sm", "md"]} justifyContent="space-between">
          <Input
            ref={inputRef}
            placeholder={
              isLoading
                ? "Processing..."
                : "Send a message to AgriFood Data Lab"
            }
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            disabled={isLoading}
            value={isLoading ? "" : localQuestion}
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
