const generateBarChartData = (spans) => {
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
      },
    ],
  }
}

export default generateBarChartData;