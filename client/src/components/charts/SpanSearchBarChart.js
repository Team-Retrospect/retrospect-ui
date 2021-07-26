import React, { useRef } from 'react';
import generateBarChartData from './generateBarChartData';
import BarChart from './BarChart'

const SpanSearchBarChart = ({ spans }) => {
  console.log("passed spans in Span Search", spans)

	const spanData = generateBarChartData(spans)
	const spanOptions = {
	  indexAxis: 'y'
	};

  return (
    <BarChart data={spanData} options={spanOptions} />
  )
}

export default SpanSearchBarChart;
