import React, { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

import theme from "../constants/theme";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("chats", {
        replace: true,
      });
    }
  }, [navigate]);

  // Card background
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      minH="100vh"
      w="100%"
      py={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="md" centerContent>
        <Flex
          mb={6}
          p={4}
          borderRadius="xl"
          bg={theme.primary}
          boxShadow="md"
          alignItems="center"
          justifyContent="center"
          w="100%"
        >
          <Box
            mr={3}
            position="relative"
            width="50px"
            height="50px"
            overflow="hidden"
            borderRadius="md"
            bg={theme.light}
          >
            <Image
              src="/logo.jpeg"
              alt="Talk2Owl Logo"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            fontFamily="'Work Sans', sans-serif"
            color="white"
          >
            Talk2Owl
          </Text>
        </Flex>

        <Box
          bg={cardBg}
          w="100%"
          p={6}
          borderRadius="xl"
          boxShadow="md"
          borderWidth="1px"
        >
          <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
            <TabList mb="1.5em">
              <Tab
                _selected={{
                  bg: theme.secondary,
                  color: theme.primary,
                  fontWeight: "semibold",
                }}
                bg={theme.light}
                mr={2}
              >
                Login
              </Tab>
              <Tab
                _selected={{
                  bg: theme.secondary,
                  color: theme.primary,
                  fontWeight: "semibold",
                }}
                bg={theme.light}
                ml={2}
              >
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <Login />
              </TabPanel>
              <TabPanel px={0}>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
