import React, { useState, useEffect } from 'react';
import EventSearchForm from './EventSearchForm';
import EventFilterForm from './EventFilterForm';
import Event from './Event';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { v4 as uuidv4 } from "uuid";

const EventSearch = () => {
  const [events, setEvents] = useState([]);
	const [logEvents, setLogEvents] = useState([]);
	const [visibleEvents, setVisibleEvents] = useState([]);
	const [gridableEvents, setGridableEvents] = useState([]);
	const [search, setSearch] = useState(false);
	const [filter, setFilter] = useState(false);
	const [userId, setUserId] = useState('');
	const [sessionId, setSessionId] = useState('');
	const [chapterId, setChapterId] = useState('');
	const [eventType, setEventType] = useState('6');
	const [incrementalSnapshot, setIncrementalSnapshot] = useState('13');
	const [mouseInteraction, setMouseInteraction] = useState('10');
	const [logPayload, setLogPayload] = useState('');

	const searchValues = { userId, sessionId, chapterId };
	const setSearchFunctions = { setUserId, setSessionId, setChapterId };

	const filterValues = { 
		eventType, 
		incrementalSnapshot, 
		mouseInteraction, 
		logPayload, 
	};

	const setFilterFunctions = { 
		setEventType, 
		setIncrementalSnapshot, 
		setMouseInteraction, 
		setLogPayload, 
	};

  useEffect(() => {
		let search = {
			user_id: userId,
			session_id: sessionId,
			chapter_id: chapterId,
		}

    let queryString = [];
		Object.entries(search).forEach((key, value) => {
			queryString.push(`${key}=${value}`)
		})
		let queryStringConcat = queryString.join("&")

    axios
      .get(`/api/event_search?${queryStringConcat}`)
      .then((response) => {
				setEvents(response.data)
				setVisibleEvents(response.data)
				const gridEvents = response.data.map(event => {
					const { data } = event;
					const { source, ...dataData } = data.data;
					return { id: uuidv4(), event_timestamp: data.timestamp, event_type: data.type, event_source: source, data: JSON.stringify(dataData) };
				})
				setGridableEvents(gridEvents)
			})
  }, [search]);

	useEffect(() => {
		let filteredEvents = events.filter(event => {
			if (eventType === '6') { return true }
			return event.data.type === parseInt(eventType)
		})

		setVisibleEvents(filteredEvents)
	}, [eventType])

	useEffect(() => {
		let filteredEvents = events.filter(event => {
			if (eventType === '13') { return true }
			return event.data.data.source === parseInt(incrementalSnapshot)
		})

		setVisibleEvents(filteredEvents)
		if (incrementalSnapshot === '11') { setLogEvents(filteredEvents) }
	}, [incrementalSnapshot])

	useEffect(() => {
		let filteredEvents = events.filter(event => {
			if (eventType === '10') { return true }
			return event.data.data.type === parseInt(mouseInteraction)
		})

		setVisibleEvents(filteredEvents)
	}, [mouseInteraction])

	useEffect(() => {
		let filteredEvents = logEvents.filter(event => {
			return JSON.stringify(event.data.data.payload).includes(logPayload)
		})

		setVisibleEvents(filteredEvents)
	}, [logPayload])

	const handleSearch = () => {
		setSearch(!search);
	}

	const columns = [
		{field: 'id', headerName: 'Event Id', width: 200},
		{field: 'event_timestamp', headerName: 'Timestamp', width: 150},
		{field: 'event_type', headerName: 'Event Type', width: 150},
		{field: 'event_source', headerName: 'Event Source', width: 175},
		{field: 'data', headerName: 'Event Data', width: 400},
	];

  return (
		<div>
			{/* <EventSearchForm values={searchValues} setFunctions={setSearchFunctions} />
			<button class="btn btn-primary" onClick={handleSearch}>Apply Search</button>
			<EventFilterForm values={filterValues} setFunctions={setFilterFunctions} /> */}
			<div style={{ height: 700, width: '100%' }}>
      	<DataGrid
					components={{
						Toolbar: GridToolbar,
					}}
  				filterModel={{
						items: [
							{ columnField: 'data', operatorValue: 'contains', value: '' },
						],
  				}}
      	  rows={gridableEvents}
      	  columns={columns}
      	  pageSize={25}
					onRowClick={(e) => console.log("row click event: ", e)}
      	/>
			</div>
			{/* <div id="event-list">
				{visibleEvents.map((event) => {
					return <Event key={event.event_id} event={event} />;
				})}
			</div> */}
		</div>
	);
}

export default EventSearch
