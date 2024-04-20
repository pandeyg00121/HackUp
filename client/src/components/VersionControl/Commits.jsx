import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Divider } from '@chakra-ui/react';
import axios from 'axios';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const Commits = () => {
  const [commits, setCommits] = useState([
    {
      "sha": "f3a61cb67a90c571ecaff0179a85c0f54f2e83d4",
      "message": "Initial commit",
      "author": "John Doe",
      "date": "2024-04-20T10:00:00Z",
      "url": "https://github.com/owner/repo/commit/f3a61cb67a90c571ecaff0179a85c0f54f2e83d4"
    },
    {
      "sha": "a7b84d9b256354fa1dc45f5aeaf4b46d8e5e1fa2",
      "message": "Add README.md",
      "author": "Jane Smith",
      "date": "2024-04-21T09:30:00Z",
      "url": "https://github.com/owner/repo/commit/a7b84d9b256354fa1dc45f5aeaf4b46d8e5e1fa2"
    },
    {
      "sha": "c9e285ca8a90c971abcde678b9a85c0f54f2e83d",
      "message": "Update dependencies",
      "author": "Alice Johnson",
      "date": "2024-04-22T11:15:00Z",
      "url": "https://github.com/owner/repo/commit/c9e285ca8a90c971abcde678b9a85c0f54f2e83d"
    }
  ]
  );

//   useEffect(() => {
//     // Fetch commit details from backend API
//     axios.get('/api/repository/:owner/:repo/commits')
//       .then(response => {
//         setCommits(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching commit details:', error);
//       });
//   }, []);

  return (
    <>
    <Header/>
    <Box p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="xl">Commit History</Heading>
      {commits.map(commit => (
        <Box key={commit.sha} my="4">
          <Heading as="h3" size="md">{commit.message}</Heading>
          <Text>Author: {commit.author}</Text>
          <Text>Date: {new Date(commit.date).toLocaleString()}</Text>
          <Text>
            <a href={commit.url} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Text>
          <Divider my="2" />
        </Box>
      ))}
    </Box>
    <Footer/>
    </>
  );
};

export default Commits;
