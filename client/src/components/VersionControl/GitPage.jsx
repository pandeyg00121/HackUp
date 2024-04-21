import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, HStack, Avatar, Badge, Divider, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { Link } from 'react-router-dom';

const GitPage = () => {
  const [repoInfo, setRepoInfo] = useState({
    "name": "Web-Deviola",
    "description": "Participating in Hackathons!",
    "html_url": "https://github.com/yourusername/my-hackathon-platform",
    "stargazers_count": 100,
    "forks_count": 50,
    "watchers_count": 75
  });

  const [contributors, setContributors] = useState([
    {
      "id": 1,
      "login": "contributor1",
      "avatar_url": "https://avatars.githubusercontent.com/u/1"
    },
    {
      "id": 2,
      "login": "contributor2",
      "avatar_url": "https://avatars.githubusercontent.com/u/2"
    },
    {
      "id": 3,
      "login": "contributor3",
      "avatar_url": "https://avatars.githubusercontent.com/u/3"
    }
  ]);
  ;

  // useEffect(() => {
  //   // Fetch repository information and contributors from backend API
  //   axios.get('/api/repository/:owner/:repo')
  //     .then(response => {
  //       setRepoInfo(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching repository information:', error);
  //     });
  //   axios.get('/api/contributors/:owner/:repo')
  //     .then(response => {
  //       setContributors(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching contributors:', error);
  //     });

  //   // Fetch contributions data
  //   axios.get('/api/contributions/:owner/:repo')
  //     .then(response => {
  //       setContributions(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching contributions:', error);
  //     });
  // }, []);


  return (
    <>
    <Header/>
    <Flex h={"100vh"} >
    <Box p="6" bg="blue.900" w={"100vw"}>
      <Flex direction={"column"} alignItems={"center"}>
      <Heading color={"yellow.500"}  as="h2" size="xl" mb="4">{repoInfo?.name}</Heading>
      <Text fontWeight={"bold"} fontSize="lg" color="yellow.600">{repoInfo?.description}</Text>
     <VStack mt={"4"} align="start" spacing="4">
        <Link to={"/commits"}>
          <Text fontWeight={"bold"} fontSize={"lg"} color={"white"}>Commits</Text>
        </Link>
        <Link to={"/chat"}>
          <Text fontWeight={"bold"} fontSize={"lg"} color={"white"}>Chat</Text>
        </Link>
        <HStack mt={"5"} spacing="4">
          <Badge fontSize={"lg"} colorScheme="blue">Stars: {repoInfo?.stargazers_count}</Badge>
          <Badge fontSize={"lg"} colorScheme="green">Forks: {repoInfo?.forks_count}</Badge>
          <Badge  fontSize={"lg"} colorScheme="orange">Watchers: {repoInfo?.watchers_count}</Badge>
        </HStack>
      </VStack>

      <VStack align="start" spacing="10">
        <Heading color={"white"} mt={"10"} as="h3" size="lg">Contributors</Heading>
        {contributors.map(contributor => (
          <HStack key={contributor.id}>
            <Avatar src={contributor.avatar_url} />
            <Text color={"white"}>{contributor.login}</Text>
          </HStack>
        ))}
      </VStack>
      </Flex>
      <Text color={"white"} mt={"5"} fontSize="md">
          <Link _hover={"none"} href={repoInfo?.html_url} isExternal color="green.500">
            View on GitHub
          </Link>
        </Text>
    </Box>
    </Flex>
    <Footer/>
    </>
  );
};

export default GitPage;
