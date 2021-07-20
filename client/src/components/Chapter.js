import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import clsx from 'clsx';
import axios from 'axios';

import Trace from './Trace';
import Events from './Events';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
  },
}));

const Chapter = ({ id }) => {
	const history = useHistory();
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [spans, setSpans] = useState([]);
	const [clickedSpan, setClickedSpan] = React.useState(null);
  const [traceId, setTraceId] = useState("");
  const [visibleChapter, setVisibleChapter] = useState(false);
  const params = useParams();
  // const url = window.location.href.split("/")[3];
	const classes = useStyles();

	useEffect(() => {
    // if (url === "chapter") {
    if (!id) {
      id = params.id;
    }
		axios.get(`/api/events_by_chapter/${id}`).then((response) => {
			setEvents(response.data);
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

  return (
    <div>
      <h4>Chapter: {id}</h4>
      {/* <div onClick={() => setVisibleChapter(!visibleChapter)}>
        (click to expand/close chapter)
      </div>
      <br></br> */}
      {/* {visibleChapter
        ? ( */}
          <div>
            <Grid container spacing={2}>
              <Grid item xs>
                <Trace traceId={traceId} spans={spans} show={show} setShow={setShow} setClickedSpan={setClickedSpan} />
              </Grid>
              {show ? (
        	      <Grid item xs={4} >
						      <span style={{ float: 'right', color: 'red' }} onClick={() => setShow(false)}>X</span>
						      <Card className={classes.card}>
							      <CardHeader
							      	title="Span Details"	
							      	subheader={clickedSpan.span_id}
							      />
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
										      {clickedSpan.chapter_id}
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
                  <Events events={events} />
                </div>
                {/* )
              : ''} */}
    </div>
  );
};

export default Chapter;
