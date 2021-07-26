import React from "react";
import BarChart from './BarChart';
import generateBarChartData from "./generateBarChartData";

import Typography from '@material-ui/core/Typography';

const ChapterBarChart = ({ traceId, spans, show, setShow, setClickedSpan }) => {

	console.log("passed spans in Chapter CHart >>", spans)


	const spanData = generateBarChartData(spans);
	const spanOptions = {
		aspectRatio: 8,
	  indexAxis: 'y',
		onClick(e) {
			if (!e.chart.tooltip.title) {
				return
			}
			const clickedSpanId = e.chart.tooltip.title[0];
			const clickedSpan = spans.filter(span => span.span_id === clickedSpanId)[0]
			setClickedSpan(clickedSpan);
			setShow(!show)
		}
	};

	return (
		<div>
			<Typography variant="h4" gutterBottom>Trace: {traceId}</Typography>
			<BarChart data={spanData} options={spanOptions} />
		</div>
	);
};

export default ChapterBarChart;
