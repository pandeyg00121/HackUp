import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const Card = ({ name, dates, prizePool, entryFees }) => {
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
        <b>Dates:</b> {dates}
      </Text>
      <Text>
        <b>Prize Pool:</b> {prizePool}
      </Text>
      <Text>
        <b>Entry Fees:</b> {entryFees}
      </Text>
      <Button colorScheme="blue" mt={4}>
        Participate
      </Button>
    </Box>
  );
};

export default Card;
