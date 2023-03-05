import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function BothAlgo() {
  const [chartData, _setChartData] = useState({
    series: [
      {
        name: 'אלגוריתם החציון',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: 'התקציב הקודם',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: 'אלגוריתם המוכלל',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['תשתיות', 'החזרי חוב', 'ביטחון וסדר ציבורי', 'שירותים חברתיים', 'ענפי משק',
         'פנסיה', 'משרדי מטה', 'הוצאות אחרות', 'חינוך'],
      },
      //   yaxis: {
      //     title: {
      //       text: '$ (thousands)',
      //     },
      //   },
      fill: {
        opacity: 1,
      },
        // tooltip: {
        //   y: {
        //     formatter: function (val) {
        //       return '$ ' + val + ' thousands';
        //     },
        //   },
        // },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
}
