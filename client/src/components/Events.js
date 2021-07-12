import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Event from './Event';

const Events = ({ sessionId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`/api/events/${sessionId}`).then((response) => {
      setEvents(events.concat(response.data));
    });
  }, [sessionId]);

  if (!events) {
    return null;
  }

  console.log(events);
  return (
    <div>
      {events.map((event) => {
        {
          /* console.log("event: ", event) */
        }
        return <Event event={event} />;
      })}
    </div>
  );
};

export default Events;
