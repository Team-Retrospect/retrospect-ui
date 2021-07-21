import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';

import EventParser from '../lib/EventParser';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Divider from '@material-ui/core/Divider';

import ChapterBarChart from './ChapterBarChart';
import SpanDetailsCard from './SpanDetailsCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
		height: 700,
  },
  title: {
    fontSize: 14,
  },
}));

const Session = () => {
	const history = useHistory();
  const [events, setEvents] = useState([]);
	const [gridableEvents, setGridableEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [spans, setSpans] = useState([]);
	const [gridableSpans, setGridableSpans] = useState([]);
	const [clickedSpan, setClickedSpan] = useState(null);
  const [traceId, setTraceId] = useState("");
	const [eventLoading, setEventLoading] = useState(false);
	const [spanLoading, setSpanLoading] = useState(false);
  const params = useParams();
	const classes = useStyles();

	useEffect(() => {
    setSpanLoading(true);
    setEventLoading(true);
    const sessionId = params.id;

		const eventGridProperties = (event) => {
		  const details = EventParser(event.data)
		  let eventSource = "";
		  let eventSubtype = "";
		  let detailsData = {};
		  if (details.data) {
		  	eventSource = details.data.source;
		  	eventSubtype = details.data.type;
		  	const { source, type, ...data } = details.data;
		  	detailsData = data
		  }
		  return { 
		  	id: details.timestamp, 
		  	event_type: details.type, 
		  	event_source: eventSource, 
		  	event_subtype: eventSubtype,
		  	data: JSON.stringify(detailsData) 
		  };
		}

		const spanGridProperties = (span) => {
			const selectedSpan = {
				id: span.span_id,
				service_name: span.data["service.name"],
				span_type: span.data["db.system"] ? span.data["db.system"] : "http",
				request_data: span.request_data, 
				status_code: span.status_code ? span.status_code : null,
				trigger_route: span.trigger_route
			}
			return selectedSpan;
		}

		axios.get(`/api/events`).then((response) => {
      const filteredEvents = response.data.filter(event => event.session_id === sessionId)
      setEvents(filteredEvents);
			setGridableEvents(filteredEvents.map(eventGridProperties))
      setEventLoading(false)
		});
    
    axios.get(`/api/spans`)
      .then((response) => {
        const filteredSpans = response.data.filter(span => span.session_id === sessionId)
        setSpans(filteredSpans);
        setGridableSpans(filteredSpans.map(spanGridProperties));
        setSpanLoading(false)
      })

		axios.get('https://api.xadi.io/events/snapshots').then((response) => {
			const snapshots = response.data.map(encoded => atob(encoded));
			console.log("all snapshots: ", snapshots);
			// const filteredSnapshots = response.data.filter(snapshot => snapshot.session_id === sessionId);
			// console.log("filtered snapshots: ", filteredSnapshots);
		})
	}, []);


	const eventColumns = [
		{field: 'id', headerName: 'Timestamp', width: 150},
		{field: 'event_type', headerName: 'Type', width: 170},
		{field: 'event_source', headerName: 'Source', width: 175},
		{field: 'event_subtype', headerName: 'Mouse Type', width: 170},
		{field: 'data', headerName: 'Data', width: 400},
	];

	const spanColumns = [
		{field: 'id', headerName: 'Span Id', width: 200},
		{field: 'service_name', headerName: 'Service Name', width: 200},
		{field: 'span_type', headerName: 'Span Type', width: 200},
		{field: 'request_data', headerName: 'Request Data', width: 200},
		{field: 'status_code', headerName: 'Status Code', width: 175},
		{field: 'trigger_route', headerName: 'Trigger Route', width: 300},
	];

  return (
    <>
			<Typography variant="h2" gutterBottom>Session</Typography>
      {/* <Grid container spacing={2}>
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
			<br></br> */}
			<Typography variant="h4" gutterBottom>Spans</Typography>
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
									{ columnField: 'request_data', operatorValue: 'contains', value: '' },
								],
  						}}
      			/>
					</Grid>
			</Grid>
			<Typography variant="h4" gutterBottom>Events</Typography>
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
    </>
  )
}

export default Session;