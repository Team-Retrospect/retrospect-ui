import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';

import ChapterBarChart from './ChapterBarChart';
import SpanDetailsCard from './SpanDetailsCard';
import {
	Chip,
  Grid,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Collapse,
	IconButton,
	Typography,
	Divider
} from '@material-ui/core';

import EventCard from './EventCard';
import EventDataGrid from './EventDataGrid';

import EventParser from '../lib/EventParser';

import 'moment-timezone';
import moment from 'moment';

const timezone = "America/Los_Angeles";

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
    // color: theme.palette.text.secondary,
    backgroundColor: "#ecedf2"
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
}));

const Chapter = ({ id }) => {
	const history = useHistory();
  const [events, setEvents] = useState([]);
	const [gridableEvents, setGridableEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [spans, setSpans] = useState([]);
	const [clickedSpan, setClickedSpan] = useState(null);
  const [traceId, setTraceId] = useState("");
  const params = useParams();
	const classes = useStyles();

  // added to test adding event card
  const [clickedEvent, setClickedEvent] = useState(null);
  const [showCard, setShowCard] = useState(false);

	useEffect(() => {
    if (!id) {
      id = params.id;
    }

		const gridProperties = (event) => {
      let date = moment(event.timestamp).tz(timezone).format("MM/DD/YYYY HH:MM A z")
			const { data } = event;
			const { source, ...dataData } = data.data;
      const details = EventParser(event.data);
      let eventSource = "";
      let eventSubtype = "";
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
        data: JSON.stringify(dataData)
      }
		}

		axios.get(`/api/events_by_chapter/${id}`).then((response) => {
			setEvents(response.data);
			setGridableEvents(response.data.map(gridProperties))
		});
    
    axios.get(`/api/spans_by_chapter/${id}`)
      .then((response) => {
        const spans = response.data;
        spans.sort((a, b) => a.time_sent - b.time_sent)
        let traceId;
        if (spans.length > 0) {
          traceId = spans[0].trace_id;
        } else {
          traceId = "No spans available"
        }
        setTraceId(traceId)
        setSpans(spans)
      })
	}, [id]);

  if (!events || !spans) {
    return null;
  }

  const onChapterClick = (e) => {
		history.push(`/chapter/${clickedEvent.chapter_id}`);
		e.preventDefault();
	}

	const handleExpandClick = () => {
		setExpanded(!expanded);
	}

	const onSessionClick = (e) => {
		history.push(`/session/${clickedSpan.session_id}`);
		e.preventDefault();
	}

	const columns = [
		{field: 'id', headerName: 'Time of Event', width: 200, hide: true},
    {field: 'date_created', headerName: 'Date of Event', width: 200},
		{field: 'event_type', headerName: 'Event Type', width: 170},
		{field: 'event_source', headerName: 'Event Source', width: 175},
    {field: 'event_subtype', headerName: 'Mouse Type', width: 170},
		{field: 'data', headerName: 'Event Data', width: 550},
	];

  return (
    <div className={classes.root}>
			<Typography variant="h2" gutterBottom>Chapter</Typography>
      <Grid container spacing={2} direction="column">
        <Grid item xs>
          <ChapterBarChart traceId={traceId} spans={spans} show={show} setShow={setShow} setClickedSpan={setClickedSpan} />
        </Grid>
        {show ? (
        	<Grid item xs={12} >
						<SpanDetailsCard span={clickedSpan} setShow={setShow} />
        	</Grid>
        ) : null}
      </Grid>
			<br></br>
			<Divider />
			<br></br>
			<Typography variant="h4" gutterBottom>Events</Typography>
      {/* <EventDataGrid dataRows={gridableEvents} dataColumns={columns} events={events}></EventDataGrid> */}
      <Grid container spacing={2}>
        <Grid item xs>
      			<DataGrid
							className={classes.datagrid}
							components={{
								Toolbar: GridToolbar,
							}}
      	 			rows={gridableEvents}
      	 			columns={columns}
      	 			pageSize={25}
  						filterModel={{
								items: [
									{ columnField: 'data', operatorValue: 'contains', value: '' },
								],
  						}}
              onRowClick={(e) => {
                setShowCard(!showCard);
                setClickedEvent(events.filter(event => event.data.timestamp === e.row.id)[0]);
              }}
      			/>
					</Grid>
          {/* <EventCard clickedEvent={clickedEvent} onHandleChapterClick={onChapterClick} onHandleSessionClick={onSessionClick}></EventCard> */}
          {showCard ? (
					<Grid item xs={4}>
							<Card className={classes.card}>
							<span style={{ float: 'right', color: 'gray', cursor: 'pointer'}} onClick={() => setShowCard(false)}>X</span>
								<CardHeader
									title="Event Details"	
									subheader={moment(clickedEvent.data.timestamp).tz(timezone).format("MM/DD/YYYY HH:MM A z")}
								/>
								<CardContent>
									<Typography className={classes.title} color="textSecondary" gutterBottom>
										<div className="user-id">
											<strong>user id: </strong>
											{clickedEvent.user_id}
										</div>
										<div className="chapter-id">
											<strong>chapter id: </strong>
											<a onClick={onChapterClick} href="/">{clickedEvent.chapter_id}</a>
										</div>
										<div className="session-id">
											<strong>session id: </strong>
											<a onClick={onSessionClick} href="/">{clickedEvent.session_id}</a>
										</div>
										<div className="timestamp">
											<strong>date created: </strong>
											{moment(clickedEvent.data.timestamp).tz(timezone).format("MM/DD/YYYY HH:MM A z")}
										</div>
									</Typography>
								</CardContent>
							</Card>
					</Grid>
				) : null}
			</Grid>
      
    </div>
  );
};

export default Chapter;
