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
        <div className="chapter-id">
          <strong>chapter id: </strong>
          {event.chapter_id}
        </div>
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
              {event.event_data.data ? (
                <div>
                  <strong>data: </strong>
                  <ul class="list-group">
                    <li class="list-group-item">
                      {eventData.data
                        ? Object.keys(eventData.data).map((key) => {
                            return (
                              <div>
                                <strong>{key}: </strong>
                                {JSON.stringify(eventData.data[key])}
                              </div>
                            );
                          })
                        : ''}
                    </li>
                  </ul>
                </div>
              ) : (
                ''
              )}
              <div>
                <strong>timestamp: </strong>
                {eventData.timestamp}
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
