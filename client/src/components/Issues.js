import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';

const Issues = () => {
  const [spans, setSpans] = useState([]);
  const [gridableSpans, setGridableSpans] = useState([]);
  const [gridableEvents, setGridableEvents] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
			.get(`/api/spans`)
      .then((response) => {
				setSpans(response.data)

        let gridSpans = response.data.filter(span => {
          return span.status_code >= 400 
        }).map(filteredSpan => {
          const { span_id, chapter_id, status_code, trigger_route } = filteredSpan;
            return { id: span_id, chapter_id, status_code, trigger_route };
				})
				setGridableSpans(gridSpans)
				})
  }, [])

  useEffect(() => {
    axios
			.get(`/api/events`)
      .then((response) => {
				setEvents(response.data)

        let gridEvents = response.data.filter(event => {
          return event.data.data.level === "error";
        })
        .map(filteredEvent => {
          let filteredObj = {
            id: filteredEvent.data.timestamp,
            chapter_id: filteredEvent.chapter_id, 
            typeOfError: filteredEvent.data.data.level, 
            payload: filteredEvent.data.data.payload
          }
            return filteredObj;
				})
        console.log("grid events are", gridEvents)
				setGridableEvents(gridEvents)
				})
  }, [])

  
  const columnsSpans = [
		{field: 'id', headerName: 'Span Id', width: 200},
    {field: 'chapter_id', headerName: 'Chapter Id', width: 175},
		{field: 'status_code', headerName: 'Status Code', width: 175},
		{field: 'trigger_route', headerName: 'Trigger Route', width: 300},
	];

  const columnsEvents = [
		{field: 'id', headerName: 'Time of Event', width: 200},
    {field: 'chapter_id', headerName: 'Chapter Id', width: 175},
		{field: 'typeOfError', headerName: 'Type of Error', width: 175},
		{field: 'payload', headerName: 'Payload', width: 300},
	];

  return (
    <div>
      <div style={{ height: 700, width: '100%' }}>
      	<DataGrid
					components={{
						Toolbar: GridToolbar,
					}}
      	  rows={gridableSpans}
      	  columns={columnsSpans}
      	  pageSize={25}
					onRowClick={(e) => console.log("row click event: ", e)}
  				filterModel={{
						items: [
							{ columnField: 'status_code', operatorValue: 'contains', value: '' },
						],
  				}}
      	/>
			</div>
      <div style={{ height: 700, width: '100%' }}>
      	<DataGrid
					components={{
						Toolbar: GridToolbar,
					}}
      	  rows={gridableEvents}
      	  columns={columnsEvents}
      	  pageSize={25}
					onRowClick={(e) => console.log("row click event: ", e)}
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