import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Span from './Span';

// import Span from './Span';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
  title: {
    fontSize: 14,
  },
}));


const SpanSearch = () => {
	const [spans, setSpans] = useState([]);
  const [show, setShow] = useState(false);
	const [clickedSpan, setClickedSpan] = React.useState(null);
	const [loading, setLoading] = useState(false);
	const [gridableSpans, setGridableSpans] = useState([]);

	const classes = useStyles();

	useEffect(() => {
		setLoading(true)

		axios
			.get(`/api/spans`)
      .then((response) => {
				setSpans(response.data)
				const gridSpans = response.data.map(span => {
					const { span_id, request_data, status_code, trigger_route } = span;
					return { id: span_id, request_data, status_code, trigger_route };
				})
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
      <Grid container spacing={3}>
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
    </div>
	);
}

export default SpanSearch;