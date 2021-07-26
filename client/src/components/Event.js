import React from 'react';
import { useState } from 'react';
import EventParser from '../lib/EventParser';
import Moment from 'react-moment';
import 'moment-timezone';
const timezone = "America/Los_Angeles";

const Event = ({ event }) => {
  const [visible, setVisible] = useState(false);
  const eventData = EventParser(event.data);

  return (
    <ul className="list-group">
      <li className="list-group-item">
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
          <Moment format="MM/DD/YYYY hh:mm A z" tz={timezone}>{event.data.timestamp}</Moment>
        </div>
        <div className="event-data" onClick={() => setVisible(!visible)}>
          <strong>event data: </strong>
          <ul className="list-group">
            <li className="list-group-item">
              <div>
                <strong>type: </strong>
                {eventData.type}
              </div>
              {eventData.data ? (
                <div>
                  <strong>data: </strong>
                  <ul className="list-group">
                    <li className="list-group-item">
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
            </li>
          </ul>
        </div>
        <br></br>
      </li>
    </ul>
  );
};

export default Event;
