import React, { useState, useEffect } from 'react';
import Event from './Event';
import axios from 'axios';

const EventSearch = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let queryString = [];
		Object.entries(search).forEach((key, value) => {
			queryString.push(`${key}=${value}`)
		})
		let queryStringConcat = queryString.join("&")

    axios
      .get(`/api/eventSearch?${queryStringconcat}`)
      .then((response) => setEvents(response.data))
  }, [])

  return (
		<div>
			<div id="event-list">
				{events.map((event) => {
					return <Event key={event.event_id} data={event} />;
				})}
			</div>
		</div>
	);
}

export default EventSearch
