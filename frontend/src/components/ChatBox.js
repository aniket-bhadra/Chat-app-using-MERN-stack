import React from "react";
import { Box } from "@chakra-ui/react";

import { useChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";
import theme from "../constants/theme";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={4}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={theme.light}
      boxShadow="0 2px 10px rgba(0,0,0,0.05)"
      height="100%"
      position="relative"
      overflow="hidden"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;