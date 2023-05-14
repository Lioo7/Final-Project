import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

export default function Gender(props) {
  const [chartData, setChartData] = useState({
    // series: [5 ,10 ],
    series: props.gender,
    options: {
      chart: {
        width: props.width,
        type: 'pie',
      },
      labels: ['זכר', 'נקבה'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    setChartData(prevChartData => ({
      ...prevChartData,
      series: props.gender, 
    }));
  }, [props.gender]);

  return (
    <>
      <Chart options={chartData.options} series={chartData.series ? chartData.series : [1, 1] } type="pie" width={props.width} />
    </>
  );
}
