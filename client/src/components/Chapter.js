import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Trace from './Trace';
import Events from './Events';
import Span from './Span'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
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


  return (
    <div>
      <h4>Chapter: {id}</h4>
      <div onClick={() => setVisibleChapter(!visibleChapter)}>
        (click to expand/close chapter)
      </div>
      <br></br>
      {visibleChapter
        ? (
          <div>
            <Grid container spacing={2}>
              <Grid item xs>
                <Trace traceId={traceId} spans={spans} show={show} setShow={setShow} setClickedSpan={setClickedSpan} />
              </Grid>
              {show ? (
        	      <Grid item xs={4} >
						      <span style={{ float: 'right', color: 'red' }} onClick={() => setShow(false)}>X</span>
						      <Card className={classes.card}>
						        <CardContent>
       					      <Typography className={classes.title} color="textSecondary" gutterBottom>
         					      Span Details
       					      </Typography>
								      <Span span={clickedSpan} />
      				      </CardContent>
						      </Card>
        	      </Grid>
              ) : null}
                  </Grid>
                  <Events events={events} />
                </div>
                )
              : ''}
    </div>
  );
};

export default Chapter;
