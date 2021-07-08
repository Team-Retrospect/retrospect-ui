import React, { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";

// This is where you render a waterfall

const EventList = ({ data }) => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		axios.get("/api/events").then((response) => {
			console.log("response: ", response.data);
			setEvents(events.concat(response.data));
		});
	}, []);

	console.log("span data in EventList: ", events);

	return (
		<div id="span-list">
			<h1>All Events</h1>
			{/* {data.map((span) => { */}
			{events.map((event) => {
				return <Event key={event._id} eventData={event} />;
			})}
		</div>
	);
};

export default EventList;