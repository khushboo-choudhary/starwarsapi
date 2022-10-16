import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from 'react';


import {
    Box,
    useColorModeValue,
    Stack,
    Heading,
    Image,
    Center,
    Text
} from '@chakra-ui/react';
const IMAGE =
    'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export default function PeopleDetails() {
    const { id } = useParams();
    const [peopleDetails, setPeopleDetails] = useState({});
    const [filmsUrl, setFilmsUrl] = useState([])
    const [movieName, setMovieName] = useState([])

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
              let data = await axios.get(x);
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
            <Center>
                <Box
                    role={'group'}
                    mt={15}
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

                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color={"blue"}>
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
                    mt={15}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>

                    {Object.values(movieName).map((ele, i) => {

                        return (
                            <>
                            
                            <Stack pt={10} align={'center'}>
                            
                                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color={"blue"} key={i}>
                                     {ele}
                                </Heading>
                            </Stack>
                            </>
                        )
                    }
                    )}
                </Box>
            </Center>





        </>
    )
}
