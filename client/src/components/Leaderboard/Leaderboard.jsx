import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, Container, Heading, Link as ChakraLink } from '@chakra-ui/react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const Leaderboard = () => {
    const users = [
        { id: 1, name: 'John Doe', ratings: 1200, hackathonsParticipated: 5, contributions: 10 },
        { id: 2, name: 'Jane Smith', ratings: 1350, hackathonsParticipated: 7, contributions: 15 },
        { id: 3, name: 'Alice Johnson', ratings: 1100, hackathonsParticipated: 4, contributions: 8 },
        { id: 4, name: 'Bob Brown', ratings: 1275, hackathonsParticipated: 6, contributions: 12 },
        { id: 5, name: 'Eva Lee', ratings: 1400, hackathonsParticipated: 8, contributions: 18 },
    ];

    return (
        <>
            <Header />
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
                                    <ChakraLink as={Link} to={`/profile/${user.id}`} color="blue.500">{user.name}</ChakraLink>
                                </Td>
                                <Td>{user.ratings}</Td>
                                <Td>{user.hackathonsParticipated}</Td>
                                <Td>{user.contributions}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Container>
            <Footer />
        </>
    );
};

export default Leaderboard;
