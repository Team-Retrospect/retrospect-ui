import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Span from "./Span";
import axios from "axios";
import Event from "./Event";

const Events = ({ sessionId }) => {
	const [events, setEvents] = useState([]);
  const params = useParams();

	useEffect(() => {
		axios.get(`/api/events/${sessionId}`).then((response) => {
			setEvents(events.concat(response.data));
		});
	}, []);

	if (!events) {
		return null;
	}

	console.log(events);
	return (
		<div>
			{events.map((event) => {
				{/* console.log("event: ", event) */}
				return <Event event={event} />
			})}
		</div>
	);
};

export default Events;
