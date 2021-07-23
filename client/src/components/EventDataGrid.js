// NOTE: not working yet

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Grid } from '@material-ui/core';

import 'moment-timezone';
import moment from 'moment';

const timezone = "America/Los_Angeles";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 75,
		marginBottom: 50, 
		'& .MuiDataGrid-root': {
			backgroundColor: "#ffffff", 
			padding: 15
		}
	},
	card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    // color: theme.palette.text.secondary,
		backgroundColor: "#ecedf2"
  },
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
		height: 700,
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
}))

const EventDataGrid = ({ dataRows, dataColumns, events}) => {
  const classes = useStyles();
	const history = useHistory();
  // const [events, setEvents] = useState([]);
	const [clickedEvent, setClickedEvent] = useState(null);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	// const onChapterClick = (e) => {
	// 	history.push(`/chapter/${clickedEvent.chapter_id}`);
	// 	e.preventDefault();
	// }

	// const onSessionClick = (e) => {
	// 	history.push(`/session/${clickedEvent.session_id}`);
	// 	e.preventDefault();
	// }

  return (
				<Grid item xs>
					<DataGrid
						className={classes.datagrid}
						item xs
						components={{
							Toolbar: GridToolbar,
						}}
						filterModel={{
							items: [
								{ columnField: 'data', operatorValue: 'contains', value: '' },
							],
						}}
						loading={loading}
						rows={dataRows}
						columns={dataColumns}
						pageSize={25}
						onRowClick={(e) => {
							setShow(!show);
							setClickedEvent(events.filter(event => event.data.timestamp === e.row.id)[0]);
						}}
					/>
				</Grid>
  );
}

export default EventDataGrid;