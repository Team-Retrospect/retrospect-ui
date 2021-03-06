import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpanDataGrid from './grids/SpanDataGrid';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import spanGridProperties from '../lib/spanGridProperties';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 115,
    marginBottom: 50,
    '& .MuiDataGrid-root': {
      backgroundColor: '#ffffff',
      padding: 15,
    },
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

const SpanSearch = (props) => {
  const classes = useStyles();
  const [spans, setSpans] = useState([]);
  const [clickedSpan, setClickedSpan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gridableSpans, setGridableSpans] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get('/api/spans')
      .then((response) => response.data)
      .then((spans) => {
        setSpans(spans);
        const gridSpans = spans.map(spanGridProperties);
        setGridableSpans(gridSpans);
        setLoading(false);
      });
  }, []);

  let selectedTR;
  if (props.location.state) {
    selectedTR = props.location.state.data;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Spans
      </Typography>
      <SpanDataGrid
        gridableSpans={gridableSpans}
        loading={loading}
        clickedSpan={clickedSpan}
        setClickedSpan={setClickedSpan}
        spans={spans}
        selectedTR={selectedTR}
      />
    </div>
  );
};

export default SpanSearch;
