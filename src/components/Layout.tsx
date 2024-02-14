import { Box } from '@chakra-ui/react';

function Layout({ children }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={'20rem 1fr'}
      // gridTemplateRows={'auto 1fr'}
      height="100vh"
      maxHeight="100vh"
    >
      {children}
    </Box>
  );
}
export default Layout;
