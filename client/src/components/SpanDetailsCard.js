import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

import 'moment-timezone';
import moment from 'moment';

const timezone = "America/Los_Angeles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

const SpanDetailsCard = ({ span, setShow }) => {
	const history = useHistory();
	const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	}

	const onSessionClick = (e) => {
		history.push(`/session/${span.session_id}`);
		e.preventDefault();
	}

  return (
		<Grid container xs={12}>
			<Grid item xs={12}>
				<Card className={classes.card} xs={12}>
						<span style={{ float: 'right', color: 'gray' }} onClick={() => setShow(false)}>X</span>
						<CardHeader
						title="Span Details"	
						subheader={span.span_id}
						/>
						<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
								<div className="span-id">
								<strong>span id: </strong>
								{span.span_id}
								</div>
								<div className="trace-id">
								<strong>trace id: </strong>
								{span.trace_id}
								</div>
								<div className="chapter-id">
								<strong>chapter id: </strong>
								{span.chapter_id}
								</div>
								<div className="session-id">
								<strong>session id: </strong>
								<a onClick={onSessionClick} href="/">{span.session_id}</a>
								</div>
								<div className="user-id">
								<strong>user id: </strong>
								{span.user_id}
								</div>
								<div className="status-code">
								<strong>status code: </strong>
								{span.status_code}
								</div>
								<div className="time-sent">
								<strong>date created: </strong>
								{/* {span.time_sent} */}
								{moment(span.time_sent / 1000).tz(timezone).format("MM/DD/YYYY HH:MM A z")}
								</div>
								<div className="time-duration">
								<strong>time duration: </strong>
								{span.time_duration}
								</div>
								<div className="trigger-route">
								<strong>trigger route: </strong>
								{span.trigger_route}
								</div>
								<div className="user-id">
								<strong>request data: </strong>
								{span.request_data}
								</div>
						</Typography>
					</CardContent>
					<Typography paragraph>Span Tags</Typography>
					<CardContent>
							<div className="tags" >
							<ul className="list-group">
									<li className="list-group-item">
									{span.data
									? Object.keys(span.data).map((key) => {
											return (
													<div>
													<strong>{key}: </strong>{span.data[key]}
													</div>
											);
											})
									: "Empty"}
									</li>
							</ul>
							</div>
					</CardContent>
				</Card>
			</Grid>
		
		{/* <Grid item xs={6}>
			<Card className={classes.card} xs={6}>
			<span style={{ float: 'right', color: 'gray' }} onClick={() => setShow(false)}>X</span>
			<CardHeader
			title="Span Details"	
			subheader={span.span_id}
			/>
			<Typography paragraph>Span Tags</Typography>
			<CardContent>
					<div className="tags" >
					<ul className="list-group">
							<li className="list-group-item">
							{span.data
							? Object.keys(span.data).map((key) => {
									return (
											<div>
											<strong>{key}: </strong>{span.data[key]}
											</div>
									);
									})
							: "Empty"}
							</li>
					</ul>
					</div>
			</CardContent>
			</Card> */}
		{/* </Grid> */}
		</Grid>
  )
}

export default SpanDetailsCard;