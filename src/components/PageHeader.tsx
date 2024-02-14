import { Box, Text, Image } from '@chakra-ui/react';
function PageHeader() {
  return (
    <Box
      gridRow="1"
      gridColumn="1/-1"
      bg="blue.800"
      borderBottom="2px solid"
      borderColor="blue.300"
      color="white"
      p={4}
      boxShadow={'lg'}
      zIndex="100"
    >
      <Image
        src="/World_Bank_Group_logo.svg"
        width="12rem"
        alt="World Bank Group logo"
        mixBlendMode='screen'
        filter='invert(1) grayscale(1)'
      />
      <Text
        fontSize={'sm'}
        pl='10'
        mt='-3'
        textTransform={'uppercase'}
        letterSpacing={1}
      >
        Agrifood Data Lab
      </Text>
    </Box>
  );
}

export default PageHeader;
