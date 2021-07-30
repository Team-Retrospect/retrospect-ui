import React from 'react';
import BarChart from './BarChart';
import generateBarChartData from './generateBarChartData';

import Typography from '@material-ui/core/Typography';

const ChapterBarChart = ({ traceId, spans, show, setShow, setClickedSpan }) => {
  const spanData = generateBarChartData(spans);
  const spanOptions = {
    type: 'bar',
    aspectRatio: 8,
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Span Duration (microseconds)',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Span Id',
        }
      },
    },
    onClick(e) {
      if (!e.chart.tooltip.title) {
        return;
      }
      const clickedSpanId = e.chart.tooltip.title[0];
      const clickedSpan = spans.filter(
        (span) => span.span_id === clickedSpanId
      )[0];
      setClickedSpan(clickedSpan);
      setShow(!show);
    },
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Trace: {traceId}
      </Typography>
      <BarChart data={spanData} options={spanOptions} />
    </div>
  );
};

export default ChapterBarChart;
