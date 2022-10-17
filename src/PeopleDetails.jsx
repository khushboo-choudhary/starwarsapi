import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from "./Navbar";
import {
    Box,
    useColorModeValue,
    Stack,
    Heading,
    Image,
    Text,
    Flex,
    Button,
    Center
} from '@chakra-ui/react';
const IMAGE =
    'https://pipedream.com/s.v0/app_mE7hlb/logo/orig';

export default function PeopleDetails() {
    const { id } = useParams();
    const [peopleDetails, setPeopleDetails] = useState({});
    const [filmsUrl, setFilmsUrl] = useState([])
    const [movieName, setMovieName] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        peopleFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const peopleFetch = () => {

        axios.get(`https://swapi.dev/api/people/${id}`).then((res) => {
            setPeopleDetails(res.data)
            setFilmsUrl(res.data.films)
        })
            .catch((error) => {
                console.log(error.message)
            })

    }

    useEffect(() => {
        (apiParer(filmsUrl).then((setMovieName)));

    }, [filmsUrl])

    const apiParer = async (arr = []) => {
        let res = [];
        try {
            if (arr.length) {
                for (let x of arr) {
                    let data = await fetch(x);
                    let { title } = await data.json();
                    res.push(title);
                }
                return res;
            }

        } catch (error) {
            console.log(error);
        }
        return [];
    };

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
                Welcome to People Details Page
            </Text>
            <Center mb={10}>
           
                <Flex>
                    <Box
                        role={'group'}
                        mt={20}
                        p={6}
                        maxW={'350px'}
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

                        {/* peopleDetails */}

                        <Stack pt={10} align={'center'}>

                            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color={"red"}>
                                <strong>Heading</strong> : {peopleDetails.name}
                            </Heading>

                            <Stack direction={'column'} align={'start'} pl={10}>

                                <Text color={'gray.600'}>
                                    <strong>Birth Year</strong> : {peopleDetails.birth_year} cm
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Gender</strong> : {peopleDetails.gender} kg
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Hair Color</strong> : {peopleDetails.hair_color}
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Skin Color</strong> : {peopleDetails.skin_color}
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Eye Color</strong> : {peopleDetails.eye_color}
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Height</strong> : {peopleDetails.height} cm
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Mass</strong> : {peopleDetails.mass} kg
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Home World</strong> : {peopleDetails.homeworld}
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Species</strong> : {peopleDetails.species}
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Url</strong> : {peopleDetails.url}
                                </Text>
                                <strong>Films :</strong>
                                {(filmsUrl).map((ele, i) => {
                                    return (
                                        <Text color={'gray.600'} key={i}>
                                            {ele}
                                        </Text>
                                    )
                                })}
                                <Text color={'gray.600'}>
                                    <strong>Created</strong> : {peopleDetails.created}
                                </Text>
                                <Text color={'gray.600'}>
                                    <strong>Edited</strong> : {peopleDetails.edited}
                                </Text>

                            </Stack>

                        </Stack>

                    </Box>
                    {/* film part */}
                    <Box role={'group'}
                        mt={20}
                        p={6}
                        maxW={'430px'}
                        w={'full'}
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'2xl'}
                        rounded={'lg'}
                        pos={'relative'}
                        zIndex={1}>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color={"Red"} >
                            Movie Names :
                        </Heading>
                        {Object.values(movieName).map((ele, i) => {

                            return (
                                <>

                                    <Stack pt={10} align={'center'} key={i}>

                                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color={"fuchsia"} key={i}>
                                            {ele}
                                        </Heading>
                                    </Stack>
                                </>
                            )
                        }
                        )}
                    </Box>
                </Flex>
            </Center>
            <Center>
                <Button colorScheme='teal' mb={10} variant='solid' boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                 onClick={()=> {navigate('/')}}
                 >
                    Go To Home
                </Button>
            </Center>
        </>
    )
}
