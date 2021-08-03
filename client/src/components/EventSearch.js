import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import EventDataGrid from './grids/EventDataGrid';
import { Typography } from '@material-ui/core';
import eventGridProperties from '../lib/eventGridProperties';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 115,
    marginBottom: 50,
    '& .MuiDataGrid-root': {
      backgroundColor: '#ffffff',
      padding: 15,
    },
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: '#ecedf2',
  },
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
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
      const gridEvents = response.data.map(eventGridProperties);

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
