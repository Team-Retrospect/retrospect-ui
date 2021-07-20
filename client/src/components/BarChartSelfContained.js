import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'

let myChart;

const BarChartSelfContained = ({ spans }) => {
  const chartRef = useRef(null);

	let start_time = Number.MAX_SAFE_INTEGER;

	const timeSentsAndDurations = spans.map(span => {
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

  console.log("labels: ", labels)
  console.log("data: ", data.sort((a, b) => a[0] - b[0]))

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
					// 'rgba(75, 192, 192, 0.2)',
					// 'rgba(153, 102, 255, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					// 'rgba(75, 192, 192, 1)',
					// 'rgba(153, 102, 255, 1)',
				],
			},
		],
	};

	const spanOptions = {
	  indexAxis: 'y',
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
    <canvas ref={chartRef} />
  )
}

export default BarChartSelfContained;
