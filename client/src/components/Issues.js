import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import StorageIcon from '@material-ui/icons/Storage';
import WebIcon from '@material-ui/icons/Web';
import { Chip, Grid } from '@material-ui/core';
import ErrorCard from './cards/ErrorCard';
import CustomDataGrid from './grids/CustomDataGrid';
import timeParser from '../lib/timeParser';

const Issues = () => {
  const [gridableSpans, setGridableSpans] = useState([]);
  const [gridableEvents, setGridableEvents] = useState([]);
  const [loadingSpans, setLoadingSpans] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoadingSpans(true);
    axios.get(`/api/spans`).then((response) => {
      let gridSpans = response.data
        .filter((span) => {
          return span.status_code >= 400;
        })
        .map((filteredSpan) => {
          return {
            id: filteredSpan.span_id,
            date_created: timeParser(filteredSpan.time_sent / 1000),
            service_name: filteredSpan.data['service.name'],
            chapter_id: filteredSpan.chapter_id,
            status_code: filteredSpan.status_code,
            trigger_route: filteredSpan.trigger_route,
          };
        });
      setGridableSpans(gridSpans);
      setLoadingSpans(false);
    });
  }, []);

  useEffect(() => {
    setLoadingEvents(true);
    axios.get(`/api/events`).then((response) => {
      let gridEvents = response.data
        .filter((event) => {
          return event.data.data.level === 'error';
        })
        .map((filteredEvent) => {
          return {
            id: filteredEvent.data.timestamp,
            date_created: timeParser(filteredEvent.data.time_sent),
            chapter_id: filteredEvent.chapter_id,
            typeOfError: filteredEvent.data.data.level,
            payload: filteredEvent.data.data.payload,
          };
        });
      setGridableEvents(gridEvents);
      setLoadingEvents(false);
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 75,
      marginBottom: 50,
    },
    chip: {
      marginLeft: 30,
    },
  }));

  const classes = useStyles();

  const columnsSpans = [
    {
      field: 'id',
      headerClassName: 'super-app-theme--header',
      headerName: 'Span Id',
      width: 200,
    },
    {
      field: 'date_created',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      headerName: 'Date of Event',
      width: 200,
    },
    {
      field: 'service_name',
      headerClassName: 'super-app-theme--header',
      headerName: 'Service Name',
      width: 200,
    },
    {
      field: 'chapter_id',
      headerClassName: 'super-app-theme--header',
      headerName: 'Chapter Id',
      width: 175,
    },
    {
      field: 'status_code',
      headerClassName: 'super-app-theme--header',
      headerName: 'Status Code',
      width: 175,
      renderCell: (params) => {
        return (
          <Chip
            style={{ color: params.formattedValue < 500 ? 'orange' : 'red' }}
            label={params.formattedValue}
            size="small"
            variant="outline"
            className={classes.chip}
          ></Chip>
        );
      },
      headerAlign: 'center',
    },
    {
      field: 'trigger_route',
      headerClassName: 'super-app-theme--header',
      headerName: 'Trigger Route',
      width: 300,
    },
  ];

  const columnsEvents = [
    { field: 'id', headerName: 'Id', width: 175, hide: true },
    { field: 'date_created', headerName: 'Date of Event', width: 200 },
    { field: 'chapter_id', headerName: 'Chapter Id', width: 175 },
    {
      field: 'typeOfError',
      headerName: 'Type of Error',
      width: 175,
      renderCell: (params) => {
        return (
          <Chip
            style={{ color: 'red' }}
            label={params.formattedValue}
            size="small"
            variant="outline"
            className={classes.chip}
          ></Chip>
        );
      },
      headerAlign: 'center',
    },
    { field: 'payload', headerName: 'Payload', width: 700 },
  ];

  let clientSideErrors = gridableSpans.filter(
    (span) => span.status_code >= 400 && span.status_code <= 499
  ).length;
  let serverSideErrors = gridableSpans.filter(
    (span) => span.status_code >= 500 && span.status_code <= 599
  ).length;
  let frontendErrors = gridableEvents.length;

  let errors = [
    {
      errorType: clientSideErrors,
      title: 'Client Side Errors',
      icon: <ImageSearchIcon />,
      type: 'Spans',
    },
    {
      type: serverSideErrors,
      title: 'Server Side Errors',
      icon: <StorageIcon />,
      type: 'Spans',
    },
    {
      type: frontendErrors,
      title: 'Frontend Errors',
      icon: <WebIcon />,
      type: 'Events',
    },
  ];

  const handleRoute = (e) => {
    history.push(`/chapter/${e.row.chapter_id}`);
  };

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={4} justify="center">
          {errors.map((error) => {
            return (
              <Grid item xs={3} key={error.title}>
                <ErrorCard
                  errors={error.errorType}
                  title={error.title}
                  Icon={error.icon}
                  type={error.type}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>

      <h2>Spans with Errors</h2>
      <CustomDataGrid
        loading={loadingSpans}
        dataRows={gridableSpans}
        dataColumns={columnsSpans}
        filterField="Status_code"
        onHandleClick={handleRoute}
      ></CustomDataGrid>
      <br></br>

      <h2>Events with Errors</h2>
      <CustomDataGrid
        loading={loadingEvents}
        dataRows={gridableEvents}
        dataColumns={columnsEvents}
        filterField="Payload"
        onHandleClick={handleRoute}
      ></CustomDataGrid>
    </div>
  );
};

export default Issues;
