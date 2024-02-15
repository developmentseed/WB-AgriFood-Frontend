import { Stack, Flex, Image, Text, Divider, Link } from "@chakra-ui/react";

export default function Sidebar() {
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
      boxShadow={"md"}
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
            fontSize={"sm"}
            pl="10"
            mt="-3"
            textTransform={"uppercase"}
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
      </Flex>
    </Stack>
  );
}
