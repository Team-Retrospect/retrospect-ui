import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Divider from '@material-ui/core/Divider';

import ChapterBarChart from './ChapterBarChart';
import SpanDetailsCard from './SpanDetailsCard';

import EventParser from '../lib/EventParser';

import 'moment-timezone';
import moment from 'moment';

const timezone = "America/Los_Angeles";

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
      if (details.data) {
        eventSource = details.data.source;
      }
      return {
        id: details.timestamp, 
        date_created: date, 
        event_type: details.type,
        event_source: eventSource,
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
		{field: 'event_type', headerName: 'Event Type', width: 150},
		{field: 'event_source', headerName: 'Event Source', width: 175},
		{field: 'data', headerName: 'Event Data', width: 400},
	];

  return (
    <div>
			<Typography variant="h2" gutterBottom>Chapter</Typography>
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
			<Typography variant="h4" gutterBottom>Events</Typography>
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
      			/>
					</Grid>
			</Grid>
    </div>
  );
};

export default Chapter;
