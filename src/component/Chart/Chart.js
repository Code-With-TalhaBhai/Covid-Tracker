import React,{useState,useEffect} from 'react';
import styles from './Chart.module.css';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import { fetchDailyData } from '../../Api/Api';



function Chart({chartData:{chartData,update}}) {
  console.log(chartData);
  console.log(update)

  const [chartdata, setChartdata] = useState({});
  const [date, setDate] = useState({});
  useEffect(() => {
    const chData = async()=>{
      const response = await fetchDailyData();
      setChartdata(response.apiData.data);
      setDate(response.date)
    }
    chData()
    console.log(chartdata);
    console.log(date);
    // console.log(fetchData)
  // })
  }, [])
  
  const LineChart = (
    chartdata.cases?(
      <Line 
   data = {{
    labels: date.cases,
    datasets:[
      {
        label: 'Infected',
        data: chartdata.cases,
        fill: true,
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        borderColor: 'rgba(0, 0, 255, 0.5)'
      },
      {
        label: 'Recovered',
        data: chartdata.recovered,
        fill: true,
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'rgba(0, 255, 0, 0.5)'
      },
      {
        label: 'Deaths',
        data: chartdata.deaths,
        fill: true,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(255, 0, 0, 0.5)'
      }
    ]
  }}/>):null)

  //
  const barChart = (
    chartData?(
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

  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };


return(
    <div className={styles.chartGraph}>
      {/* {LineChart} */}
      {/* {barChart} */}
      {update?
        barChart:LineChart
      }
    </div>
  )
}

export default Chart