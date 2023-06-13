import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Cities = () => {
  const [options, _setOptions] = useState({
    annotations: {
      points: [
        {
          x: '',
          seriesIndex: 0,
          label: {
            borderColor: '#775DD0',
            offsetY: 0,
            style: {
              color: '#fff',
              background: '#775DD0',
            },
          },
        },
      ],
    },
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },

    grid: {
      row: {
        colors: ['#fff', '#f2f2f2'],
      },
    },
    xaxis: {
      labels: {
        rotate: -45,
      },
      categories: [
        'חולון',
        'אשדוד',
        'בני-ברק',
        'אילת',
        'באר-שבע',
        'ירושלים',
        'תל-אביב',
        'חיפה',
        'ראשון-לציון',
        'פתח תקוה',
        'אשקלון',
        'בית-שמש',
        'נתניה',
      ],
      tickPlacement: 'on',
    },

    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  });

  const [series, _setSeries] = useState([
    {
      name: 'Amount',
      data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35],
    },
  ]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default Cities;
