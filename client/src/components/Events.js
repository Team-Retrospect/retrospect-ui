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
			console.log("response: ", response.data);
			setEvents(events.concat(response.data));
		});
	}, []);

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
