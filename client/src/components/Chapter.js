import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import ChapterBarChart from './ChapterBarChart';
import SpanDetailsCard from './SpanDetailsCard';
import EventDataGrid from './EventDataGrid';
import { Grid, Typography, Divider } from '@material-ui/core';

import EventParser from '../lib/EventParser';

import 'moment-timezone';
import moment from 'moment';

const timezone = 'America/Los_Angeles';

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
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    // color: theme.palette.text.secondary,
    backgroundColor: '#ecedf2',
  },
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    height: 700,
  },
  details: {
    fontSize: 14,
    wordWrap: 'break-word',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  data: {
    marginLeft: 30,
  },
  prop: {
    fontWeight: 'bold',
  },
}));

const Chapter = ({ id }) => {
  const [events, setEvents] = useState([]);
  const [gridableEvents, setGridableEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [spans, setSpans] = useState([]);
  const [clickedSpan, setClickedSpan] = useState(null);
  const [traceId, setTraceId] = useState('');
  const params = useParams();
  const classes = useStyles();

  // added to test adding event card
  const [clickedEvent, setClickedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!id) {
      id = params.id;
    }

    const gridProperties = (event) => {
      let date = moment(event.timestamp)
        .tz(timezone)
        .format('MM/DD/YYYY HH:MM A z');
      const { data } = event;
      const { source, ...dataData } = data.data;
      const details = EventParser(event.data);
      let eventSource = '';
      let eventSubtype = '';
      if (details.data) {
        eventSource = details.data.source;
        eventSubtype = details.data.type;
      }
      return {
        id: details.timestamp,
        date_created: date,
        event_type: details.type,
        event_source: eventSource,
        event_subtype: eventSubtype,
        data: JSON.stringify(dataData),
      };
    };

    axios.get(`/api/events_by_chapter/${id}`).then((response) => {
      setEvents(response.data);
      setGridableEvents(response.data.map(gridProperties));
      setLoading(false);
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
      setSpans(spans);
    });
  }, [id]);

  if (!events || !spans) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>
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
      <Divider />
      <br></br>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      <EventDataGrid
        gridableEvents={gridableEvents}
        loading={loading}
        clickedEvent={clickedEvent}
        setClickedEvent={setClickedEvent}
        events={events}
      />
    </div>
  );
};

export default Chapter;
