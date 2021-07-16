import React, { useState, useEffect } from 'react';
import EventSearchForm from './EventSearchForm';
import EventFilterForm from './EventFilterForm';
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
	const [eventType, setEventType] = useState('6');
	const [incrementalSnapshot, setIncrementalSnapshot] = useState('13');
	const [mouseInteraction, setMouseInteraction] = useState('10');

	const searchValues = { userId, sessionId, chapterId };
	const setSearchFunctions = { setUserId, setSessionId, setChapterId };
	const filterValues = { eventType, incrementalSnapshot, mouseInteraction };
	const setFilterFunctions = { setEventType, setIncrementalSnapshot, setMouseInteraction };

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
	}, [incrementalSnapshot])

	useEffect(() => {
		let filteredEvents = events.filter(event => {
			if (eventType === '10') { return true }
			return event.data.data.type === parseInt(mouseInteraction)
		})

		setVisibleEvents(filteredEvents)
	}, [mouseInteraction])

	const handleSearch = () => {
		setSearch(!search);
	}

  return (
		<div>
			<EventSearchForm values={searchValues} setFunctions={setSearchFunctions} />
			<button class="btn btn-primary" onClick={handleSearch}>Apply Search</button>
			<EventFilterForm filterValues={filterValues} setFilterFunctions={setFilterFunctions} />
			<div id="event-list">
				{visibleEvents.map((event) => {
					return <Event key={event.event_id} event={event} />;
				})}
			</div>
		</div>
	);
}

export default EventSearch
