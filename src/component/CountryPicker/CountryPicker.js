import React,{useState,useEffect} from 'react';
import {FormControl,NativeSelect} from '@mui/material';
import styles from './CountryPicker.module.css';
import { fetchCountryData, fetchCountryName } from '../../Api/Api';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function CountryPicker() {
  const [countryName, setcountryName] = useState([]);
  const [countryData, setcountryData] = useState({});
  const [update, setupdate] = useState('');
  const [chartData, setchartData] = useState({
    cases:'',
    recovered:'',
    deaths:''
  });
  useEffect(() => {
    const fetchCountry = async()=>{
      const response = await fetchCountryName();
      setcountryName(response.data);
    }
    fetchCountry();
    console.log(countryName)
  // });
  }, [])

  const specificCountry = async(e)=>{
    const response = await fetchCountryData(e.target.value)
    // setcountryData(response.data);
    const data = response.data;
    await setcountryData(data);
    await setupdate(data.updated)
    console.log(countryData);
    console.log(countryData.cases)
    console.log(countryData.deaths)
    console.log(countryData.recovered)
    // await setchartData({cases:countryData.cases,recovered:countryData.recovered,deaths:countryData.deaths});
    await setchartData({cases:data.cases,recovered:data.recovered,deaths:data.deaths});
    // console.log(chartData)
  }

  const CountryDaily = async(e)=>{
  if(e.target.value==='update'){
    await setchartData({cases:countryData.todayCases,recovered:countryData.todayRecovered,deaths:countryData.todayDeaths})
    console.log('update');
  }
  if(e.target.value==='same'){
      await setchartData({cases:countryData.cases,recovered:countryData.recovered,deaths:countryData.deaths})
      console.log('running');
    }
    else{
      console.log('working correctly');
    }
  }


  const barChart = (
    countryData.cases?(
    <Bar
      data = {{
        labels: ['Infected','Recovered','Deaths'],
        datasets:[
          {
          label: `Last Updated: ${new Date(update).toDateString()}`,
          data: [chartData.cases,chartData.recovered,chartData.deaths],
          // data: countryData,
          fill: true,
          backgroundColor: ['rgba(0, 0, 255, 0.5)','rgba(0,255, 0, 0.5)','rgba(255, 0, 0, 0.5)']
          }
        ]
      }}/>):null
  )

  return (
    <div className={styles.countrydiv}>
    {/* // <div> */}
      <div className={styles.countryForm}>
      <FormControl fullWidth>
        <NativeSelect onClick={specificCountry}>
        {/* <NativeSelect> */}
         <option value=''>Global</option>
         {countryName.map((element,index)=>
        // <option value={element.countryInfo.iso2}>{element.country}</option>
        <option value={element.countryInfo.iso2} onClick={specificCountry}>{element.country}</option>
        )}
         </NativeSelect>
         </FormControl>
       </div>

       {countryData.cases?<div className={styles.countryForm}>
       <FormControl fullWidth>
       <NativeSelect onClick={CountryDaily}>
         <option value='same' onClick={CountryDaily}>Overall Data</option>
         <option value='update' onClick={CountryDaily}>Today Data</option>
         </NativeSelect>
         </FormControl>
         </div>:null}

       {barChart}

          
       

       

    </div>
  )
}
// <option value={element.countryInfo.iso2} onClick={()=>specificCountry(fds)>{element.country}</option>

// export default CountryPicker
export default CountryPicker;