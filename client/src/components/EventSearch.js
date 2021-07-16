import React, { useState, useEffect } from 'react';
import EventSearchForm from './EventSearchForm';
// import EventFilterForm from './EventFilterForm';
import Event from './Event';
import axios from 'axios';

const EventSearch = () => {
  const [events, setEvents] = useState([]);
	const [visibleEvents, setVisibleEvents] = useState([]);
	const [search, setSearch] = useState(false);
	const [filter, setFilter] = useState(false);
	const [userId, setUserId] = useState('');
	const [sessionId, setSessionId] = useState('');
	const [chapterId, setChapterId] = useState('');
	const [eventType, setEventType] = useState('')

	const searchValues = { userId, sessionId, chapterId };

	const filterValues = { eventType }

	const setSearchFunctions = { setUserId, setSessionId, setChapterId };

	const setFilterFunctions = { setEventType }

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
			})
  }, [search]);

	useEffect(() => {
		let filter = {
			'type': eventType
		}

		let filteredEvents = events.filter(event => {
			console.log('event', event)
			// let valid = false;
			// Object.entries(filter).forEach(keyVal => {
			// 	let filteredParams = keyVal[0].split('|')
			// 	if (filteredParams.length == 1) {

			// 	}
			// 	let [ key, value ] = keyVal
			// 	console.log(event.data)
			// 	if (event.data.data[key].includes(value)) {
			// 		valid = true;
			// 	}
			// })
			// return valid;
		})
	})

	const handleSearch = () => {
		setSearch(!search);
	}

	const handleFilter = () => {
		setFilter(!filter);
	}

  return (
		<div>
			<EventSearchForm values={searchValues} setFunctions={setSearchFunctions} />
			<button class="btn btn-primary" onClick={handleSearch}>Apply Search</button>
			{/* <EventFilterForm values={filterValues} setFunctions={setFilterFunctions} /> */}
			{/* <button class="btn btn-primary" onClick={handleFilter}>Apply Filter</button> */}
			<div id="event-list">
				{visibleEvents.map((event) => {
					return <Event key={event.event_id} event={event} />;
				})}
			</div>
		</div>
	);
}

export default EventSearch
