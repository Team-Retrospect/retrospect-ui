import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Divider from '@material-ui/core/Divider';
import ChapterBarChart from './charts/ChapterBarChart'
import SpanDetailsCard from './cards/SpanDetailsCard';
import EventDataGrid from './grids/EventDataGrid';
import 'rrweb-player/dist/style.css';
import Player from './Player';
import SpanDataGrid from './grids/SpanDataGrid';
// import timeParser from '../lib/timeParser';
// import EventParser from '../lib/EventParser';
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
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: 700,
  },
  space: {
    marginTop: 50,
  },
  player: {
    alignContent: 'center',
  },
}));

const Session = (props) => {
  const [events, setEvents] = useState([]);
  const [snapshotEvents, setSnapshotEvents] = useState([]);
  const [replayableEvents, setReplayableEvents] = useState([]);
  const [gridableSnapshotEvents, setGridableSnapshotEvents] = useState([]);
  const [gridableEvents, setGridableEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [spans, setSpans] = useState([]);
  const [gridableSpans, setGridableSpans] = useState([]);
  const [clickedSpan, setClickedSpan] = useState(null);
  const [traceId, setTraceId] = useState('');
  const [eventLoading, setEventLoading] = useState(false);
  const [spanLoading, setSpanLoading] = useState(false);
  const [snapshotEventLoading, setSnapshotEventLoading] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);
  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    setSpanLoading(true);
    setEventLoading(true);
    setSnapshotEventLoading(true);
    const sessionId = params.id;

    // const eventGridProperties = (event) => {
    //   const details = EventParser(event.data);
    //   let eventSource = '';
    //   let eventSubtype = '';
    //   let detailsData = {};
    //   if (details.data) {
    //     eventSource = details.data.source;
    //     eventSubtype = details.data.type;
    //     const { source, type, ...data } = details.data;
    //     detailsData = data;
    //   }
    //   return {
    //     id: details.timestamp,
    //     date_created: timeParser(details.timestamp),
    //     event_type: details.type,
    //     event_source: eventSource,
    //     event_subtype: eventSubtype,
    //     data: JSON.stringify(detailsData),
    //   };
    // };

    const snapshotEventGridProperties = (event) => {
      return {
        id: event.data.timestamp,
        event_type: 'Full DOM Snapshot',
        data: JSON.stringify(event.data),
      };
    };

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

    axios
      .get(`/api/events_by_session/${sessionId}`)
      .then((response) => response.data)
      .then((filteredEvents) => {
        axios
          .get(`/api/snapshots_by_session/${sessionId}`)
          .then((response) => response.data)
          .then((filteredSnapshots) => {
            const replayableFilteredEvents = filteredEvents.map(
              (event) => event.data
            );
            const replayableFilteredSnapshots = filteredSnapshots.map(
              (event) => event.data
            );

            const completeFilteredEvents = [
              ...replayableFilteredEvents,
              ...replayableFilteredSnapshots,
            ];

            setReplayableEvents(completeFilteredEvents);

            setSnapshotEvents(filteredSnapshots);
            setGridableSnapshotEvents(
              filteredSnapshots
                .map(snapshotEventGridProperties)
                .sort((a, b) => {
                  return a.timestamp - b.timestamp;
                })
            );
            setSnapshotEventLoading(false);
          });
        setEvents(filteredEvents);
        setGridableEvents(filteredEvents.map(eventGridProperties));
        setEventLoading(false);
      });

    axios
      .get(`/api/spans_by_session/${sessionId}`)
      .then((response) => response.data)
      .then((filteredSpans) => {
        setSpans(filteredSpans);
        setGridableSpans(filteredSpans.map(spanGridProperties));
        setSpanLoading(false);
      });
  }, [params]);

  const snapshotEventColumns = [
    { field: 'id', headerName: 'Timestamp', width: 150 },
    { field: 'event_type', headerName: 'Type', width: 170 },
    { field: 'data', headerName: 'Data', width: 800 },
  ];

  let selectedTR;
  if (props.location.state) {
    selectedTR = props.location.state.data;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>
        Session
      </Typography>
      <Typography variant="h4" gutterBottom>
        Replay
      </Typography>
      <Player events={replayableEvents} className={classes.player} />
      <Grid container spacing={2}>
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
          <Grid item xs={4}>
            <SpanDetailsCard span={clickedSpan} setShow={setShow} />
          </Grid>
        ) : null}
      </Grid>
      <br></br>
      <Divider />
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
      <Typography variant="h4" gutterBottom className={classes.space}>
        Events
      </Typography>
      <EventDataGrid
        events={events}
        gridableEvents={gridableEvents}
        loading={eventLoading}
        clickedEvent={clickedEvent}
        setClickedEvent={setClickedEvent}
      />
      <Typography variant="h4" gutterBottom className={classes.space}>
        Snapshot Events
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <DataGrid
            className={classes.datagrid}
            components={{
              Toolbar: GridToolbar,
            }}
            rows={gridableSnapshotEvents}
            loading={snapshotEventLoading}
            columns={snapshotEventColumns}
            pageSize={25}
            filterModel={{
              items: [
                { columnField: 'data', operatorValue: 'contains', value: '' },
              ],
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Session;
