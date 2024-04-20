import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Link,
  Button,
  Heading,
  useColorMode,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={colorMode === 'light' ? 'teal.500' : 'teal.900'} p={4}>
      <Flex alignItems="center">
        <Heading size="md" color="white">
          Your Project Name
        </Heading>
        <Spacer />
        <Flex alignItems="center">
          <NavLink to="/loginuser">
            <Button
              variant="link"
              mr={4}
              color="white"
              _hover={{ textDecoration: 'none' }}
            >
              User
            </Button>
          </NavLink>
          <NavLink to="/loginpub">
            <Button
              variant="link"
              mr={4}
              color="white"
              _hover={{ textDecoration: 'none' }}
            >
              Restaurant
            </Button>
          </NavLink>
          <Link
            href="#"
            mr={4}
            color="white"
            _hover={{ textDecoration: 'none' }}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Link>
          <NavLink to="/users/signup">
            <Button colorScheme="whiteAlpha">Sign Up</Button>
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
