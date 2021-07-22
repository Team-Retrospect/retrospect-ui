import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";
import 'moment-timezone';
import moment from 'moment';
// import theme from '../theme';


// import Avatar from '@material-ui/core/Avatar';
import { red, orange } from '@material-ui/core/colors';


// testing cards
// import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Paper from '@material-ui/core/Paper';
import StorageIcon from '@material-ui/icons/Storage';
import WebIcon from '@material-ui/icons/Web';

import {
  Avatar,
  Box,
  Card,
	Chip,
  CardContent,
  Grid,
  Typography, 
	Container
} from '@material-ui/core';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import ImageSearch from '@material-ui/icons/ImageSearch';

const timezone = "America/Los_Angeles";



const Issues = () => {
  const [gridableSpans, setGridableSpans] = useState([]);
  const [gridableEvents, setGridableEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
			.get(`/api/spans`)
      .then((response) => {

        let gridSpans = response.data.filter(span => {
          return span.status_code >= 400 
        }).map(filteredSpan => {
					let date = moment(filteredSpan.time_sent / 1000).tz(timezone).format("MM/DD/YYYY HH:MM A z")
					return {
						id: filteredSpan.span_id,
						date_created: date,
						service_name: filteredSpan.data["service.name"],
						chapter_id: filteredSpan.chapter_id, 
						status_code: filteredSpan.status_code, 
						trigger_route: filteredSpan.trigger_route
					}
				})
				setGridableSpans(gridSpans)
				})
  }, [])

  useEffect(() => {
    axios
			.get(`/api/events`)
      .then((response) => {

        let gridEvents = response.data.filter(event => {
          return event.data.data.level === "error";
        })
        .map(filteredEvent => {
					let date = moment(filteredEvent.data.time_sent).tz(timezone).format("MM/DD/YYYY HH:MM A z")
          return {
            id: filteredEvent.data.timestamp,
						date_created: date,
            chapter_id: filteredEvent.chapter_id, 
            typeOfError: filteredEvent.data.data.level, 
            payload: filteredEvent.data.data.payload
          }
				})
				setGridableEvents(gridEvents);
				})
  }, [])
  
  const columnsSpans = [
		{field: 'id', headerClassName: 'super-app-theme--header', headerName: 'Span Id', width: 200},
		{field: 'date_created', headerClassName: 'super-app-theme--header', type: "date", headerName: 'Date of Event', width: 200},
		{field: 'service_name', headerClassName: 'super-app-theme--header', headerName: 'Service Name', width: 200},
    {field: 'chapter_id', headerClassName: 'super-app-theme--header', headerName: 'Chapter Id', width: 175},
		{field: 'status_code', headerClassName: 'super-app-theme--header', headerName: 'Status Code', width: 175, 
		renderCell: (params) => {
			console.log("params are", typeof params.formattedValue)
			return <Chip style={{color: params.formattedValue < 500 ? 'orange' : 'red'}} label={params.formattedValue} size="small" variant="outline" className={classes.chip}></Chip>
		}, headerAlign: 'center'},
		{field: 'trigger_route', headerClassName: 'super-app-theme--header', headerName: 'Trigger Route', width: 300},
	];

  const columnsEvents = [
		{field: 'id', headerName: 'Id', width: 175, hide: true},
		{field: 'date_created', headerName: 'Date of Event', width: 200},
    {field: 'chapter_id', headerName: 'Chapter Id', width: 175},
		{field: 'typeOfError', headerName: 'Type of Error', width: 175, 
		renderCell: (params) => {
			console.log("params are", typeof params.formattedValue)
			return <Chip style={{color:'red'}} label={params.formattedValue} size="small" variant="outline" className={classes.chip}></Chip>
		}, headerAlign: 'center'},
		{field: 'payload', headerName: 'Payload', width: 700},
	];

  const handleRoute = (e) =>{ 
    history.push(`/chapter/${e.row.chapter_id}`);
  }

	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
			marginTop: 75,
			marginBottom: 50, 
		},
		// header: {
		// 	'& .super-app-theme--header': {
		// 		backgroundColor: 'rgba(191, 191, 191, 1)',
		// 	},
		// },
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
		avatar: {
			backgroundColor: red[500]
		}, 
		customTable: {
			'& .MuiDataGrid-root': {
				backgroundColor: "#ffffff", 
				padding: 15
			}
		}, 
		chip: {
			 marginLeft: 30
		}, 
		errors: {

		}
	}));

	const classes = useStyles();

  const bull = <span className={classes.bullet}>•</span>;

	let clientSideErrors = gridableSpans.filter(span => span.status_code >= 400 && span.status_code <= 499).length;

	let serverSideErrors = gridableSpans.filter(span => span.status_code >= 500 && span.status_code <= 599).length;

	let frontendErrors = gridableEvents.length;

  return (
    <div>
			<div className={classes.root}>
				<Grid container spacing={4} justify="center">
					<Grid item xs={3}>
						<Error errors={clientSideErrors} title={"Client Side Errors"} Icon={<ImageSearchIcon />} type={"Spans"}/>
					</Grid>
					<Grid item xs={3}>
						<Error errors={serverSideErrors} title={"Service Side Errors"} Icon={<StorageIcon />} type={"Spans"}/>
					</Grid>
					<Grid item xs={3}>
						<Error errors={frontendErrors} title={"Frontend Errors"} Icon={<WebIcon />} type={"Events"}/>
					</Grid>
				</Grid>
			</div>
		
      <h2>Spans with Errors</h2>
      <div style={{ height: gridableSpans.length < 5 ? 450 : 700, width: '100%'}} className={classes.customTable}>
      	<DataGrid
					components={{
						Toolbar: GridToolbar,
					}}
      	  rows={gridableSpans}
      	  columns={columnsSpans}
      	  pageSize={25}
					onRowClick={(e) => handleRoute(e)}
  				filterModel={{
						items: [
							{ columnField: 'Status_code', operatorValue: 'contains', value: '' },
						],
  				}}
      	/>
			</div>
      <br></br>

      <h2>Events with Errors</h2>
      <div style={{ height: gridableEvents.length < 5 ? 450 : 700, width: '100%' }} className={classes.customTable}>
      	<DataGrid
					components={{
						Toolbar: GridToolbar,
					}}
      	  rows={gridableEvents}
      	  columns={columnsEvents}
      	  pageSize={25}
					onRowClick={(e) => handleRoute(e)}
  				filterModel={{
						items: [
							{ columnField: 'Payload', operatorValue: 'contains', value: '' },
						],
  				}}
      	/>
			</div>
    </div>
  )
}

const Error = ({errors, title, Icon, type}) => (
  <Card
    sx={{ height: '100%' }}
    // {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={4}
        sx={{ justifyContent: 'space-between' }}
      >
				<Grid item>
          <Avatar style={{backgroundColor: red[500]}}>
            {Icon}
          </Avatar>
        </Grid>
        <Grid item style={{paddingLeft: '20px'}}>
				<Typography
            color="textPrimary"
            variant="h4"
          >
            {errors} {title}
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            {type}
          </Typography>
          
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </Box> */}
    </CardContent>
  </Card>
);

export default Issues;