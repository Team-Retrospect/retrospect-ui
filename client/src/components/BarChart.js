import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'

const BarChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
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
