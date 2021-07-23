import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EventParser from '../lib/EventParser';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Grid, Card, CardHeader, CardContent, CardActions, Typography } from '@material-ui/core';

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
		}
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
  title: {
    fontSize: 14,
  },
	data: {
		marginLeft: 30
	}, 
	prop: {
		fontWeight: 'bold'
	}
}))

const EventSearch = () => {
	const classes = useStyles();
	const history = useHistory();
  const [events, setEvents] = useState([]);
	const [gridableEvents, setGridableEvents] = useState([]);
	const [clickedEvent, setClickedEvent] = useState(null);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const onChapterClick = (e) => {
		history.push(`/chapter/${clickedEvent.chapter_id}`);
		e.preventDefault();
	}

	const onSessionClick = (e) => {
		history.push(`/session/${clickedEvent.session_id}`);
		e.preventDefault();
	}

  useEffect(() => {
		setLoading(true)

    axios
      .get(`/api/events`)
      .then((response) => {
				setEvents(response.data)
				const gridEvents = response.data.map(event => {
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
					let date = moment(details.timestamp).tz(timezone).format("MM/DD/YYYY HH:MM A z")
					return { 
						id: details.timestamp, 
						date_created: date,
						event_type: details.type, 
						event_source: eventSource, 
						event_subtype: eventSubtype,
						data: JSON.stringify(detailsData) 
					};
				})
				setGridableEvents(gridEvents)

				setLoading(false)
			})
  }, []);

	const columns = [
		{field: 'id', headerName: 'Timestamp', width: 150, hide: true},
		{field: 'date_created', headerName: 'Date of Event', width: 200},
		{field: 'event_type', headerName: 'Type', width: 170},
		{field: 'event_source', headerName: 'Source', width: 175},
		{field: 'event_subtype', headerName: 'Mouse Type', width: 170},
		{field: 'data', headerName: 'Data', width: 475},
	];

  return (
		<div className={classes.root}>
			<Typography variant="h4" gutterBottom>Events</Typography>
			<Grid container spacing={2}>
				<Grid item xs>
				
					<DataGrid
						className={classes.datagrid}
						item xs
						components={{
							Toolbar: GridToolbar,
						}}
						filterModel={{
							items: [
								{ columnField: 'data', operatorValue: 'contains', value: '' },
							],
						}}
						loading={loading}
						rows={gridableEvents}
						columns={columns}
						pageSize={25}
						onRowClick={(e) => {
							setShow(!show);
							setClickedEvent(events.filter(event => event.data.timestamp === e.row.id)[0]);
						}}
					/>
				</Grid>
				{show ? (
					<Grid item xs={4}>
							<Card className={classes.card}>
							<span style={{ float: 'right', color: 'gray', cursor: 'pointer'}} onClick={() => setShow(false)}>X</span>
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
										<div className="data">
											<strong>data: </strong>
											{Object.keys(clickedEvent.data.data).map(detail => {
												return (
													<div className={classes.data}>
														<span className={classes.prop}>{detail}</span>: {JSON.stringify(clickedEvent.data.data[detail])}
													</div>
												)
											})}
										</div>
									</Typography>
								</CardContent>
							</Card>
					</Grid>
				) : null}
			</Grid>
		</div>
	);
}

export default EventSearch
