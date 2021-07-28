import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';

import timeParser from '../../lib/timeParser';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: '#ecedf2',
  },
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: 700,
  },
  details: {
    fontSize: 14,
    wordWrap: 'break-word',
  },
  data: {
    marginLeft: 30,
  },
  prop: {
    fontWeight: 'bold',
  },
}));

const EventDataGrid = ({
  events,
  gridableEvents,
  loading,
  clickedEvent,
  setClickedEvent,
}) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const onChapterClick = (e) => {
    history.push(`/chapter/${clickedEvent.chapter_id}`);
    e.preventDefault();
  };

  const onSessionClick = (e) => {
    history.push(`/session/${clickedEvent.session_id}`);
    e.preventDefault();
  };

  const columns = [
    { field: 'id', headerName: 'Timestamp', width: 150, hide: true },
    { field: 'date_created', headerName: 'Date of Event', type: 'dateTime', width: 250 },
    { field: 'event_type', headerName: 'Type', width: 170 },
    { field: 'event_source', headerName: 'Source', width: 175 },
    { field: 'event_subtype', headerName: 'Mouse Type', width: 170 },
    { field: 'data', headerName: 'Data', width: 475 },
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
            setClickedEvent(
              events.filter((event) => event.data.timestamp === e.row.id)[0]
            );
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
            <CardHeader
              title="Event Details"
              subheader={timeParser(clickedEvent.data.timestamp)}
            />
            <CardContent>
              <Typography
                className={classes.details}
                color="textSecondary"
                gutterBottom
              >
                <div className="user-id">
                  <strong>user id: </strong>
                  {clickedEvent.user_id}
                </div>
                <div className="chapter-id">
                  <strong>chapter id: </strong>
                  <a onClick={onChapterClick} href="/">
                    {clickedEvent.chapter_id}
                  </a>
                </div>
                <div className="session-id">
                  <strong>session id: </strong>
                  <a onClick={onSessionClick} href="/">
                    {clickedEvent.session_id}
                  </a>
                </div>
                <div className="timestamp">
                  <strong>date created: </strong>
                  {timeParser(clickedEvent.data.timestamp)}
                </div>
                <div className="data">
                  <strong>data: </strong>
                  {Object.keys(clickedEvent.data.data).map((detail) => {
                    return (
                      <div className={classes.data}>
                        <span className={classes.prop}>{detail}</span>:{' '}
                        {JSON.stringify(clickedEvent.data.data[detail])}
                      </div>
                    );
                  })}
                </div>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default EventDataGrid;
