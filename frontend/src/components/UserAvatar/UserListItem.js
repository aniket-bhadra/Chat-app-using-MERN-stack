import React from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

const UserListItem = ({ SearchUserResult, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={SearchUserResult.name}
        src={SearchUserResult.pic}
      />
      <Box>
        <Text>{SearchUserResult.name}</Text>
        <Text fontSize="xs">
          <b>Email: </b>
          {SearchUserResult.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
