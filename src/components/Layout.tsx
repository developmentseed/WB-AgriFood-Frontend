import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={"20rem 1fr"}
      height="100vh"
      maxHeight="100vh"
    >
      {children}
    </Box>
  );
}
export default Layout;
