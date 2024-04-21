import React ,{useEffect,useState} from 'react';
import Header from '../Layout/Header';
import Card from '../Card';
import { Box, Button, Text, extendTheme, ChakraProvider, Container, Heading, Table, Thead, Tr, Th, Tbody, Td} from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import Footer from '../Layout/Footer';

const theme = extendTheme({
  colors: {
    customBlue: {
      500: '#3182CE', // Adjust color code as needed
    },
  },
});
// Custom color scheme


const Leaderboard = () => {
   const users = [
        { id: 1, name: 'John Doe', ratings: 1200, hackathonsParticipated: 5, contributions: 10 },
        { id: 2, name: 'Jane Smith', ratings: 1350, hackathonsParticipated: 7, contributions: 15 },
        { id: 3, name: 'Alice Johnson', ratings: 1100, hackathonsParticipated: 4, contributions: 8 },
        { id: 4, name: 'Bob Brown', ratings: 1275, hackathonsParticipated: 6, contributions: 12 },
        { id: 5, name: 'Eva Lee', ratings: 1400, hackathonsParticipated: 8, contributions: 18 },
    ];

  return (
    <ChakraProvider theme={theme}>
      <div>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <NavLink to="/">
            <Button colorScheme="white" mt={4} marginRight={10} color={'black'} border={2}> {/* Change color scheme to customBlue */}
              Upcoming
            </Button>
            </NavLink>
            <NavLink to="/past">
            <Button colorScheme="white" mt={4} marginRight={10} color={'black'} border={2}>
              Past
            </Button>
            </NavLink>
            <NavLink to="/live">
            <Button colorScheme="white" mt={4} marginRight={10} color={'black'} border={2}>
              Live
            </Button>
            </NavLink>
            <NavLink to="/leaderboard">
            <Button colorScheme="customBlue" mt={4} marginRight={10}>
              Leaderboard
            </Button>
            </NavLink>
          </div>
          <Container maxW="container.lg" mt={10}>
                <Heading as="h1" mb={6}>Leaderboard</Heading>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Ratings</Th>
                            <Th>No. of Hackathons Participated</Th>
                            <Th>Contributions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user) => (
                            <Tr key={user.id}>
                                <Td>
                                    <Link to={`/profile/${user.id}`} color="blue.500">{user.name}</Link>
                                </Td>
                                <Td>{user.ratings}</Td>
                                <Td>{user.hackathonsParticipated}</Td>
                                <Td>{user.contributions}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Container>
          
        </div>
        <Footer/>
      </div>
    </ChakraProvider>
  );
};

export default Leaderboard;
