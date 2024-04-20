import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Heading,
  Link,
  Flex,
  ChakraProvider,
  CSSReset,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const RegisterPublisher = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-r, #805ad5, #87a7d9)"
      >
        <CSSReset />
        <Box
          p={8}
          maxW={{ base: '90%', sm: '80%', md: '70%', lg: '50%' }}
          w="30%"
          borderWidth={1}
          borderRadius={12}
          boxShadow="xl"
          mx="auto"
          bg="white"
          zIndex={1}
        >
          <VStack spacing={4} align="center">
            <Heading
              color="teal.500"
              fontFamily="Poppins, sans-serif"
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
              fontWeight="bold"
              textAlign="center"
            >
              Welcome!
            </Heading>
            <Heading
              color="gray.600"
              fontFamily="Poppins, sans-serif"
              fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
              fontWeight="normal"
              textAlign="center"
            >
              Securely Register your account.
            </Heading>
            <Flex justify="center" w="100%" mb={2}>
              <NavLink to="/users/signup">
                <Button variant="outline" mr={2}>
                  User
                </Button>
              </NavLink>
              <NavLink to="/publisher/signup">
                <Button variant="outline" ml={2} bg={'lightGreen'}>
                  Restaurant
                </Button>
              </NavLink>
            </Flex>
            <InputGroup>
              <Input
                type="text"
                placeholder="UserName"
                borderColor="teal.500"
                focusBorderColor="teal.700"
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="email"
                placeholder="Email"
                borderColor="teal.500"
                focusBorderColor="teal.700"
              />
            </InputGroup>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                borderColor="teal.500"
                focusBorderColor="teal.700"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleTogglePassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="ConfirmPassword"
                borderColor="teal.500"
                focusBorderColor="teal.700"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleTogglePassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button colorScheme="teal" bg="teal.500">
              Create Account
            </Button>
            <Link as={NavLink} to="/loginpub" color="teal.500">
              Login
            </Link>
            <Link color="teal.500" onClick={onOpen}>
              Forgot Password?
            </Link>
          </VStack>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Input
              type="email"
              placeholder="Enter your email"
              borderColor="teal.500"
              focusBorderColor="teal.700"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {confirmationMessage && (
        <Box
          position="fixed"
          top="20px"
          left="50%"
          transform="translateX(-50%)"
          bg="teal.500"
          color="white"
          p={4}
          borderRadius={8}
        >
          {confirmationMessage}
        </Box>
      )}
    </ChakraProvider>
  );
};

export default RegisterPublisher;