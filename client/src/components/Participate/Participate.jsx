import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const Participate = () => {
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isJoinOpen, onOpen: onJoinOpen, onClose: onJoinClose } = useDisclosure();
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    try {
      const response = await fetch(
        `http://127.0.0.1:3500/api/teams/register/create/${id}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamName: teamName
          }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        toast({
          title: "Team Created",
          description: `Your team code is: ${json.data.teamCode}. Copy and share with your teammates`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate('/gitpage'); // Redirect on success
      } else {
        throw new Error(json.message || "Failed to create team");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    try {
      const response = await fetch(
        `http://127.0.0.1:3500/api/teams/register/join/${id}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamCode: teamCode
          }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        toast({
          title: "Joined Team",
          description: "You successfully joined the team",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate('/gitpage'); // Redirect on success
      } else {
        throw new Error(json.message || "Failed to join team");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Sample data for the hackathon
  const hackathonData = {
    name: 'Hackathon 1',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0iL0Ou0tzB0N6qSFS_mBgiRybGo-h4M71w2LpM2-9A&s', // Use an actual image URL
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  return (
    <div>
      <Header />
      <Box p={8} maxW={{ base: '90%', sm: '80%', md: '70%', lg: '50%' }} mx="auto">
        <img src={hackathonData.image} alt={hackathonData.name} style={{ width: '100%', marginBottom: '20px' }} />
        <Heading as="h2" fontSize="4xl" mb={4}>{hackathonData.name}</Heading>
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
            <Input placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
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
            <Input placeholder="Team Code" value={teamCode} onChange={(e) => setTeamCode(e.target.value)} />
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
