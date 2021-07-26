import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'
import generateBarChartData from './generateBarChartData';
import BarChart from './BarChart'

let myChart;

const SpanSearchBarChart = ({ spans }) => {
  console.log("passed spans in Span Search", spans)

  const chartRef = useRef(null);

	const spanData = generateBarChartData(spans)
	const spanOptions = {
	  indexAxis: 'y'
	};

  useEffect(() => {
    if (typeof myChart !== "undefined") myChart.destroy();

    myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: spanData,
      options: spanOptions,
    })
  }, [spans])

  return (
    // <canvas ref={chartRef} />
    <BarChart data={spanData} options={spanOptions} />
  )
}

export default SpanSearchBarChart;
