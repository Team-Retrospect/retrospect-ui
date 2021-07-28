import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import SpanSearchBarChart from '../charts/SpanSearchBarChart'
import clsx from 'clsx';
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
  Divider,
} from '@material-ui/core';

import timeParser from '../../lib/timeParser';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 75,
    marginBottom: 50,
    '& .MuiDataGrid-root': {
      backgroundColor: '#ffffff',
      padding: 15,
    },
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: '#ecedf2',
    color: '#000000',
  },
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: 700,
    cursor: "pointer"
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
  chip: {
    marginLeft: 30,
  },
}));

const SpanDataGrid = ({
  gridableSpans,
  loading,
  clickedSpan,
  setClickedSpan,
  spans,
  selectedTR,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onChapterClick = (e) => {
    history.push(`/chapter/${clickedSpan.chapter_id}`);
    e.preventDefault();
  };

  const onSessionClick = (e) => {
    history.push(`/session/${clickedSpan.session_id}`);
    e.preventDefault();
  };

  const renderStatusColor = (statusVal) => {
    if (statusVal < 200) {
      return '#FFEA00';
    } else if (statusVal >= 200 && statusVal < 300) {
      return '#028A0F';
    } else if (statusVal >= 300 && statusVal < 400) {
      return '#0000FF';
    } else if (statusVal >= 400 && statusVal < 500) {
      return '#ffa500';
    } else if (statusVal >= 500) {
      return '#ff0000';
    } else if (statusVal === "NA") {
      return '#C4C4C4';
    }
  };
  const columns = [
    { field: 'id', headerName: 'Span Id', width: 200 },
    { field: 'date_created', headerName: 'Date of Span', type: 'dateTime', width: 200 },
    { field: 'service_name', headerName: 'Service Name', width: 200 },
    { field: 'span_type', headerName: 'Span Type', width: 150 },
    { field: 'request_data', headerName: 'Request Data', width: 200 },
    {
      field: 'status_code',
      headerName: 'Status Code',
      width: 175,
      renderCell: (params) => {
        console.log(params)
        if (params.formattedValue === null) {
          params.formattedValue = "NA"
        }
        let sColor = renderStatusColor(params.formattedValue);
        return (
          <Chip
            style={{ color: sColor }}
            label={params.formattedValue}
            size="small"
            variant="outlined"
            className={classes.chip}
          ></Chip>
        );
      },
      headerAlign: 'center',
    },
    { field: 'trigger_route', headerName: 'Trigger Route', width: 300 },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <DataGrid
          className={classes.datagrid}
          item
          xs
          components={{
            Toolbar: GridToolbar,
          }}
          loading={loading}
          rows={gridableSpans}
          columns={columns}
          pageSize={25}
          onRowClick={(e) => {
            setShow(!show);
            setClickedSpan(spans.filter((span) => span.span_id === e.id)[0]);
          }}
          filterModel={{
            items: [
              {
                columnField: selectedTR ? 'trigger_route' : 'request_data',
                operatorValue: selectedTR ? 'equals' : 'contains',
                value: selectedTR ? selectedTR : '',
              },
            ],
          }}
        />
      </Grid>
      {show ? (
        <Grid item xs={4}>
          <Card className={classes.card}>
            <span
              style={{ float: 'right', color: 'gray', cursor: 'pointer' }}
              onClick={() => setShow(false)}
            >
              X
            </span>
            <CardHeader title="Span Details" subheader={clickedSpan.span_id} />
            <Divider />
            <br></br>
            <Typography variant="h6" gutterBottom>
              Trace
            </Typography>
            <SpanSearchBarChart
              spans={spans.filter(
                (span) => span.trace_id === clickedSpan.trace_id
              )}
            />
            <br></br>
            <Divider />
            <br></br>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
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
                  <a onClick={onChapterClick} href="/">
                    {clickedSpan.chapter_id}
                  </a>
                </div>
                <div className="session-id">
                  <strong>session id: </strong>
                  <a onClick={onSessionClick} href="/">
                    {clickedSpan.session_id}
                  </a>
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
                  <strong>date created: </strong>
                  {timeParser(clickedSpan.time_sent / 1000)}
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
                  {JSON.stringify(clickedSpan.request_data)}
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
                <div className="tags">
                  <ul className="list-group">
                    <li className="list-group-item">
                      {clickedSpan.data
                        ? Object.keys(clickedSpan.data).map((key) => {
                            return (
                              <div>
                                <strong>{key}: </strong>
                                {clickedSpan.data[key]}
                              </div>
                            );
                          })
                        : 'Empty'}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default SpanDataGrid;
