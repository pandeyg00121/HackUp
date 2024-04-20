import React from 'react';
import Header from '../Layout/Header';
import Card from '../Card';
import { Box, Button, Text, extendTheme, ChakraProvider} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

// Custom color scheme
const theme = extendTheme({
  colors: {
    customBlue: {
      500: '#3182CE', // Adjust color code as needed
    },
  },
});

const Home = () => {
  // Sample data for the cards
  const hackathonsData = [
    {
      id: 1,
      name: 'Hackathon 1',
      dates: 'April 20 - April 25, 2024',
      prizePool: '$1000',
      entryFees: '$20',
    },
    {
      id: 2,
      name: 'Hackathon 2',
      dates: 'May 10 - May 15, 2024',
      prizePool: '$1500',
      entryFees: '$25',
    },
    // Add more hackathon data as needed
  ];

  const headingStyle = {
    fontWeight: 'bold',
    fontSize: '1.5rem', // Adjust the font size as needed
    marginBottom: '1rem', // Add margin bottom for spacing
  };

  return (
    <ChakraProvider theme={theme}>
      <div>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <NavLink to="/home">
            <Button colorScheme="white" mt={4} marginRight={10} color={'black'} border={2}> {/* Change color scheme to customBlue */}
              Incoming
            </Button>
            </NavLink>
            <NavLink to="/past">
            <Button colorScheme="customBlue" mt={4} marginRight={10}>
              Past
            </Button>
            </NavLink>
            <NavLink to="/live">
            <Button colorScheme="white" mt={4} marginRight={10} color={'black'} border={2}>
              Live
            </Button>
            </NavLink>
          </div>
          <h2 style={headingStyle}>Hackathons</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {hackathonsData.map(hackathon => (
              <Card
                key={hackathon.id}
                name={hackathon.name}
                dates={hackathon.dates}
                prizePool={hackathon.prizePool}
                entryFees={hackathon.entryFees}
              />
            ))}
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Home;
