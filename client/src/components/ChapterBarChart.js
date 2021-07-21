import React, { useState } from "react";
// import Span from './Span';
import BarChart from './BarChart';
import generateBarChartData from "./generateBarChartData";

import Typography from '@material-ui/core/Typography';

const ChapterBarChart = ({ traceId, spans, show, setShow, setClickedSpan }) => {
	const [visibleTrace, setVisibleTrace] = useState(false);

	const spanData = generateBarChartData(spans);
	const spanOptions = {
		aspectRatio: 8,
	  indexAxis: 'y',
		onClick(e) {
			const clickedSpanId = e.chart.tooltip.title[0];
			const clickedSpan = spans.filter(span => span.span_id === clickedSpanId)[0]
			console.log("clickedSpan inside of Trace: ", clickedSpan)
			setClickedSpan(clickedSpan);
			setShow(!show)
		}
	};

	return (
		<div>
			<Typography variant="h4" gutterBottom>Trace: {traceId}</Typography>
			<BarChart data={spanData} options={spanOptions} />
			{/* <div onClick={() => setVisibleTrace(!visibleTrace)}> 
				(click to expand/close span list)
			</div>
			{visibleTrace ? 
				<div>
					{ spans.map((span) => {
						return <Span key={span.span_id} span={span} />
					}) }
				</div>
			: null } */}
		</div>
	);
};

export default ChapterBarChart;
