import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import theme from "../../constants/theme";

const UserListItem = ({ SearchUserResult, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg={theme.light}
      _hover={{
        background: theme.secondary,
        color: theme.primary,
        transform: "translateY(-2px)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color={theme.primary}
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      transition="all 0.2s ease"
      boxShadow="0 1px 3px rgba(0,0,0,0.05)"
      borderWidth="1px"
      borderColor={theme.orange}
    >
      <Avatar
        mr={3}
        size="sm"
        cursor="pointer"
        name={SearchUserResult.name}
        src={SearchUserResult.pic}
        border={`2px solid ${theme.tertiary}`}
      />
      <Box>
        <Text fontWeight="500">{SearchUserResult.name}</Text>
        <Text fontSize="xs" color={theme.tertiary}>
          <b>Email: </b>
          {SearchUserResult.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
