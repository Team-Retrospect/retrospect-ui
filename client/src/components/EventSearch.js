import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EventParser from '../lib/EventParser';
import axios from 'axios';
import EventDataGrid from './EventDataGrid';
import { Typography } from '@material-ui/core';

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
  details: {
    fontSize: 14,
    wordWrap: 'break-word',
  },
  data: {
    marginLeft: 30,
  },
  prop: {
    fontWeight: 'bold',
  },
}));

const EventSearch = () => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [gridableEvents, setGridableEvents] = useState([]);
  const [clickedEvent, setClickedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get(`/api/events`).then((response) => {
      setEvents(response.data);
      const gridEvents = response.data.map((event) => {
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
        let date = moment(details.timestamp)
          .tz(timezone)
          .format('MM/DD/YYYY hh:mm A z');
        return {
          id: details.timestamp,
          date_created: date,
          event_type: details.type,
          event_source: eventSource,
          event_subtype: eventSubtype,
          data: JSON.stringify(detailsData),
        };
      });
      setGridableEvents(gridEvents);
      setLoading(false);
    });
  }, []);

  return (
    <div className={classes.root}>
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

export default EventSearch;
