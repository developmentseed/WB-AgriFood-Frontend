import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

interface QueryFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleQuestionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formQuestion: string;
}

function QueryForm({
  handleSubmit,
  handleQuestionChange,
  formQuestion,
}: QueryFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <InputGroup size="lg" bg="white">
          <Input
            placeholder="Send a message to AgriFood Data Lab"
            onChange={handleQuestionChange}
          />
          <InputRightElement mr="4">
            <Button
              flexShrink="0"
              type="submit"
              colorScheme="blue"
              isDisabled={formQuestion === ""}
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
