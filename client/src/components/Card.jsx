import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Card = ({id, name, StartDate,EndDate, prizePool, entryFees }) => {
  const navigateTo = useNavigate();

   const onParticipateClick = () => {
    // console.log(id);
    // console.log(`/participate/${id}`);
    navigateTo(`/participate/${id}`);
  };
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
      mb={4}
      width={"200px"}
    >
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        {name}
      </Text>
      <Text>
        <b>StartDate:</b> {StartDate}
      </Text>
      <Text>
        <b>EndDate:</b> {EndDate}
      </Text>
      <Text>
        <b>Prize Pool:</b> {prizePool}
      </Text>
      <Text>
        <b>Entry Fees:</b> {entryFees}
      </Text>
      <Button colorScheme="blue" mt={4} onClick={onParticipateClick}>
        Participate
      </Button>
    </Box>
  );
};

export default Card;
