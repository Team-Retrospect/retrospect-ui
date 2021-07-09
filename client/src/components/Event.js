import React from 'react';
import { useState } from 'react';
import EventParser from '../lib/EventParser';

const Event = ({ event }) => {
  const [visible, setVisible] = useState(false);
  const eventData = EventParser(event.event_data);

  return (
    <ul class="list-group">
      <li class="list-group-item">
        <h4>Event</h4>
        <div className="session-id">
          <strong>session id: </strong>
          {event.session_id}
        </div>
        <div className="user_id">
          <strong>user id: </strong>
          {event.user_id}
        </div>
        <div className="time-sent">
          <strong>time sent: </strong>
          {event.time_sent}
        </div>
        <div className="event-data" onClick={() => setVisible(!visible)}>
          <strong>event data: </strong>
          <ul class="list-group">
            <li class="list-group-item">
              <div>
                <strong>type: </strong>
                {eventData.type}
              </div>
              <div>
                <strong>data: </strong>
                {JSON.stringify(event.event_data.data, null, 2)}
              </div>
              <div>
                <strong>timestamp: </strong>
                {event.event_data.timestamp}
              </div>
            </li>
          </ul>
        </div>
        <br></br>
      </li>
    </ul>
  );
};

export default Event;
