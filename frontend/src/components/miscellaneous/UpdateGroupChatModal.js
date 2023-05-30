import React, { useState } from "react";
import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  Button,
  ModalFooter,
  useToast,
  Box,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";

import { useChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState(selectedChat.chatName);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();

  const handleRemove = () => {};

  const handleRename = async () => {
    if (!groupChatName) {
      toast({
        title: "Please Provide Group Name",
        description: "Group Name can't be empty",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (groupChatName === selectedChat.chatName) {
      return;
    }

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain((prevState) => !prevState);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setRenameLoading(false);
    }
  };

  const handleSearch = () => {};
  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<ViewIcon />}
        display={{ base: "flex" }}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
              {/* // ! create a spearate UserBadgeItem for loggedin user, where it shows "you" instead of loggedin username */}
            </Box>

            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />

              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={5}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
