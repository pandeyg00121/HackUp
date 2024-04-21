import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Heading, 
  Text, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Input, 
  useDisclosure 
} from '@chakra-ui/react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const Participate = () => {
  // Modals control
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isJoinOpen, onOpen: onJoinOpen, onClose: onJoinClose } = useDisclosure();

  // Form states
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');

  // Handlers for creating and joining teams
  const handleCreateTeam = () => {
    console.log("Creating team:", teamName);
    // Implement your logic to create a team
    onCreateClose(); // Close modal after action
  };

  const handleJoinTeam = () => {
    console.log("Joining team with code:", teamCode);
    // Implement your logic to join a team
    onJoinClose(); // Close modal after action
  };

  // Sample data for the hackathon
  const hackathonData = {
    name: 'Hackathon 1',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0iL0Ou0tzB0N6qSFS_mBgiRybGo-h4M71w2LpM2-9A&s', // Replace with actual image URL
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mauris sed nisi aliquam commodo. Integer at arcu elit. Nullam convallis sagittis eleifend. Sed nec quam a sapien vestibulum vehicula.',
  };

  return (
    <div>
      <Header />
      <Box p={8} maxW={{ base: '90%', sm: '80%', md: '70%', lg: '50%' }} mx="auto">
        <img src={hackathonData.image} alt={hackathonData.name} style={{ width: '100%', marginBottom: '20px' }} />
        <Heading as="h2" fontSize="4xl" mb={4}>
          {hackathonData.name}
        </Heading>
        <Button colorScheme="blue" mb={4} mr={4} onClick={onCreateOpen}>Create Team</Button>
        <Button colorScheme="green" mb={4} mr={4} onClick={onJoinOpen}>Join Team</Button>
        
        <Text>{hackathonData.description}</Text>
      </Box>

      {/* Create Team Modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCreateClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleCreateTeam}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Join Team Modal */}
      <Modal isOpen={isJoinOpen} onClose={onJoinClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join a Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Team Code"
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onJoinClose}>Cancel</Button>
            <Button colorScheme="green" onClick={handleJoinTeam}>Join</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </div>
  );
};

export default Participate;
