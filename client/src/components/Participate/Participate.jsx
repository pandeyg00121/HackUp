import React from 'react';
import Header from '../Layout/Header';
import { Button, Heading, Text, Box } from '@chakra-ui/react';

const Participate = () => {
  // Sample data for the hackathon
  const hackathonData = {
    name: 'Hackathon 1',
    image: 'hackathon_image.jpg', // Replace 'hackathon_image.jpg' with the actual image URL
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mauris sed nisi aliquam commodo. Integer at arcu elit. Nullam convallis sagittis eleifend. Sed nec quam a sapien vestibulum vehicula.',
  };

  return (
    <div>
      <Header />
      <Box p={8} maxW={{ base: '90%', sm: '80%', md: '70%', lg: '50%' }} mx="auto">
        <Heading as="h2" fontSize="4xl" mb={4}>
          {hackathonData.name}
        </Heading>
        <Button colorScheme="blue" mb={4} mr={4}>Button 1</Button>
        <Button colorScheme="green" mb={4} mr={4}>Button 2</Button>
        <Button colorScheme="red" mb={4}>Button 3</Button>
        <img src={hackathonData.image} alt={hackathonData.name} style={{ width: '100%', marginBottom: '20px' }} />
        <Text>{hackathonData.description}</Text>
      </Box>
    </div>
  );
};

export default Participate;
