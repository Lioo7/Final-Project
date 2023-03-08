import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export default function Gender(props) {
  const [chartData, _setChartData] = useState({
    series: [5, 10],
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

  return (
    <>
      <Chart options={chartData.options} series={chartData.series} type="pie" width={props.width} />
    </>
  );
}