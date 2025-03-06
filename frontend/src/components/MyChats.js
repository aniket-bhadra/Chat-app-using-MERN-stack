import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Text,
  useToast,
  Flex,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";

import { useChatState } from "../Context/ChatProvider";
import ChatLodaing from "./ChatLodaing";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import theme from "../constants/theme";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [myChatLoading, setMyChatLoading] = useState(true);
  const { user, selectedChat, setSelectedChat, chats, setChats } =
    useChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      setMyChatLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      // console.log(data);
      setChats(data);
      setMyChatLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={4}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={theme.light}
      boxShadow="0 2px 10px rgba(0,0,0,0.05)"
      height="100%"
    >
      <Flex
        pb={3}
        px={3}
        fontFamily="Work sans"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading
          fontSize={{ base: "24px", md: "26px" }}
          fontWeight="600"
          color={theme.primary}
        >
          My Chats
        </Heading>
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "14px", md: "12px", lg: "14px" }}
            rightIcon={<AddIcon />}
            bg={theme.secondary}
            color={theme.primary}
            _hover={{ bg: theme.tertiary, color: "white" }}
            size="sm"
            borderRadius="full"
            px={4}
          >
            New Group
          </Button>
        </GroupChatModal>
      </Flex>

      <Divider borderColor={theme.light} mb={3} />

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        boxShadow="inset 0 2px 5px rgba(0,0,0,0.05)"
      >
        {!myChatLoading ? (
          <Stack overflowY="scroll" spacing={2} pr={2}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat
                    ? `linear-gradient(to right, ${theme.secondary}, ${theme.tertiary})`
                    : "white"
                }
                color={selectedChat === chat ? "white" : theme.primary}
                px={4}
                py={3}
                borderRadius="3xl"
                boxShadow="0 1px 3px rgba(0,0,0,0.1)"
                transition="all 0.2s ease"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  bg:
                    selectedChat === chat
                      ? `linear-gradient(to right, ${theme.secondary}, ${theme.tertiary})`
                      : theme.light,
                }}
                position="relative"
                overflow="hidden"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Text fontWeight="500" isTruncated>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.isGroupChat && (
                    <Box
                      as="span"
                      fontSize="xs"
                      px={2}
                      py={1}
                      borderRadius="full"
                      bg={
                        selectedChat === chat
                          ? "rgba(255,255,255,0.2)"
                          : "#efb63899"
                      }
                      color={selectedChat === chat ? "white" : theme.primary}
                      fontWeight="bold"
                    >
                      Group
                    </Box>
                  )}
                </Flex>
                {chat.latestMessage && (
                  <Text
                    fontSize="xs"
                    color={
                      selectedChat === chat
                        ? "rgba(255,255,255,0.8)"
                        : "gray.500"
                    }
                    mt={1}
                    isTruncated
                  >
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 49) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
                <Box
                  position="absolute"
                  left="0"
                  top="0"
                  bottom="0"
                  width="8px"
                  bg={selectedChat === chat ? "white" : theme.accent}
                  opacity={selectedChat === chat ? 0.8 : 0.6}
                ></Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLodaing />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
