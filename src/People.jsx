import { ReactNode } from 'react';
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Center,
  Text,
  Image,
  Heading,

} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

const Links = ['People', 'Planets', 'Starships'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

// fetching API


export default function People() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [people, setPeople] = useState([])
  const [currentPage, setCurrentPage] = useState("https://swapi.dev/api/people/?page=1");
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const navigate = useNavigate()
  const goToPreviousPage = () => {
    setCurrentPage(previousPage);
  };

  const goToNextPage = () => {
    setCurrentPage(nextPage);
  };

  useEffect(() => {
   
    fetchPeople(currentPage)
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])
 
  const fetchPeople = async () => {
  
    await axios.get(currentPage).then((res) => {
      console.log(res.data)
      setNextPage(res.data.next);
      setPreviousPage(res.data.previous);
      setPeople(res.data.results)
    }).catch((error) => {
      console.log(error.message)
    })
  };

 

 
  useEffect(() => {
    peopleFetch()
   
  }, [])
 
  const peopleFetch = () => {

    axios.get('https://swapi.dev/api/people/').then((res) => {
      console.log(res.data)
      setPeople(res.data.results)
      console.log(res.data.results[0].url)
    }).catch((error) => {
      console.log(error.message)
    })

  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Star Wars API</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
                  />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        textAlign={"center"}
      >
        Welcome to People Page
      </Text>
      <Grid templateColumns='repeat(4, 1fr)' gap={6} p={6}>

        {people.map((ele, i) => {
        
          return (
            <GridItem>
              <Box
                role={'group'}
                mt={15}
                p={6}
                maxW={'430px'}
                w={'full'}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
              >
                <Box
                  rounded={'lg'}
                  pos={'relative'}
                  height={'230px'}
                  _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${IMAGE})`,
                    filter: 'blur(15px)',
                    zIndex: -1,
                  }}
                  _groupHover={{
                    _after: {
                      filter: 'blur(20px)',
                    },
                  }}>
                  <Image
                    rounded={'lg'}
                    height={230}
                    width={282}
                    objectFit={'cover'}
                    src={IMAGE}
                  />
                </Box>

                <Stack pt={10} align={'center'} key={i}>
                  <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color={"blue"}>
                    {ele.name}
                  </Heading>
                  <Stack direction={'column'} align={'start'}>

                    <Text color={'gray.600'}>
                      <strong>Height</strong> : {ele.height} cm
                    </Text>
                    <Text color={'gray.600'}>
                      <strong>Mass</strong> : {ele.mass} kg
                    </Text>
                    <Text color={'gray.600'}>
                      <strong>Hair Color</strong> : {ele.hair_color}
                    </Text>
                    <Text color={'gray.600'}>
                      <strong>Skin Color</strong> : {ele.skin_color}
                    </Text>
                    <Text color={'gray.600'}>
                      <Link><Button onClick={()=>navigate(`/peopledetails/${i+1}`)}>Url</Button></Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </GridItem>
          )
        }
        )}
      </Grid>
      <Center>
      <Stack direction='row' spacing={16} align='center' mb={10}>
        <Button colorScheme='teal' variant='solid'  boxShadow={
          '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
        }  onClick={goToPreviousPage}>
          Previous
        </Button>
        <Button colorScheme='teal' variant='solid'  boxShadow={
          '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
        } onClick={goToNextPage}>
          Next
        </Button>

      </Stack>
      </Center>
    </>
  );
}