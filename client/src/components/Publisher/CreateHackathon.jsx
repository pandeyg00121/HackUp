import { Grid, Heading, Container, VStack, Input, Button, Textarea, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { useNavigate } from "react-router-dom"

const CreateHackathon = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prizePool, setPrizePool] = useState("");
  // const [registrationLink, setRegistrationLink] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [minTeamSize, setMinTeamSize] = useState(1);
  const [maxTeamSize, setMaxTeamSize] = useState(1);

  const submitHandler = async(e) => {
    e.preventDefault();
    // Here you can handle form submission
     const hackathonData = {
      title,
      description,
      startDate,
      endDate,
      prizePool,
      // registrationLink,
      registrationEndDate,
      teamSizeOptions: {
        min: minTeamSize,
        max: maxTeamSize,
      }
    };

    try {
      // console.log("hi");
      const publisherId = localStorage.getItem("publisherId");
      console.log(publisherId)
      const response = await fetch(
        `http://127.0.0.1:3500/api/publishers/create/${publisherId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title:title,
      description:description,
      startDate: startDate,
      endDate: endDate,
      prizePool:prizePool,
      // registrationLink
      registrationEndDate:registrationEndDate,
      teamSizeOptions: {
        min: minTeamSize,
        max: maxTeamSize,
      }
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      // navigateTo("/loginpub")
    } catch (error) {
      alert("Invalid credentials");
    }
  }

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Container py="16">
        <form onSubmit={submitHandler}>
          <Heading textTransform={'uppercase'} size={"lg"} children="Create A Hackathon" my={"16"} textAlign={["center", "left"]} />
          <VStack m={"auto"} spacing={"8"}>
            <FormControl>
              <FormLabel>Title:</FormLabel>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter title"
                type="text"
                focusBorderColor="red.300"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description:</FormLabel>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter description"
                focusBorderColor="red.300"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Date:</FormLabel>
              <Input
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                placeholder="Select start date"
                type="date"
                focusBorderColor="red.300"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Date:</FormLabel>
              <Input
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                placeholder="Select end date"
                type="date"
                focusBorderColor="red.300"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Prize Pool:</FormLabel>
              <Input
                value={prizePool}
                onChange={e => setPrizePool(e.target.value)}
                placeholder="Enter prize pool"
                type="number"
                focusBorderColor="red.300"
              />
            </FormControl>
            {/* <FormControl>
              <FormLabel>Registration Link:</FormLabel>
              <Input
                value={registrationLink}
                onChange={e => setRegistrationLink(e.target.value)}
                placeholder="Enter registration link"
                type="url"
                focusBorderColor="red.300"
              />
            </FormControl> */}
            <FormControl>
              <FormLabel>Registration End Date:</FormLabel>
              <Input
                value={registrationEndDate}
                onChange={e => setRegistrationEndDate(e.target.value)}
                placeholder="Select registration end date"
                type="date"
                focusBorderColor="red.300"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Minimum Team Size</FormLabel>
              <Input
                value={minTeamSize}
                onChange={e => setMinTeamSize(e.target.value)}
                placeholder="Enter minimum team size"
                type="number"
                focusBorderColor="red.300"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Maximum Team Size</FormLabel>
              <Input
                value={maxTeamSize}
                onChange={e => setMaxTeamSize(e.target.value)}
                placeholder="Enter maximum team size"
                type="number"
                focusBorderColor="red.300"
                required
              />
            </FormControl>
            <Button w={"full"} colorScheme='green' type='submit' fontWeight={"bold"} >Create</Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  )
}

export default CreateHackathon;
