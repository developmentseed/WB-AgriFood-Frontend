import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  blue: {
    "50": "#E5F2FF",
    "100": "#B8DBFF",
    "200": "#8AC4FF",
    "300": "#5CADFF",
    "400": "#2E96FF",
    "500": "#007FFF",
    "600": "#0066CC",
    "700": "#004C99",
    "800": "#002244",
    "900": "#001933",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>,
);
