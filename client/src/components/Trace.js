import React, { useState } from "react";
import Span from './Span';
import { Bar } from 'react-chartjs-2';

// This is where the waterfall code should go

const Trace = ({ traceId, spans }) => {
	const [visibleTrace, setVisibleTrace] = useState(false);

	let max_time = Number.MIN_SAFE_INTEGER;
	let min_time = Number.MAX_SAFE_INTEGER;

	const timeSentsAndDurations = spans.map(span => {
		const time_sent_us = span.time_sent / 1000;
		const time_duration_ms = span.time_duration.split("ms")[0];
		const time_duration_us = span.time_duration.split("ms")[1].split("us")[0];

		const end_time_us = time_sent_us + time_duration_ms * 1000 + Number(time_duration_us);

		if (time_sent_us < min_time) {
			min_time = time_sent_us;
		}

		if (end_time_us > max_time) {
			max_time = end_time_us;
		}

		return {
			span_id: span.span_id,
			time_sent_us: span.time_sent / 1000,
			end_time_us,
			time_duration: span.time_duration,
		}
	})

	const relativeTimes = timeSentsAndDurations.map(obj => {
		const relative_start_time_us = obj.time_sent_us - min_time;
		const relative_end_time_us = obj.end_time_us - min_time;
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
	};

	return (
		<div>
			<div>
				<h3>Trace: {traceId}</h3>
				<div onClick={() => setVisibleTrace(!visibleTrace)}>
					(click to expand/close trace)
				</div>
				<Bar data={spanData} options={spanOptions} />
				{visibleTrace ? 
					spans.map((span) => {
						return <Span key={span.span_id} span={span} />
					})
				: ""}
			</div>
		</div>
	);
};

export default Trace;
