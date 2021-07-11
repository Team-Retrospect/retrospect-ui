import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "./Event";

const Events = ({ sessionId }) => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		axios.get(`/api/events/${sessionId}`).then((response) => {
			console.log("response: ", response.data);
			setEvents(events.concat(response.data));
		});
	}, [sessionId]);

	if (!events) {
		return null;
	}

	return (
		<div>
			{events.map((event) => {
				return <Event eventData={event} />
			})}
		</div>
	);
};

export default Events;
