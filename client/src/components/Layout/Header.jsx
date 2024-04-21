
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import logo from "../../assets/logo.jpg"
import { Link} from 'react-router-dom';
import {  RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';


const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button
      variant={'ghost'}
      color={'yellow.600'}
      fontWeight={'bold'}
      size={'md'}
    >
      {title}
    </Button>
  </Link>
);

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated=true;
  const user = {
    _id: '123456890qwerty',
    name: 'Pranay Pandey',
    role: 'publisher',
    profilePic:
      'https://media.licdn.com/dms/image/D4D03AQGM3TYJYte9bA/profile-displayphoto-shrink_800_800/0/1687941627773?e=1715817600&v=beta&t=59SDcTROZWoNY8O7S3hTWYqGdqvgUMjWpHB2i5HR95s',
  };

  return (
    <HStack
      p={2}
      justifyContent={'space-between'}
      bgColor="rgba(0,0,0,0.6)"
      width="100%"
    >
      {/*Left Side*/}
      <Box>
        <Link to={'/'}>
          <Image
            src={logo}
            borderRadius="full"
            boxSize="60px"
            objectFit="cover"
          />
        </Link>
      </Box>
      {/*Right Side*/}
      <Stack direction="col">
        {user && (
          <>
            <Link to={`user/${user._id}`}>
              <Image
                src={user.profilePic}
                borderRadius="full"
                boxSize="42px"
                objectFit="cover"
              />
            </Link>
            <Text
              children={`${user.name.split(' ')[0]}`}
              fontSize={['medium', 'large']}
              mt={'10px'}
              fontFamily="sans-serif"
              fontWeight={'bold'}
            />
          </>
        )}
        <Button
          onClick={onOpen}
          colorScheme="yellow"
          width={'10'}
          height={'10'}
          zIndex={'overlay'}
        >
          <RiMenu5Fill />
        </Button>
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerHeader />
          <DrawerContent bg="rgba(0, 0, 0, 0.7)">
            <DrawerBody mt={5}>
              <VStack spacing={'8'} alignItems={'flex-start'}>
                <LinkButton onClose={onClose} url="/" title="Home" />
                <LinkButton onClose={onClose} url="/user/profile" title="My Profile" />
                
                <HStack
                  justifyContent={'space-evenly'}
                  position={'absolute'}
                  bottom={'2rem'}
                  width={'80%'}
                >
                  {isAuthenticated ? (
                    <>
                    <VStack>
                        <HStack>
                           <Link onClick={onClose} to="/profile">
                            <Button variant={"ghost"} colorScheme='yellow'>
                                Profile
                            </Button>
                           </Link>
                           <Button colorScheme='red' variant={"ghost"}>
                                <RiLogoutBoxLine/>
                                Logout
                            </Button> 
                        </HStack>
                        {
                            user && user.role==="publisher" && <Link onClick={onClose} to="/publisher/currhackathons">
                                <Button colorScheme='purple' variant={"ghost"}>
                                <RiDashboardFill style={{margin:"4px"}}/>
                                   Dashboard 
                                </Button>
                            </Link>
                        }
                    </VStack>
                    </>
                  ) : (
                    <>
                      <Link onClick={onClose} to="/login">
                        <Button colorScheme="yellow">Login</Button>
                      </Link>
                      <p>OR</p>
                      <Link onClick={onClose} to="/register">
                        <Button colorScheme="yellow">Sign-Up</Button>
                      </Link>
                    </>
                  )}
                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Stack>
    </HStack>
  );
};

export default Header;
