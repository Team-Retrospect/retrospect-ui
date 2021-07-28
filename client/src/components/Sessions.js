import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import timeParser from '../lib/timeParser';

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
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: 700,
    cursor: "pointer"
  },
}));

const Sessions = () => {
  const [gridableSessions, setGridableSessions] = useState([]);
  const [loading, setLoading] = useState([]);

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);

    axios.get(`/api/events`).then((response) => {
      let sessionStart = {};
      response.data.forEach((event) => {
        if (!sessionStart[event.session_id]) {
          sessionStart[event.session_id] = {
            user_id: event.user_id,
            earliestTimestamp: event.data.timestamp,
            latestTimestamp: event.data.timestamp,
          };
        } else if (
          event.data.timestamp <
          sessionStart[event.session_id].earliestTimestamp
        ) {
          sessionStart[event.session_id].earliestTimestamp =
            event.data.timestamp;
        } else if (
          event.data.timestamp > sessionStart[event.session_id].latestTimestamp
        ) {
          sessionStart[event.session_id].latestTimestamp = event.data.timestamp;
        }
      });

      let testObjects = [];

      for (let [key, value] of Object.entries(sessionStart)) {
        let duration = (value.latestTimestamp - value.earliestTimestamp) / 1000;

        let testObj = {
          id: key,
          user_id: value.user_id,
          earliest_timestamp: timeParser(value.earliestTimestamp),
          duration: new Date(duration * 1000).toISOString().substr(11, 8),
        };
        testObjects.push(testObj);
      }

      setGridableSessions(testObjects);
      setLoading(false);
    });
  }, []);

  const handleRoute = (e) => {
    console.log(e);
    history.push(`/session/${e.id}`);
  };

  const columns = [
    { field: 'id', headerName: 'Session ID', width: 300 },
    { field: 'user_id', headerName: 'User ID', width: 300 },
    { field: 'earliest_timestamp', headerName: 'Start Time', width: 240 },
    { field: 'duration', headerName: 'Duration', width: 240 },
  ];

  if (!gridableSessions) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Sessions
      </Typography>
      <DataGrid
        className={classes.datagrid}
        components={{
          Toolbar: GridToolbar,
        }}
        rows={gridableSessions}
        columns={columns}
        pageSize={25}
        onRowClick={(e) => handleRoute(e)}
        loading={loading}
        filterModel={{
          items: [
            {
              columnField: 'session_id',
              operatorValue: 'contains',
              value: '',
            },
          ],
        }}
      />
    </div>
  );
};

export default Sessions;
