import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const Card2 = ({ name, StartDate,EndDate, prizePool, entryFees }) => {
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
    </Box>
  );
};

export default Card2;
