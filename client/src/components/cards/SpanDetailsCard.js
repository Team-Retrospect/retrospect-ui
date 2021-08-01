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
  CardContent,
} from '@material-ui/core';

import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  details: {
    marginLeft: 20,
  },
  tags: {
    color: theme.palette.text.secondary,
  },
  list: {
    marginLeft: 40,
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
  const decodedString = Buffer.from(data || '', 'base64').toString();
  if (decodedString === 'undefined' || !decodedString) {
    return null;
  }
  const parsedDecodedString = JSON.parse(decodedString);
  return parsedDecodedString;
};

const SpanDetailsCard = ({ span, setShow }) => {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const onSessionClick = (e) => {
    history.push(`/session/${span.session_id}`)
    e.preventDefault();
  };

  const onChapterClick = (e) => {
    history.push(`/chapter/${span.chapter_id}`);
    e.preventDefault();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const request_data = span.request_data;
  const parsed_request_data = parseBase64ToJSON(request_data);
  const string_request_data = JSON.stringify(parsed_request_data);

  return (
    <Grid container>
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
                <div className="span-id">
                  <Typography>
                    <strong>span id: </strong>
                    {span.span_id}
                  </Typography>
                </div>
                <div className="trace-id">
                  <Typography>
                    <strong>trace id: </strong>
                    {span.trace_id}
                  </Typography>
                </div>
                <div className="chapter-id">
                  <Typography>
                    <strong>chapter id: </strong>
                    <a onClick={onChapterClick} href="/">
                      {span.chapter_id}
                    </a>
                  </Typography>
                </div>
                <div className="session-id">
                  <Typography>
                    <strong>session id: </strong>
                    <a onClick={onSessionClick} href="/">
                      {span.session_id}
                    </a>
                  </Typography>
                </div>
                <div className="user-id">
                  <Typography>
                    <strong>user id: </strong>
                    {span.user_id}
                  </Typography>
                </div>
              </Grid>
              <Grid item style={{ paddingLeft: '20px' }}>
                <div className="status-code">
                  <Typography>
                    <strong>status code: </strong>
                    {span.status_code}
                  </Typography>
                </div>
                <div className="time-sent">
                  <Typography>
                    <strong>date created: </strong>
                    {timeParser(span.time_sent / 1000)}
                  </Typography>
                </div>
                <div className="time-duration">
                  <Typography>
                    <strong>time duration: </strong>
                    {span.time_duration}
                  </Typography>
                </div>
                <div className="trigger-route">
                  <Typography>
                    <strong>trigger route: </strong>
                    {span.trigger_route}
                  </Typography>
                </div>
                <div className="user-id">
                  <Typography>
                    <strong>request data: </strong>
                    {string_request_data}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <CardActions disableSpacing>
                  <CardHeader title="Span Tags" />
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
                    <div className="tags">
                      <div className={classes.list}>
                        {span.data
                          ? Object.keys(span.data)
                              .sort()
                              .map((key) => {
                                return (
                                  <div key={key}>
                                    <Typography className={classes.tags}>
                                      <strong>{key}: </strong>
                                      {span.data[key]}
                                    </Typography>
                                  </div>
                                );
                              })
                          : 'Empty'}
                      </div>
                    </div>
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
