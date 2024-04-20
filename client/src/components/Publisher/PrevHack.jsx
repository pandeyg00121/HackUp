import { Box, Grid, Heading, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,ModalFooter, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Button, useDisclosure, HStack, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useState} from 'react'
import Footer from '../Layout/Footer';
import Sidebar from './Sidebar';

const PrevHack = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [declared, setDeclared] = useState(true);
  const [winnerFormOpen, setWinnerFormOpen] = useState(false);
  const [winner1, setWinner1] = useState('');
  const [winner2, setWinner2] = useState('');
  const [winner3, setWinner3] = useState('');

  const declaredHackathons = [
    {
      _id: 1,
      name: "Hackathon 1",
      conductedAt: "2023-03-15",
      winners: ["Team A", "Team B"],
      details: "This was a hackathon held in March 2023.",
    },
    {
      _id: 2,
      name: "Hackathon 2",
      conductedAt: "2023-07-20",
      winners: ["Team C", "Team D"],
      details: "Another hackathon conducted in July 2023.",
    }
  ];

  const undeclaredHackathons = [
    {
      _id: 1,
      name: "Hackathon 3",
      conductedAt: "2023-03-15",
      teams: [
        { name: "Team E", github: "https://github.com/teamE" },
        { name: "Team F", github: "https://github.com/teamF" },
        // Add more teams as needed
      ],
      details: "This was a hackathon held in March 2023.",
    },
    {
      _id: 2,
      name: "Hackathon 4",
      conductedAt: "2023-07-20",
      teams: [
        { name: "Team G", github: "https://github.com/teamG" },
        { name: "Team H", github: "https://github.com/teamH" },
        // Add more teams as needed
      ],
      details: "Another hackathon conducted in July 2023.",
    }
  ];

  const handleHackathonClick = (hackathon) => {
    setSelectedHackathon(hackathon);
    onOpen();
  };

  const handleDeclareResultClick = () => {
    setWinnerFormOpen(true);
  };

  const handleWinnerFormSubmit = () => {
    // Here you would typically submit the winners to your backend
    // For now, let's just log them
    console.log("Winners declared:", winner1, winner2, winner3);
    // Close the winner form modal
    setWinnerFormOpen(false);
  };

  return (
    <>
      <Grid  minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Box
          p={["0", "8"]} overflowX={"auto"}
        >
          <Heading textTransform={'uppercase'} children="Previous Hackathons" my={"2"} textAlign={["center", "left"]} />
          <HStack mt={"4"} mb={"4"}>
            <Button colorScheme={declared ? 'green' : 'gray'} onClick={() => setDeclared(true)}>Declared</Button>
            <Button colorScheme={!declared ? 'green' : 'gray'} onClick={() => setDeclared(false)}>To be Declared</Button>
          </HStack>
          {declared ? (
            <VStack spacing={4} align="stretch">
              {declaredHackathons.map(hackathon => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} onClick={() => handleHackathonClick(hackathon)} declared={declared}/>
              ))}
            </VStack>
          ) : (
            <VStack spacing={4} align="stretch">
              {undeclaredHackathons.map(hackathon => (
                <UndeclaredHackathonCard key={hackathon._id} hackathon={hackathon} onDeclareResultClick={() => handleDeclareResultClick()} />
              ))}
            </VStack>
          )}
        </Box>
        <Sidebar />
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedHackathon?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Conducted At: {selectedHackathon?.conductedAt}</Text>
            {selectedHackathon?.winners && (
              <Text>Winners: {selectedHackathon?.winners.join(", ")}</Text>
            )}
            <Text>{selectedHackathon?.details}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={winnerFormOpen} onClose={() => setWinnerFormOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Declare Winners</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Winner 1</FormLabel>
              <Input placeholder="Enter winner 1" value={winner1} onChange={(e) => setWinner1(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Winner 2</FormLabel>
              <Input placeholder="Enter winner 2" value={winner2} onChange={(e) => setWinner2(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Winner 3</FormLabel>
              <Input placeholder="Enter winner 3" value={winner3} onChange={(e) => setWinner3(e.target.value)} />
            </FormControl>
            <Button mt={4} colorScheme="blue" onClick={handleWinnerFormSubmit}>Post Result</Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Footer />
    </>
  )
}

const HackathonCard = ({ hackathon, onClick, declared }) => {
  console.log(declared);
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={"gray.300"}
      onClick={onClick}
      cursor="pointer"
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
        {declared && hackathon.winners && (
          <Box>
            <Text color="gray.500">{hackathon.winners.join(", ")}</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

const UndeclaredHackathonCard = ({ hackathon, onDeclareResultClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={"yellow.500"}
        onClick={onOpen}
        cursor="pointer"
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{hackathon.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="semibold">Teams:</Text>
            <Table variant="simple" mt={4}>
              <TableCaption>Teams with GitHub Links</TableCaption>
              <Thead>
                <Tr>
                  <Th>Team</Th>
                  <Th>GitHub</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hackathon.teams.map((team, index) => (
                  <Tr key={index}>
                    <Td>{team.name}</Td>
                    <Td><a href={team.github} target="_blank" rel="noopener noreferrer">{team.github}</a></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onDeclareResultClick}>Declare Result</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PrevHack;
