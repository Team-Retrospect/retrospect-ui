// NOTE: not working yet

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
		backgroundColor: "#ecedf2"
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
  title: {
    fontSize: 14,
  },
}))

const EventCard = ({clickedEvent, onHandleChapterClick, onHandleSessionClick}) => {
  const classes = useStyles();
	const history = useHistory();
  // const [events, setEvents] = useState([]);
	// const [gridableEvents, setGridableEvents] = useState([]);
	// const [clickedEvent, setClickedEvent] = useState(null);
	const [show, setShow] = useState(false);
	// const [loading, setLoading] = useState(false);

	// const onChapterClick = (e) => {
	// 	history.push(`/chapter/${clickedEvent.chapter_id}`);
	// 	e.preventDefault();
	// }

	// const onSessionClick = (e) => {
	// 	history.push(`/session/${clickedEvent.session_id}`);
	// 	e.preventDefault();
	// }

	const handleChapterClick = (e) => {
    onHandleChapterClick();
	}

	const handleSessionClick = (e) => {
    onHandleSessionClick();
	}

  return (
    <>
				{show ? (
					<Grid item xs={4}>
							<Card className={classes.card}>
							<span style={{ float: 'right', color: 'gray', cursor: 'pointer'}} onClick={() => setShow(false)}>X</span>
								<CardHeader
									title="Event Details"	
									subheader={moment(clickedEvent.data.timestamp).tz(timezone).format("MM/DD/YYYY hh:mm A z")}
								/>
								<CardContent>
									<Typography className={classes.title} color="textSecondary" gutterBottom>
										<div className="user-id">
											<strong>user id: </strong>
											{clickedEvent.user_id}
										</div>
										<div className="chapter-id">
											<strong>chapter id: </strong>
											<a onClick={handleChapterClick} href="/">{clickedEvent.chapter_id}</a>
										</div>
										<div className="session-id">
											<strong>session id: </strong>
											<a onClick={handleSessionClick} href="/">{clickedEvent.session_id}</a>
										</div>
										<div className="timestamp">
											<strong>date created: </strong>
											{moment(clickedEvent.data.timestamp).tz(timezone).format("MM/DD/YYYY hh:mm A z")}
										</div>
									</Typography>
								</CardContent>
							</Card>
					</Grid>
				) : null}
    </>
  );
}

export default EventCard;