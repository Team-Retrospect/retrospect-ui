import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import CustomDataGrid from './CustomDataGrid';
import { makeStyles } from '@material-ui/core/styles';

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
    // color: theme.palette.text.secondary,
    height: 700,
  },
}));

const Triggers = () => {
  const [gridableTriggers, setGridableTriggers] = useState([]);
  const [loading, setLoading] = useState(false);
  let counter = 0;

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios.get('/api/trigger_routes').then((response) => {
      const gridTriggers = response.data.map((trigger) => {
        return { id: counter++, trigger_route: trigger };
      });
      setGridableTriggers(gridTriggers);
      setLoading(false);
    });
  }, []);

  const handleRoute = (e) => {
    history.push({
      pathname: '/spans/',
      state: {
        data: e.row.trigger_route,
      },
    });
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 200, hide: true },
    { field: 'trigger_route', headerName: 'Trigger Route', width: 500 },
  ];

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
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomDataGrid
        dataRows={gridableTriggers}
        dataColumns={columns}
        filterField="trigger_route"
        onHandleClick={handleRoute}
        loading={loading}
      />
    </div>
  );
};

export default Triggers;
