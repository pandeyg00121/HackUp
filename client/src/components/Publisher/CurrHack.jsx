import { Box, Grid, Heading, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { useState } from 'react'
import Footer from '../Layout/Footer';
import Sidebar from './Sidebar';

const CurrHack = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null); // To store the selected hackathon details

  const previousHackathons = [
    {
      _id: 1,
      name: "Hackathon 1",
      conductedAt: "2023-03-15",
      teams: [
        { name: "Team A", github: "https://github.com/TeamA" },
        { name: "Team B", github: "https://github.com/TeamB" }
      ],
      details: "This was a hackathon held in March 2023.",
    },
    {
      _id: 2,
      name: "Hackathon 2",
      conductedAt: "2023-07-20",
      teams: [
        { name: "Team C", github: "https://github.com/TeamC" },
        { name: "Team D", github: "https://github.com/TeamD" }
      ],
      details: "Another hackathon conducted in July 2023.",
    }
  ];

  const handleHackathonClick = (hackathon) => {
    setSelectedHackathon(hackathon);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Box p={["0", "8"]} overflowX={"auto"}>
          <Heading textTransform={'uppercase'} children="Current Hackathons" my={"2"} textAlign={["center", "left"]} />

          <VStack spacing={4} align="stretch">
            {previousHackathons.map(hackathon => (
              <HackathonCard key={hackathon._id} hackathon={hackathon} onClick={() => handleHackathonClick(hackathon)} />
            ))}
          </VStack>
        </Box>
        <Sidebar />
      </Grid>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedHackathon?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Conducted At: {selectedHackathon?.conductedAt}</Text>
            <Text>{selectedHackathon?.details}</Text>
            <Text mt={4} fontWeight="semibold">Participating Teams:</Text>
            <Table variant="striped" colorScheme="gray" mt={4}>
              <Thead>
                <Tr>
                  <Th>Team Name</Th>
                  <Th>GitHub Profile</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedHackathon?.teams.map((team, index) => (
                  <Tr key={index}>
                    <Td>{team.name}</Td>
                    <Td><a href={team.github} target="_blank" rel="noopener noreferrer">{team.github}</a></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Footer />
    </>
  )
}

const HackathonCard = ({ hackathon, onClick }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={onClick}
      cursor="pointer"
      bg={"green.400"}
    >
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Text fontWeight="semibold" fontSize="lg" color="blue.500">
            {hackathon.name}
          </Text>
        </Box>
        <Box mt="1" lineHeight="tight">
          <Text fontWeight="semibold">{hackathon.conductedAt}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default CurrHack;
