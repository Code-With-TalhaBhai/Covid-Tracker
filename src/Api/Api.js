import axios from "axios";

// const url = "https://covid19.mathdro.id/api";
const url1 = "https://disease.sh/v3/covid-19";


export const fetchData = async()=>{
    try{
        // Without Destructing
        // const {data} = await axios.get(url);
        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate,
        // }

        // With DeStructuring
        // const {data: {confirmed,recovered,deaths,lastUpdate}} = await axios.get(url)
        // const modifiedData = {confirmed,recovered,deaths,lastUpdate}
        // return modifiedData 
        // console.log(modifiedData)
        return await axios.get(`${url1}/all`);
    }catch(error){
        console.error(error)
    }
}


export const fetchDailyData = async()=>{
    // return await axios.get(`${url1}/historical/all?lastdays=all`)
    const apiData = await axios.get(`${url1}/historical/all?lastdays=all`)
    const response = apiData.data;
    const cases = Object.keys(response.cases);
    const deaths = Object.keys(response.deaths);
    const recovered = Object.keys(response.recovered);
    const date = {cases,deaths,recovered}
    // console.log(date);
    return {apiData,date};
}

export const fetchCountryName = async()=>{
    return await axios.get(`${url1}/countries/`);
}

export const fetchCountryData = async(countryIso)=>{
    return await axios.get(`${url1}/countries/${countryIso}`)
}