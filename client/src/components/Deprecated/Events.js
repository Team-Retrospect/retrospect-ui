import React, { useState } from "react";
import Event from "./Event";

const Events = ({ events }) => {
  const [visibleEvents, setVisibleEvents] = useState(false);

	return (
		<div id="event-list">
      <h3>Events:</h3>
				<div onClick={() => setVisibleEvents(!visibleEvents)}>
					(click to expand/close events)
				</div>
      {visibleEvents
        ? events.map((event) => {
          return <Event key={event._id} event={event} />;
        })
        : ''}
		</div>
	);
};

export default Events;