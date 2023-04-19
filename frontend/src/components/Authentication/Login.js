import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordHiddingHandler = () =>
    setShow((prevShowValue) => !prevShowValue);

  const onSubmitHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          placeholder="Your email handle"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel> Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Your secret weapon?"
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={passwordHiddingHandler}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={onSubmitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
