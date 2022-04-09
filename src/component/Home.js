// import React,{useEffect,useState} from 'react'
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// function Home() {
//     const [countries, setCountries] = useState([])
//     const [globe, setGlobe] = useState("Worldwide")


//       const getCountries = async()=>{
//         await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
//         .then((response) => response.json())
//         .then((data)=>{
//           console.log(data)
//         const countries = data.map((elCountry)=>(
//           {
//             name: elCountry.country,
//             value: elCountry.countryInfo.iso2
//           }
//           ))
//           useEffect(() => {
//             getCountries()
//             console.log('useeffect running')
//               }, [])
//           setCountries(countries)
//           console.log(countries)
//       })
//     }

//     // const [inputCountry, setInputCountry] = useState('');

//   const handleChange = (event) => {
//     setGlobe(event.target.value);
//     console.log(setGlobe)
//   };

// return (
//     <div>
//         <h1 className='text-center font-bold text-4xl'>Covid-19 Tracker App</h1>
//       <Box sx={{ width: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Country</InputLabel>
//         <Select
//           variant='outlined'
//           // label="Country"
//           defaultValue={globe}
//           // value={globe}
//           onChange={handleChange}
//         >
//           <MenuItem value="ww">Worldwide</MenuItem>
//           {countries.map((element)=>{
//             return <MenuItem value={element.value}>{element.name}</MenuItem>
//           })
//           }
//           {/* <MenuItem value={20}>Twenty</MenuItem> */}
//           {/* <MenuItem value={30}>Thirty</MenuItem> */}
//         </Select>
//       </FormControl>
//     </Box>
//     </div>
// )
// }

// export default Home