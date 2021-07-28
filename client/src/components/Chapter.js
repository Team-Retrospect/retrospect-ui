import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import ChapterBarChart from './charts/ChapterBarChart';
import SpanDetailsCard from './cards/SpanDetailsCard';
import EventDataGrid from './grids/EventDataGrid';
import SpanDataGrid from './grids/SpanDataGrid';
import { Grid, Typography } from '@material-ui/core';
// import EventParser from '../lib/EventParser';
// import timeParser from '../lib/timeParser';
import spanGridProperties from '../lib/spanGridProperties';
import eventGridProperties from '../lib/eventGridProperties';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 75,
    marginBottom: 50,
    '& .MuiDataGrid-root': {
      backgroundColor: '#ffffff',
      padding: 15,
    },
  },
  space: {
    marginTop: 50,
  },
}));

const Chapter = (props, { id }) => {
  const [events, setEvents] = useState([]);
  const [gridableEvents, setGridableEvents] = useState([]);
  const [gridableSpans, setGridableSpans] = useState([]);
  const [show, setShow] = useState(false);
  const [spans, setSpans] = useState([]);
  const [clickedSpan, setClickedSpan] = useState(null);
  const [traceId, setTraceId] = useState('');
  const params = useParams();
  const classes = useStyles();
  const [clickedEvent, setClickedEvent] = useState(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [spanLoading, setSpanLoading] = useState(false);

  useEffect(() => {
    setEventLoading(true);
    setSpanLoading(true);

    if (!id) {
      id = params.id;
    }

    // const eventGridProperties = (event) => {
    //   const { data } = event;
    //   const { source, ...dataData } = data.data;
    //   const details = EventParser(event.data);
    //   let eventSource = '';
    //   let eventSubtype = '';
    //   if (details.data) {
    //     eventSource = details.data.source;
    //     eventSubtype = details.data.type;
    //   }
    //   return {
    //     id: details.timestamp,
    //     date_created: timeParser(event.timestamp),
    //     event_type: details.type,
    //     event_source: eventSource,
    //     event_subtype: eventSubtype,
    //     data: JSON.stringify(dataData),
    //   };
    // };

    // const parseBase64ToJSON = (data) => {
    //   const decodedString = Buffer.from(data, 'base64').toString();
    //   if (decodedString === 'undefined' || !decodedString) {
    //     return null;
    //   }
    //   const parsedDecodedString = JSON.parse(decodedString);
    //   return parsedDecodedString;
    // };


    // const spanGridProperties = (span) => {
    //   const parsedRequestData = parseBase64ToJSON(span.request_data);
    //   return {
    //     id: span.span_id,
    //     date_created: timeParser(span.time_sent / 1000),
    //     service_name: JSON.stringify(span.data['service.name']),
    //     span_type: span.data['db.system'] ? span.data['db.system'] : 'http',
    //     // request_data: JSON.stringify(span.request_data),
    //     request_data: JSON.stringify(parsedRequestData),
    //     status_code: span.status_code ? span.status_code : null,
    //     trigger_route: span.trigger_route,
    //   };
    // };

    // const spanGridProperties = (span) => {
    //   return {
    //     id: span.span_id,
    //     date_created: timeParser(span.time_sent / 1000),
    //     service_name: JSON.stringify(span.data['service.name']),
    //     span_type: span.data['db.system'] ? span.data['db.system'] : 'http',
    //     request_data: JSON.stringify(span.request_data),
    //     status_code: span.status_code ? span.status_code : null,
    //     trigger_route: span.trigger_route,
    //   };
    // };

    axios.get(`/api/events_by_chapter/${id}`).then((response) => {
      setEvents(response.data);
      setGridableEvents(response.data.map(eventGridProperties));
      setEventLoading(false);
    });

    axios.get(`/api/spans_by_chapter/${id}`).then((response) => {
      const spans = response.data;
      spans.sort((a, b) => a.time_sent - b.time_sent);
      let traceId;
      if (spans.length > 0) {
        traceId = spans[0].trace_id;
      } else {
        traceId = 'No spans available';
      }
      setTraceId(traceId);
      setGridableSpans(response.data.map(spanGridProperties));
      setSpans(spans);
      setSpanLoading(false);
    });
  }, [id]);

  if (!events || !spans) {
    return null;
  }

  let selectedTR;
  if (props.location.state) {
    selectedTR = props.location.state.data;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom className={classes.space}>
        Chapter
      </Typography>
      <Grid container spacing={2} direction="column">
        <Grid item xs>
          <ChapterBarChart
            traceId={traceId}
            spans={spans}
            show={show}
            setShow={setShow}
            setClickedSpan={setClickedSpan}
          />
        </Grid>
        {show ? (
          <Grid item xs={12}>
            <SpanDetailsCard span={clickedSpan} setShow={setShow} />
          </Grid>
        ) : null}
      </Grid>
      <br></br>
      <Typography variant="h4" gutterBottom className={classes.space}>
        Spans
      </Typography>
      <SpanDataGrid
        gridableSpans={gridableSpans}
        loading={spanLoading}
        clickedSpan={clickedSpan}
        setClickedSpan={setClickedSpan}
        spans={spans}
        selectedTR={selectedTR}
      />
      <br></br>
      <Typography variant="h4" gutterBottom className={classes.space}>
        Events
      </Typography>
      <EventDataGrid
        gridableEvents={gridableEvents}
        loading={eventLoading}
        clickedEvent={clickedEvent}
        setClickedEvent={setClickedEvent}
        events={events}
      />
    </div>
  );
};

export default Chapter;
