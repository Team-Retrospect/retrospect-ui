import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";
import 'moment-timezone';
import moment from 'moment';
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
          // const { span_id, chapter_id, status_code, trigger_route } = filteredSpan;
          //   return { id: span_id, chapter_id, status_code, trigger_route };
					// return filteredObj;
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
		{field: 'id', headerName: 'Span Id', width: 200},
		{field: 'date_created', type: "date", headerName: 'Date of Error', width: 200},
		{field: 'service_name', headerName: 'Service Name', width: 200},
    {field: 'chapter_id', headerName: 'Chapter Id', width: 175},
		{field: 'status_code', headerName: 'Status Code', width: 175},
		{field: 'trigger_route', headerName: 'Trigger Route', width: 300},
	];

  const columnsEvents = [
		{field: 'id', headerName: 'Time of Event', width: 175, hide: true},
		{field: 'date_created', headerName: 'Time of Event', width: 200},
    {field: 'chapter_id', headerName: 'Chapter Id', width: 175},
		{field: 'typeOfError', headerName: 'Type of Error', width: 175},
		{field: 'payload', headerName: 'Payload', width: 500},
	];

  const handleRoute = (e) =>{ 
    history.push(`/chapter/${e.row.chapter_id}`);
  }

  return (
    <div>
      <h2>Spans with Errors</h2>
      <div style={{ height: gridableSpans.length < 5 ? 350 : 700, width: '100%' }}>
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
							{ columnField: 'status_code', operatorValue: 'contains', value: '' },
						],
  				}}
      	/>
			</div>
      <br></br>
      <h2>Events with Errors</h2>
      <div style={{ height: gridableEvents.length < 5 ? 350 : 700, width: '100%' }}>
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

export default Issues;