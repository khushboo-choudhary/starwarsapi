// // import {
// //     Box,
// //     Center,
// //     useColorModeValue,
// //     Heading,
// //     Text,
// //     Stack,
// //     Image,
// //   } from '@chakra-ui/react';
//   import { useEffect } from 'react';
// import axios from "axios"
  
// //   const IMAGE =
// //     'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';
  
//   export default function ProductSimple() {

//     const [movieInfo, setMovieInfo] = useState([]);//array to all films-movieInfo, setMovieInfo take the result of dataFilms in useEffect
//   const [moviePeople, setMoviePeople] = useState({});

//   useEffect(() => {
//     async function fetchInfo() {
//       let resp = await fetch("http://swapi.dev/api/films");
//       let dataFilms = await resp.json();
//       setMovieInfo(dataFilms.results);
//     }
//     fetchInfo();
//   }, []);

//   const movieHandler = (movieInformation) => {
//     setMoviePeople(movieInformation);
//     console.log(moviePeople);
//   };

//   return (
//  <div></div>


//   );
// }
// useEffect(() => {
// async function fetchInfo() {
//     try {
//         let characterResponse = await axios.get('http://swapi.co/api/people/2/')
//         let characterResponseJson = await characterResponse.json()
//         let films = await Promise.all(
//           characterResponseJson.films.map(async filmUrl => {
//             let filmResponse = await fetch(filmUrl)
//             return filmResponse.json()
//           })
//         )
//         console.log("films",films)
//     }catch (err) {
//         console.log(err)
//       }
// }


// fetchInfo();
//   }, []);
//   }

//   useEffect(() => {
//     peopleFetch()

//     // eslint-disable-next-line no-use-before-define
// }, [])

//   const peopleFetch = () => {

//     axios.get("https://swapi.dev/api/people/1").then((res) => {
//         console.log((res.data)
       
//     }).then((res) => {
//         Promise.all(res.films.map(filmUrl => fetch(filmUrl).then(filmResponse => filmResponse.json())
//         )
//         ).then(films => {
//             console.log("films", films)})
//         })
//         .catch((error) => {
//             console.log(error.message)
//         })

// }
