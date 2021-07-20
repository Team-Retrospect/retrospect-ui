import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import BarChartSelfContained from './BarChartSelfContained';

import axios from 'axios';
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
}));


const SpanSearch = () => {
	const classes = useStyles();
	const history = useHistory();

	const [spans, setSpans] = useState([]);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
	const [clickedSpan, setClickedSpan] = useState(null);
	const [loading, setLoading] = useState(false);
	const [gridableSpans, setGridableSpans] = useState([]);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	}

	const onChapterClick = (e) => {
		history.push(`/chapter/${clickedSpan.chapter_id}`);
		e.preventDefault();
	}

	const onSessionClick = (e) => {
		history.push(`/session/${clickedSpan.session_id}`);
		e.preventDefault();
	}

	useEffect(() => {
		setLoading(true)

		const gridProperties = (span) => {
			const { span_id, request_data, status_code, trigger_route } = span;
			return { id: span_id, request_data, status_code, trigger_route };
		}

		axios
			.get(`/api/spans`)
      .then((response) => {
				setSpans(response.data)

				const gridSpans = response.data.map(gridProperties)
				setGridableSpans(gridSpans)

				setLoading(false)
				})
	}, []);

	const columns = [
		{field: 'id', headerName: 'Span Id', width: 200},
		{field: 'request_data', headerName: 'Request Data', width: 200},
		{field: 'status_code', headerName: 'Status Code', width: 175},
		{field: 'trigger_route', headerName: 'Trigger Route', width: 300},
	];

	return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
      		<DataGrid
						className={classes.datagrid}
						item xs
						components={{
							Toolbar: GridToolbar,
						}}
						loading={loading}
      	  	rows={gridableSpans}
      	  	columns={columns}
      	  	pageSize={25}
						onRowClick={(e) => {
							setShow(!show);
							setClickedSpan(spans.filter(span => span.span_id === e.id)[0])
						}}
  					filterModel={{
							items: [
								{ columnField: 'request_data', operatorValue: 'contains', value: '' },
							],
  					}}
      		/>
        </Grid>
        {show ? (
        	<Grid item xs={4} >
						<Card className={classes.card}>
							<span style={{ float: 'right', color: 'red' }} onClick={() => setShow(false)}>X</span>
							<CardHeader
								title="Span Details"	
								subheader={clickedSpan.span_id}
							/>
							<BarChartSelfContained spans={spans.filter(span => span.trace_id === clickedSpan.trace_id)} />
						  <CardContent>
       					<Typography className={classes.title} color="textSecondary" gutterBottom>
									<div className="span-id">
										<strong>span id: </strong>
										{clickedSpan.span_id}
									</div>
									<div className="trace-id">
										<strong>trace id: </strong>
										{clickedSpan.trace_id}
									</div>
									<div className="chapter-id">
										<strong>chapter id: </strong>
										<a onClick={onChapterClick} href="/">{clickedSpan.chapter_id}</a>
									</div>
									<div className="session-id">
										<strong>session id: </strong>
										<a onClick={onSessionClick} href="/">{clickedSpan.session_id}</a>
									</div>
									<div className="user-id">
										<strong>user id: </strong>
										{clickedSpan.user_id}
									</div>
									<div className="status-code">
										<strong>status code: </strong>
										{clickedSpan.status_code}
									</div>
									<div className="time-sent">
										<strong>time sent: </strong>
										{clickedSpan.time_sent}
									</div>
									<div className="time-duration">
										<strong>time duration: </strong>
										{clickedSpan.time_duration}
									</div>
									<div className="trigger-route">
										<strong>trigger route: </strong>
										{clickedSpan.trigger_route}
									</div>
									<div className="user-id">
										<strong>request data: </strong>
										{clickedSpan.request_data}
									</div>
       					</Typography>
      				</CardContent>
							<CardActions disableSpacing>
								<Typography paragraph>Span Tags</Typography>
        				<IconButton
        				  className={clsx(classes.expand, {
        				    [classes.expandOpen]: expanded,
        				  })}
        				  onClick={handleExpandClick}
        				  aria-expanded={expanded}
        				  aria-label="show more"
        				>
        					<ExpandMoreIcon />
        				</IconButton>
							</CardActions>
							<Collapse in={expanded} timeout="auto" unmountonExit>
								<CardContent>
									<div className="tags" >
										<ul className="list-group">
											<li className="list-group-item">
											{clickedSpan.data
												? Object.keys(clickedSpan.data).map((key) => {
														return (
															<div>
																<strong>{key}: </strong>{clickedSpan.data[key]}
															</div>
														);
													})
												: "Empty"}
											</li>
										</ul>
									</div>
								</CardContent>
							</Collapse>
						</Card>
        	</Grid>
        ) : null}

      </Grid>
    </div>
	);
}

export default SpanSearch;