import { React } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Grid,
    GridItem,
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


export default function Favourite() {

    const navigate = useNavigate()
    const ele = JSON.parse(localStorage.getItem("favourite")) || [];

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
                Welcome to Favourite Page
            </Text>
            <Grid templateColumns='repeat(4, 1fr)' gap={6} p={6}>

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

                        <Stack pt={10} align={'center'}>
                            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color="red">
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
                                    <Button colorScheme='pink' variant='solid' boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }>Url</Button>&nbsp;&nbsp;&nbsp;
                                    <Button colorScheme='whatsapp' variant='solid' boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }>
                   Favourited
                </Button>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </GridItem>

            </Grid>
            <Center>
                <Button colorScheme='teal' mb={10} variant='solid' boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                    onClick={() => { navigate('/') }}
                >
                    Go To Home
                </Button>
            </Center>
        </>
    );
}