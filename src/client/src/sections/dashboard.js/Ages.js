import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export default function Ages(props) {
  const originalColors = ['#4CAF50', '#FFC107', '#2196F3', '#E91E63', '#9C27B0'];
  const newColors = [...originalColors, '#00BCD4'];
  const [chartData, _setChartData] = useState({
    series: [5 ,13 ,15 ,18 , 24, 25],
    options: {
      chart: {
        width: props.width,
        type: 'pie',
      },
      labels: ['18-25', '26-35', '36-45', '46-55', '56-65', '66 +'],
      colors: newColors,
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

  return (
    <>
      <Chart options={chartData.options} series={chartData.series} type="pie" width={props.width} />
    </>
  );
}
