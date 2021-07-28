import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import timeParser from '../../lib/timeParser';
import {
  CardActions,
  Collapse,
  IconButton, 
  Typography, 
  Card, 
  CardHeader, 
  Grid, 
  CardContent
} from '@material-ui/core';

import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  details: {
    marginLeft: 20
  }, 
  tags: {
    color: theme.palette.text.secondary
  }, 
  list: {
    marginLeft: 40
  }, 
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const parseBase64ToJSON = (data) => {
  const decodedString = Buffer.from(data || "", 'base64').toString();
  if (decodedString === 'undefined' || !decodedString) {
    return null;
  }
  const parsedDecodedString = JSON.parse(decodedString);
  return parsedDecodedString;
};

const SpanDetailsCard = ({ span, setShow }) => {
  const [showTags, setTagsShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const onSessionClick = (e) => {
    history.push(`/session/${span.session_id}`);
    e.preventDefault();
  };
  
  const onChapterClick = (e) => {
    history.push(`/chapter/${span.chapter_id}`);
    e.preventDefault();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log("preparsing request data: ", span.request_data)
  const decodedData = parseBase64ToJSON(span.request_data);
  console.log("decodedData: ", decodedData);
  span.request_data = JSON.parse(decodedData)
  console.log("postparsing request data: ", span.request_data)

  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <Card className={classes.card} xs={12}>
          <span
            style={{ float: 'right', color: 'gray' }}
            onClick={() => setShow(false)}
          >
            X
          </span>
          <CardHeader title="Span Details" subheader={span.span_id} />
          <CardContent>
            <Grid
              container
              spacing={4}
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid item className={classes.details}>
                <Typography>
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
                  <a onClick={onChapterClick} href="/">
                    {span.chapter_id}
                  </a>
                </div>
                <div className="session-id">
                  <strong>session id: </strong>
                  <a onClick={onSessionClick} href="/">
                    {span.session_id}
                  </a>
                </div>
                <div className="user-id">
                  <strong>user id: </strong>
                  {span.user_id}
                </div>
                </Typography>
              </Grid>
              <Grid item style={{paddingLeft: '20px'}}>
                <Typography>
                    <div className="status-code">
                      <strong>status code: </strong>
                      {span.status_code}
                    </div>
                    <div className="time-sent">
                      <strong>date created: </strong>
                      {timeParser(span.time_sent / 1000)}
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
                      {JSON.stringify(span.request_data)}
                    </div>
                  </Typography>
              </Grid>
              <Grid item xs={12}>
              <CardActions disableSpacing>
                <CardHeader title="Span Tags"/> 
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
                <Card>
                  <Typography className={classes.tags}>
                    <div className="tags">
                        <div className={classes.list}>
                            {span.data
                              ? Object.keys(span.data).sort().map((key) => {
                                  return (
                                    <div>
                                      <strong>{key}: </strong>
                                      {span.data[key]}
                                    </div>
                                  );
                                })
                              : 'Empty'}
                        </div>
                      </div>
                  </Typography>
                </Card>
              </Collapse>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SpanDetailsCard;
