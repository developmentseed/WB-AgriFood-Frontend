import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

function QueryForm({ handleSubmit, handleQuestionChange, formQuestion }) {
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
              isDisabled={formQuestion === ''}
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
