import React, { useState, useEffect } from 'react';
import EventSearchForm from './EventSearchForm';
import Event from './Event';
import axios from 'axios';

const EventSearch = () => {
  const [events, setEvents] = useState([]);
	const [search, setSearch] = useState(false);
	const [userId, setUserId] = useState('');
	const [sessionId, setSessionId] = useState('');
	const [chapterId, setChapterId] = useState('');

	const values = { userId, sessionId, chapterId };

	const setFunctions = { setUserId, setSessionId, setChapterId };

  useEffect(() => {
    let queryString = [];
		Object.entries(search).forEach((key, value) => {
			queryString.push(`${key}=${value}`)
		})
		let queryStringConcat = queryString.join("&")

    axios
      .get(`/api/event_search?${queryStringConcat}`)
      .then((response) => setEvents(response.data))
  }, [search])

	const handleSearch = () => {
		setSearch(!search);
	}

  return (
		<div>
			<EventSearchForm values={values} setFunctions={setFunctions} />
			<button class="btn btn-primary" onClick={handleSearch}>Apply Search</button>
			<div id="event-list">
				{events.map((event) => {
					return <Event key={event.event_id} event={event} />;
				})}
			</div>
		</div>
	);
}

export default EventSearch
