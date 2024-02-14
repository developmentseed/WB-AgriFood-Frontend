import {
  Stack,
  Flex,
  Image,
  Button,
  Text,
  Divider,
  Spinner,
  Link,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
export default function Sidebar() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(true)
  const [existingChats, setExistingChats] = useState([]);
  useEffect(() => {
    const sampleChats = [
      {
        title: 'How to succeed in Agriculture Without Really Trying',
        id: 328839,
      },
      {
        title: 'Food security in Nigeria',
        id: 499283,
      },
      {
        title: 'Increasing crop yield in Southeast Asia',
        id: 588923,
      },
    ];
    setTimeout(() => setLoading(false), 3000);
    setTimeout(() => setExistingChats(sampleChats), 3000);
  }, []);

  return (
    <Stack
      direction="column"
      alignItems="left"
      justifyContent="space-between"
      borderRight="1px"
      borderColor="blue.200"
      bg="blue.800"
      color="white"
      p={4}
      boxShadow={'md'}
      height="100%"
    >
      <Flex direction="column">
        <Link href="/">
          <Image
            src="/World_Bank_Group_logo.svg"
            width="12rem"
            alt="World Bank Group logo"
            mixBlendMode="screen"
            filter="invert(1) grayscale(1)"
          />
          <Text
            fontSize={'sm'}
            pl="10"
            mt="-3"
            textTransform={'uppercase'}
            letterSpacing={1}
          >
            Agrifood Data Lab
          </Text>
        </Link>
        <Text py={4}>
          Discover agricultural use cases and data, with AI-enabled search,
          retrieval, and analysis capabilities.
        </Text>
        <Divider />
        {loading ? (
          <Spinner m={4} />
        ) : existingChats.length > 0 ? (
          <Flex direction="column" overflow="scroll" gap="4" py={4}>
            <Text
              w="full"
              textTransform={'uppercase'}
              letterSpacing={'wider'}
              fontSize={'xs'}
              display={'flex'}
              color="gray.400"
            >
              Previous Conversations
            </Text>
            {existingChats.map((c) => (
              <Button
                as={Link}
                size="xs"
                colorScheme="blackAlpha"
                justifyContent="left"
                key={c.id}
                href={`/channel/${c.id}`}
                px={2}
              >
                # {c.title}
              </Button>
            ))}{' '}
          </Flex>
        ) : (
          <Text p={4}>Start a new conversation</Text>
        )}
      </Flex>
      <Button onClick={() => setSignedIn(!signedIn)} colorScheme='whiteAlpha' mt={5}>{signedIn ? 'Sign out' : 'Sign In'}</Button>
    </Stack>
  );
}
