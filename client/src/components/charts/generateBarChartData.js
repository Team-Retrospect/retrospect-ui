const generateBarChartData = (spans) => {
  let start_time = Number.MAX_SAFE_INTEGER;

  const timeSentsAndDurations = spans.map(span => {
    const time_sent_us = Number(span.time_sent);
    if (!span.time_duration.includes("ms")) {
      span.time_duration = "0ms" + span.time_duration;
    }
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
      time_duration: time_duration_us
    }
  })

  const relativeTimes = timeSentsAndDurations.map(obj => {
    const relative_start_time_us = (obj.time_sent_us - start_time);
    const relative_end_time_us = obj.end_time_us - start_time;
    return {
      span_id: obj.span_id,
      times: [relative_start_time_us, relative_end_time_us]
    }
  })

  const labels = [];
  const data = [];
  relativeTimes.forEach(datum => {
    labels.push(datum.span_id);
    data.push(datum.times);
  })
  data.sort((a, b) => a[0] - b[0]);

  return {
    labels,
    datasets: [
      {
        axis: 'y',
        data: data,
        fill: false,
        label: 'span duration (microseconds)',
        type: 'bar',
        backgroundColor: [
          'rgba(54, 127, 143, 1)',
          'rgba(73, 173, 175, 1)',
          'rgba(104, 194, 191, 1)',
          'rgba(242, 188, 70, 1)',
          'rgba(228, 135, 76, 1)',
          'rgba(223, 86, 77, 1)',
          'rgba(243, 224, 181, 1)',
          'rgba(39, 29, 63, 1)',
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
        // borderColor: function (context, options) {
        //   console.log("content in bordercolor: ", context);
        //   const spanId = labels[context.dataIndex];
        //   console.log("spanID in borderColor: ", spanId)
        // }
      },
    ],
  }
}

export default generateBarChartData;