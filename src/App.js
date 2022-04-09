import React,{useEffect,useState} from "react";
import styles from './App.module.css';
import {Cards,Chart,CountryPicker} from './component/Imports';
//
import {fetchCountryData, fetchCountryName, fetchData} from './Api/Api.js'
import {FormControl,NativeSelect} from '@mui/material';
import image from './image/covidImg.png'

function App() {
  const [state, setState] = useState({})
  const [countryClick, setcountryClick] = useState('')
  const [countryName, setcountryName] = useState([]);
  const [countryData, setcountryData] = useState({});
  // const [response, setResponse] = useState({})
  const [update, setupdate] = useState('');
  const [chartData, setchartData] = useState({
    cases:'',
    recovered:'',
    deaths:''
  });  

  useEffect(() => {
    const fetchApi = async()=>{
      const response = await fetchData();
      const data = response.data;
      setState(data);
      const response1 = await fetchCountryName();
      setcountryName(response1.data);
    }
    fetchApi();
      // console.log(state);
  },[]);


  const specificCountry = async(val)=>{
    if(val==='global'){
      const response = await fetchData();
      const data = response.data;
      setState(data);
      setupdate(null)
    }
    else{
    const response = await fetchCountryData(val)
    // setcountryData(response.data);
    const Brdata = response.data;
    console.log(Brdata);
    setcountryData(Brdata);
    console.log(countryData)
    setupdate(Brdata.updated)
    console.log(update)
    setchartData({cases:Brdata.cases,recovered:Brdata.recovered,deaths:Brdata.deaths});
    console.log(chartData)
    // setState(chartData)
    // console.log(state)
    }
  }

  useEffect(() => {
    chartData.cases===''?setupdate(countryData.updated):setState(chartData)
    console.log(state)
  }, [chartData])
  
  
  // handle()
// },[countryClick]);

  const CountryDaily = (dalval)=>{
    if(dalval==='update'){
      setchartData({cases:countryData.todayCases,recovered:countryData.todayRecovered,deaths:countryData.todayDeaths})
      console.log('update');
      setState(chartData)
    }
    if(dalval==='same'){
        setchartData({cases:countryData.cases,recovered:countryData.recovered,deaths:countryData.deaths})
        console.log('running');
        setState(chartData)
      }
      else{
        console.log('working correctly');
      }
    }
  
  // console.log(state)
  return (
    <div className="App">
     <div className={styles.container}> 
     <img src={image} style={{maxWidth:'370px',margin:'50px'}} />
      <Cards data={state}/>
      <h2>Daily Cases</h2>
      <div className={styles.countrydiv}>
      <div className={styles.countryForm}>
      <FormControl fullWidth>
        <NativeSelect defaultValue='' onChange={(e)=>specificCountry(e.target.value)}>
         <option value='global'>Global</option>
         {countryName.map((element,index)=>
        <option value={element.countryInfo.iso2}>{element.country}</option>
        )}
         </NativeSelect>
         </FormControl>
       </div>

       {countryData.cases?<div className={styles.countryForm}>
       <FormControl fullWidth>
       <NativeSelect defaultValue='' onChange={(e)=>CountryDaily(e.target.value)}>
         <option value='same'>Overall Data</option>
         <option value='update'>Today Data</option>
         </NativeSelect>
         </FormControl>
         </div>:null}
         </div>

      <Chart chartData={{chartData,update}}/>
      {/* <CountryPicker/> */}
    </div>
    </div>
  );
}

export default App;
