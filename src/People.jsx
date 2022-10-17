import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';

import {
    Box,
    Grid,
    GridItem,
    Link,
    Tooltip,
    useToast,
    Button,
    useColorModeValue,
    Stack,
    Center,
    Text,
    Image,
    Heading,

} from '@chakra-ui/react';
import Navbar from './Navbar';

const IMAGE =
    'https://i.ytimg.com/vi/tDNQBEc-au0/maxresdefault.jpg';

export default function People() {
    const toast = useToast();
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

        }).catch((error) => {
            console.log(error.message)
        })

    }


    return (
        <>
            <Navbar/>
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
                                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color={"fuchsia"}>
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
                                            <Link><Tooltip hasArrow label="PeopleDetails"><Button colorScheme='whatsapp' variant='solid' boxShadow={
                                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                            } onClick={() => navigate(`/peopledetails/${i + 1}`)}>Url</Button></Tooltip></Link>
                                            &nbsp;&nbsp;&nbsp;  <Tooltip hasArrow label="Favourite"><Button colorScheme='yellow' variant='solid' boxShadow={
                                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                            } key={ele.name}
                                                onClick={() => {

                                                    localStorage.setItem('favourite', JSON.stringify(ele))
                                                    toast({
                                                        title: 'Favourite List Created.',
                                                        description: "We've created your Favourite for you.",
                                                        status: 'success',
                                                        duration: 9000,
                                                        isClosable: true,
                                                    })
                                                    navigate('/favourite')
                                                }
                                                }
                                            >
                                                <FavoriteIcon sx={{ color: pink[500] }} />

                                            </Button></Tooltip>

                                        </Text>
                                    </Stack>
                                </Stack>
                            </Box>
                        </GridItem>
                    )
                }

                )

                }

            </Grid>
            <Center>
                <Stack direction='row' spacing={16} align='center' mb={10}>
                    <Button colorScheme='teal' variant='solid' boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    } onClick={goToPreviousPage}>
                        Previous
                    </Button>
                    <Button colorScheme='teal' variant='solid' boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    } onClick={goToNextPage}>
                        Next
                    </Button>

                </Stack>
            </Center>
        </>
    );
}