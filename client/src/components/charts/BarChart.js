import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'

let myChart;

const BarChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (typeof myChart !== "undefined") myChart.destroy();
    myChart = new Chart(chartRef.current, {
      type: 'bar',
      data,
      options,
    })
  }, [data, options])

  return (
    <canvas ref={chartRef} />
  )
}

export default BarChart;
