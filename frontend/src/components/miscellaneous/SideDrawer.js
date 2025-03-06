import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  Flex,
  Image,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationBadge, { Effect } from "react-notification-badge";

import { useChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import ChatLodaing from "../ChatLodaing";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";

import theme from "../../constants/theme";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const navigate = useNavigate();
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notifications,
    setNotifications,
  } = useChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/", {
      replace: true,
    });
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg={theme.primary}
        width="100%"
        padding="12px 20px"
        color="white"
        boxShadow="0 2px 10px rgba(0,0,0,0.1)"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            color="white"
            _hover={{ bg: `${theme.tertiary}` }}
          >
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Image
          src="/logo-nobg.png"
          alt="Talk2Owl Logo"
          height="40px"
          width="50px"
          objectFit="cover"
          transform="scale(1.5)"
        />

        <Flex>
          <Menu>
            <MenuButton
              padding={1}
              color="white"
              _hover={{ color: theme.secondary }}
            >
              <NotificationBadge
                count={notifications.length}
                effect={Effect.SCALE}
                style={{ backgroundColor: theme.accent }}
              />
              <BellIcon fontSize="2xl" m={1} color={theme.orange2} />
            </MenuButton>

            <MenuList
              pl={3}
              bg="white"
              color={theme.primary}
              borderColor={theme.tertiary}
            >
              {!notifications.length && "No New Messages"}
              {notifications.map((notification) => (
                <MenuItem
                  key={notification._id}
                  onClick={() => {
                    const recevingMessageChat = chats.find(
                      (chat) => chat._id === notification.chat._id
                    );

                    if (!recevingMessageChat) {
                      return;
                    }

                    setSelectedChat(recevingMessageChat);

                    setNotifications((existingNotifications) =>
                      existingNotifications.filter(
                        (existingNotification) =>
                          existingNotification._id !== notification._id
                      )
                    );
                  }}
                  _hover={{ bg: theme.light, color: theme.primary }}
                >
                  {notification.chat.isGroupChat
                    ? `New Message in ${notification.chat.chatName}`
                    : `New Message from ${getSender(
                        user,
                        notification.chat.users
                      )}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              ml={4}
              bg={theme.tertiary}
              color="white"
              _hover={{ bg: theme.secondary }}
              _active={{ bg: theme.secondary }}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
                border={`2px solid ${theme.light}`}
              />
            </MenuButton>

            <MenuList
              bg="white"
              color={theme.primary}
              borderColor={theme.tertiary}
            >
              <ProfileModal user={user}>
                <MenuItem _hover={{ bg: theme.light, color: theme.primary }}>
                  My Profile
                </MenuItem>
              </ProfileModal>

              <MenuDivider />
              <MenuItem
                onClick={logoutHandler}
                _hover={{ bg: theme.orange, color: "white" }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="white" color={theme.primary}>
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor={theme.light}
            bg={theme.primary}
            color="white"
          >
            Search Users
          </DrawerHeader>

          <DrawerBody>
            <Box display="flex" paddingBottom={4} paddingTop={4}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderColor={theme.tertiary}
                _focus={{ borderColor: theme.secondary }}
              />
              <Button
                onClick={handleSearch}
                bg={theme.secondary}
                color={theme.primary}
                _hover={{ bg: theme.orange }}
              >
                Go
              </Button>
            </Box>

            {loading ? (
              <ChatLodaing />
            ) : (
              searchResult?.map((SearchUser) => (
                <UserListItem
                  key={SearchUser._id}
                  SearchUserResult={SearchUser}
                  handleFunction={() => accessChat(SearchUser._id)}
                />
              ))
            )}

            {loadingChat && (
              <Spinner
                ml="auto"
                display="flex"
                color={theme.secondary}
                thickness="3px"
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
