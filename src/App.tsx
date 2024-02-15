import React, { useState } from "react";

import { Box, Divider } from "@chakra-ui/react";

import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";
import LandingState from "./components/LandingState";
import QueryForm from "./components/QueryForm";
import Conversation from "./components/Conversation";
import useChatReducer from "./chat-reducer";

function App() {
  const {
    state: { currentMessages },
    sendQuery,
  } = useChatReducer();

  return (
    <Layout>
      <Sidebar />
      <Box
        as="main"
        p="8"
        bg="gray.100"
        display="flex"
        flexDirection="column"
        alignContent="center"
        gap="8"
        overflow="hidden"
      >
        {currentMessages.length > 0 ? (
          <Conversation currentMessages={currentMessages} />
        ) : (
          <LandingState />
        )}
        <Box
          mt="auto"
          position="sticky"
          bottom="0"
          bg="gray.100"
          m="-4"
          p="4"
          mb="0"
          pb="0"
        >
          <Divider mb="4" borderColor="gray.400" />
          <QueryForm
            sendQuery={(query) => {
              sendQuery(query);
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
}

export default App;
