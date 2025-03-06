import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
  Flex,
  Heading,
  Divider,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import io from "socket.io-client";
import "./styles.css";

import { useChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";
import TypingAnimation from "./animations/TypingAnimation";
import theme from "../constants/theme";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;
let timeExceeded = false;
let timeOutId;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingRoom, setTypingRoom] = useState();

  const {
    user,
    selectedChat,
    setSelectedChat,
    notifications,
    setNotifications,
  } = useChatState();
  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      setNewMessage("");

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      //emit the signal to join the room
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    //emiting from "setup" socket
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", (room) => {
      setTypingRoom(room);
      setIsTyping(true);
    });
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    //keep the backup of whatever the selectedChat state is, inside of this selectedChatCompare, so that we can compare it & accordingly we can decide if we are supposed to emit the message or we are supposed to give the notification to the user
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //not gonna display the message, give notification
        if (!notifications.includes(newMessageReceived)) {
          setNotifications((existingNotifications) => [
            newMessageReceived,
            ...existingNotifications,
          ]);

          setFetchAgain((prevState) => !prevState);
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });
  }, []);

  const sendMessage = async (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        //sending
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: user,
            content: newMessage,
            chat: selectedChat._id,
            temp: "true",
          },
        ]);

        setNewMessage("");
        //this state updating function is asynchrounous, so it won't immedieatly make this empty.
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // console.log(data);
        socket.emit("new message", data);
        //delivered the msg
        // setMessages((prevMessages) => [...prevMessages, data]);
        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.filter(
            (msg) => !(msg.temp === "true")
          );
          const updatedWithDeliveredMsg = [...updatedMessages, data];
          return updatedWithDeliveredMsg;
        });
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    //typing indicator logic here

    if (!socketConnected) return;

    if (!timeExceeded) {
      timeExceeded = true;
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && timeExceeded) {
        socket.emit("stop typing", selectedChat._id);
        timeExceeded = false;
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            py={3}
            px={4}
            bg={theme.primary}
            color="white"
            borderRadius="lg"
            mb={4}
          >
            <Flex alignItems="center">
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
                mr={3}
                size="sm"
                colorScheme="whiteAlpha"
                variant="ghost"
                _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
              />

              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                fontFamily="Work sans"
                fontWeight="600"
              >
                {!selectedChat.isGroupChat
                  ? getSender(user, selectedChat.users)
                  : selectedChat.chatName}
              </Heading>
            </Flex>

            <Box>
              {!selectedChat.isGroupChat ? (
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              ) : (
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              )}
            </Box>
          </Flex>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="rgba(248, 248, 248, 0.5)"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            boxShadow="inset 0 2px 5px rgba(0,0,0,0.05)"
            position="relative"
          >
            {loading ? (
              <Flex
                alignItems="center"
                justifyContent="center"
                height="100%"
                width="100%"
              >
                <Spinner
                  size="xl"
                  thickness="4px"
                  speed="0.65s"
                  color={theme.secondary}
                />
              </Flex>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <Box mt={3}>
              {isTyping && typingRoom === selectedChat._id && (
                <Box ml={2} mb={1}>
                  <TypingAnimation />
                </Box>
              )}

              <FormControl onKeyDown={sendMessage} isRequired>
                <InputGroup>
                  <Input
                    variant="filled"
                    bg="white"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={typingHandler}
                    borderRadius="full"
                    focusBorderColor={theme.secondary}
                    _hover={{ bg: "white" }}
                    boxShadow="0 1px 3px rgba(0,0,0,0.1)"
                    pr="4.5rem"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      bg={theme.secondary}
                      color={theme.primary}
                      _hover={{ bg: theme.tertiary, color: "white" }}
                      mr={1}
                      borderRadius="full"
                      onClick={sendMessage}
                      isDisabled={!newMessage}
                    >
                      <FaPaperPlane />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
          p={6}
          textAlign="center"
        >
          <Box
            bg={`linear-gradient(135deg, ${theme.light} 0%, ${theme.secondary} 100%)`}
            p={5}
            borderRadius="full"
            mb={6}
            boxShadow="0 4px 12px rgba(0,0,0,0.1)"
            position="relative"
            width="110px"
            height="110px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              as="img"
              src="/logo-nobg.png"
              alt="Talk2Owl Logo"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%) scale(1.3)" // Center using transform
              height="120px"
              objectFit="contain"
            />
          </Box>
          <Heading
            size="lg"
            fontFamily="Work sans"
            fontWeight="600"
            color={theme.primary}
            mb={3}
          >
            Welcome to Talk2Owl
          </Heading>
          <Text fontSize="md" fontFamily="Work sans" color="gray.600" maxW="md">
            Unlock the power of conversation with 'talk2owl'. Simply click on
            any of your owls to start chatting!
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
