import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={["1fr", null, "1fr 2fr", "20rem 1fr"]}
      gridTemplateRows={["max-content 1fr", null, "none"]}
      height="100vh"
      maxHeight="100vh"
    >
      {children}
    </Box>
  );
}
export default Layout;
