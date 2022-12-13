import {useEffect, useState} from 'react';
import Chart from "react-apexcharts";
import { fetchDailyData } from '../api';

const AreaChart = ({country}) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchCountryDailyData = async () => {
      const data = await fetchDailyData(country);
      setDailyData(data);
    };
    fetchCountryDailyData();
  },[country])
  return (
    <div id="chart" style={{
      marginTop: "100px",
      backgroundColor: "white",
      height: "350px"
    }} >
      <Chart options={{
        chart: {
          height: 300,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: dailyData.map((item) => item.Date),
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      }} 
      series={[
        {
          name: 'Vaka',
          data: dailyData.map(item => item.Confirmed)
        }, {
          name: 'İyileşen',
          data: dailyData.map(item => item.Recovered)
        },{
          name: 'Ölüm',
          data: dailyData.map(item => item.Deaths)
        }
      ]}
      height={350}
      />
    </div>
  )
}

export default AreaChart;

