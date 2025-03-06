import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Avatar, Tooltip, Box, Flex, Text } from "@chakra-ui/react";
import { isLastMessage, isSameSender, isSameUser } from "../config/ChatLogics";
import { useChatState } from "../Context/ChatProvider";
import { CiStopwatch } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import theme from "../constants/theme";

const ScrollableChat = ({ messages }) => {
  const { user } = useChatState();
  const lastMyMessageSendByLoggeInUser = [...messages]
    .reverse()
    .find((msg) => msg.sender._id === user._id);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <Box
            key={`${m._id}+--${i}`}
            display="flex"
            alignItems="flex-end"
            marginBottom={isSameUser(messages, m, i) ? 1 : 3}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                  borderWidth="2px"
                  borderColor={
                    m.sender._id === user._id ? theme.secondary : theme.accent
                  }
                />
              </Tooltip>
            )}

            <Flex
              direction="column"
              maxWidth="75%"
              marginLeft={
                m.sender._id === user._id
                  ? "auto"
                  : isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)
                  ? "0"
                  : "38px"
              }
            >
              <Box
                bg={
                  m.sender._id === user._id
                    ? `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.tertiary} 100%)`
                    : "white"
                }
                color={m.sender._id === user._id ? "white" : theme.primary}
                borderRadius="18px"
                py={2}
                px={3}
                boxShadow="0 1px 2px rgba(0,0,0,0.1)"
                borderWidth={m.sender._id === user._id ? "0" : "1px"}
                borderColor={m.sender._id === user._id ? "" : "gray.200"}
                position="relative"
              >
                <Text fontSize="md">{m.content}</Text>
                {/* Removed recipient name display */}
              </Box>

              <Flex
                justifyContent={
                  m.sender._id === user._id ? "flex-end" : "flex-start"
                }
                alignItems="center"
                mt={1}
              >
                {m.temp === "true" ? (
                  <Flex alignItems="center">
                    <CiStopwatch color="gray" size={14} />
                    <Text fontSize="xs" color="gray.500" ml={1}>
                      Sending...
                    </Text>
                  </Flex>
                ) : m._id === lastMyMessageSendByLoggeInUser._id &&
                  m.sender._id === user._id ? (
                  <Flex alignItems="center">
                    <FaCheck color={theme.secondary} size={14} />
                    <Text fontSize="xs" color="gray.500" ml={1}>
                      Delivered
                    </Text>
                  </Flex>
                ) : null}
              </Flex>
            </Flex>
          </Box>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
