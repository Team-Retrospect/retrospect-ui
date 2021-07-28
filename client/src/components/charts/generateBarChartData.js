const generateBarChartData = (spans) => {
  // console.log("generate bar chart data spans: ", spans.filter(span => span.id === ''))
  let start_time = Number.MAX_SAFE_INTEGER;

  const timeSentsAndDurations = spans.map(span => {
    let timeString = span.time_duration;
    let timeDurationArray = timeString.split(/[\D]+/).slice(0, -1).reverse();
    let time_duration_us = timeDurationArray.reduce((acc, val, idx) => {
      acc += Number(val) * Math.pow(1000, idx)
      return acc;
    }, 0)

    const time_sent_us = Number(span.time_sent);

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

  relativeTimes.sort((a, b) => a.times[0] - b.times[0]);
  const labels = [];
  const data = [];
  relativeTimes.forEach((datum, idx) => {
    // console.log("datum inside of forEach: ", datum, idx)
    // console.log("datum time inside of forEach: ", datum.times, idx)
    // const span_id = datum.span_id;
    // const times = datum.times;
    labels.push(datum.span_id);
    data.push(datum.times);
    // console.log("data after push: ", data, idx)
  })

  // data.sort((a, b) => a[0] - b[0]);

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
        ],
        skipNull: true,
      },
    ],
  }
}

export default generateBarChartData;