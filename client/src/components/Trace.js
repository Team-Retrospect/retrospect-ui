import React from "react";
import Span from './Span';
import BarChart from './BarChart';

// This is where the waterfall code should go

const Trace = ({ traceId, spans, show, setShow, setClickedSpan }) => {
	// updating the state by clicking to show/hide messes with the canvas
	// const [visibleTrace, setVisibleTrace] = useState(false);

	let start_time = Number.MAX_SAFE_INTEGER;

	const timeSentsAndDurations = spans.map(span => {
		// Is this actually us? The math works, but I feel like it should be
		// time_sent_us = Number(span.time_sent) / 1000
		const time_sent_us = Number(span.time_sent);
		const time_duration_ms_part = span.time_duration.split("ms")[0];
		const time_duration_us_part = span.time_duration.split("ms")[1].split("us")[0];
		const time_duration_us = (Number(time_duration_ms_part) * 1000) + Number(time_duration_us_part);

		const end_time_us = time_sent_us + time_duration_us;

		if (time_sent_us < start_time) {
			start_time = time_sent_us;
		}

		return {
			span_id: span.span_id,
			time_sent_us,
			end_time_us,
			time_duration: time_duration_us,
		}
	})

	const relativeTimes = timeSentsAndDurations.map(obj => {
		const relative_start_time_us = (obj.time_sent_us - start_time);
		const relative_end_time_us = obj.end_time_us - start_time;
		return {
			span_id: obj.span_id,
			times: [relative_start_time_us, relative_end_time_us],
		}
	})

	const labels = [];
	const data = [];
	relativeTimes.forEach(datum => {
		labels.push(datum.span_id)
		data.push(datum.times)
	})

	const spanData = {
		labels,
		datasets: [
			{
				type: 'bar',
				axis: 'y',
				label: 'span duration (microseconds)',
				data: data,
				fill: false,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
				],
			},
		],
	};

	const spanOptions = {
	  indexAxis: 'y',
		onClick(e) {
			const clickedSpanId = e.chart.tooltip.title[0];
			const clickedSpan = spans.filter(span => span.span_id === clickedSpanId)
			setClickedSpan(clickedSpan);
			setShow(!show)

			// // removing the obvious properties from the span object
			// const { chapter_id, session_id, span_id, trace_id, user_id, ...desiredData } = clickedSpan[0];

			// // changing it from an object to a legible, newline separated string
			// const formattedData = [];
			// for (let [key, value] of Object.entries(desiredData)) {

			// 	// the data property inside the desiredData object has the same problems as the outer data object
			// 	// need to reformat it in the same manner
			// 	// this probably lends itself to an separate object parsing function
			// 	if (key === "data") {
			// 		const { frontendChapter, frontendSession, frontendUser, ...desiredDataData } = value;
			// 		const formattedDataValue = [];
			// 		for (let [dataKey, dataValue] of Object.entries(desiredDataData)) {
			// 			formattedDataValue.push([`${dataKey}: ${dataValue}`]);
			// 		}
			// 		value = formattedDataValue.join(' \n ');
			// 	}


			// 	formattedData.push([`${key}: ${value}`]);
			// }
			// console.log("formattedData: ", formattedData)
			// window.alert((formattedData.join(' \n ')))
		}
	};

	return (
		<div>
			<div>
				<h3>Trace: {traceId}</h3>
				{/* <div onClick={() => setVisibleTrace(!visibleTrace)}> */}
					{/* (click to expand/close trace) */}
				{/* </div> */}
				<BarChart data={spanData} options={spanOptions} />
				{/* {visibleTrace ?  */}
				{spans.map((span) => {
					return <Span key={span.span_id} span={span} />
				})}
				{/* : ""} */}
			</div>
		</div>
	);
};

export default Trace;
