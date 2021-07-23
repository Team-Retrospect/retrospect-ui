import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import EventParser from '../lib/EventParser';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Divider from '@material-ui/core/Divider';

import ChapterBarChart from './ChapterBarChart';
import SpanDetailsCard from './SpanDetailsCard';

import 'rrweb-player/dist/style.css';
import Player from './Player';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 75,
		marginBottom: 50, 
    '& .MuiDataGrid-root': {
			backgroundColor: "#ffffff", 
			padding: 15
		}, 
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    height: 700,
  },
  title: {
    fontSize: 14,
  },
  space: {
    marginTop: 50
  }, 
  player: {
    alignContent: "center"
  }
}));

const Session = () => {
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
  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    setSpanLoading(true);
    setEventLoading(true);
    setSnapshotEventLoading(true);
    const sessionId = params.id;

    const eventGridProperties = (event) => {
      const details = EventParser(event.data);
      let eventSource = '';
      let eventSubtype = '';
      let detailsData = {};
      if (details.data) {
        eventSource = details.data.source;
        eventSubtype = details.data.type;
        const { source, type, ...data } = details.data;
        detailsData = data;
      }
      return {
        id: details.timestamp,
        event_type: details.type,
        event_source: eventSource,
        event_subtype: eventSubtype,
        data: JSON.stringify(detailsData),
      };
    };

    const snapshotEventGridProperties = (event) => {
      return {
        id: event.data.timestamp,
        event_type: 'Full DOM Snapshot',
        data: JSON.stringify(event.data),
      };
    };

    const spanGridProperties = (span) => {
      const selectedSpan = {
        id: span.span_id,
        service_name: span.data['service.name'],
        span_type: span.data['db.system'] ? span.data['db.system'] : 'http',
        request_data: span.request_data,
        status_code: span.status_code ? span.status_code : null,
        trigger_route: span.trigger_route,
      };
      return selectedSpan;
    };

    axios.get(`/api/events_by_session/${sessionId}`)
      .then((response) => response.data)
      .then(filteredEvents => {

        axios.get(`/api/snapshots_by_session/${sessionId}`)
          .then(response => response.data)
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

    axios.get(`/api/spans_by_session/${sessionId}`)
      .then(response => response.data)
      .then(filteredSpans => {
        setSpans(filteredSpans);
        setGridableSpans(filteredSpans.map(spanGridProperties));
        setSpanLoading(false);
      })
  }, [params]);

  const eventColumns = [
    { field: 'id', headerName: 'Timestamp', width: 150 },
    { field: 'event_type', headerName: 'Type', width: 170 },
    { field: 'event_source', headerName: 'Source', width: 175 },
    { field: 'event_subtype', headerName: 'Mouse Type', width: 170 },
    { field: 'data', headerName: 'Data', width: 400 },
  ];

  const snapshotEventColumns = [
    { field: 'id', headerName: 'Timestamp', width: 150 },
    { field: 'event_type', headerName: 'Type', width: 170 },
    { field: 'data', headerName: 'Data', width: 800 },
  ];

  const spanColumns = [
    { field: 'id', headerName: 'Span Id', width: 200 },
    { field: 'service_name', headerName: 'Service Name', width: 200 },
    { field: 'span_type', headerName: 'Span Type', width: 200 },
    { field: 'request_data', headerName: 'Request Data', width: 200 },
    { field: 'status_code', headerName: 'Status Code', width: 175 },
    { field: 'trigger_route', headerName: 'Trigger Route', width: 300 },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>
        Session
      </Typography>
      <Typography variant="h4" gutterBottom>
        Replay
      </Typography>
      <Player events={replayableEvents} className={classes.player}/>
      <Grid container spacing={2}>
        <Grid item xs>
          <ChapterBarChart traceId={traceId} spans={spans} show={show} setShow={setShow} setClickedSpan={setClickedSpan} />
        </Grid>
        {show ? (
        	<Grid item xs={4} >
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
      <Grid container spacing={2}>
        <Grid item xs>
          <DataGrid
            className={classes.datagrid}
            components={{
              Toolbar: GridToolbar,
            }}
            rows={gridableSpans}
            loading={spanLoading}
            columns={spanColumns}
            pageSize={25}
            filterModel={{
              items: [
                {
                  columnField: 'request_data',
                  operatorValue: 'contains',
                  value: '',
                },
              ],
            }}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom className={classes.space}>
        Events
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <DataGrid
            className={classes.datagrid}
            components={{
              Toolbar: GridToolbar,
            }}
            rows={gridableEvents}
            loading={eventLoading}
            columns={eventColumns}
            pageSize={25}
            filterModel={{
              items: [
                { columnField: 'data', operatorValue: 'contains', value: '' },
              ],
            }}
          />
        </Grid>
      </Grid>
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
