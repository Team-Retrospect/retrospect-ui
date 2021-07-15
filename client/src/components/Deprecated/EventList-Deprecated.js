import React, { useState, useEffect } from "react";
import Event from "../Event";
import axios from "axios";

// This is where you render a waterfall

const EventList = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		axios.get("/api/events").then((response) => {
			setEvents(events.concat(response.data));
		});
	}, []);

	if (!events) {
		return null;
	}

	return (
		<div id="span-list">
			<h1>All Events</h1>
			{events.map((event) => {
				return <Event key={event._id} event={event} />;
			})}
		</div>
	);
};

export default EventList;