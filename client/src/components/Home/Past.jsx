import React ,{useEffect,useState} from 'react';
import Header from '../Layout/Header';
import Card from '../Card';
import { Box, Button, Text, extendTheme, ChakraProvider} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Footer from '../Layout/Footer';

// Custom color scheme

const theme = extendTheme({
  colors: {
    customBlue: {
      500: '#3182CE', // Adjust color code as needed
    },
  },
});

const Past = () => {
  const [hackathonsData, setHackathonsData] = useState([]); 
  // Sample data for the cards
   const loadData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3500/api/hackathons/past", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setHackathonsData(data.data);  // Set fetched data to state
        console.log("Data set to state:", data.data);
      } else {
        throw new Error('Failed to fetch data: ' + response.status);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    loadData();
  },[]);


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
            <NavLink to="/">
            <Button colorScheme="white" mt={4} marginRight={10} color={'black'} border={2}> {/* Change color scheme to customBlue */}
              Upcoming
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
            <NavLink to="/leaderboard">
            <Button colorScheme="white" mt={4} marginRight={10} color={'black'} border={2}>
              Leaderboard
            </Button>
            </NavLink>
          </div>
          <h2 style={headingStyle}>Hackathons</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {hackathonsData.map(hackathon => (
              <Card
                 key={hackathon._id}
                 id={hackathon._id}
                name={hackathon.description}
                StartDate={hackathon.startDate}
                EndDate ={hackathon.endDate}
                prizePool={hackathon.prizePool}
                entryFees={hackathon.entryFees}
              />
            ))}
          </div>
        </div>
        <Footer/>
      </div>
    </ChakraProvider>
  );
};

export default Past;
