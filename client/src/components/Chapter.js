import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Event from './Event';
import Trace from './Trace';
import Events from './Events';

const Chapter = ({ id }) => {
  const [events, setEvents] = useState([]);
  const [spans, setSpans] = useState([]);
  // Should be moved inside an "Events" component
  // const [visibleEvents, setVisibleEvents] = useState(false);
  const [visibleChapter, setVisibleChapter] = useState(false);
  const chapterId = id;

  let traceId;

	useEffect(() => {
    // replace with events_by_chapter/{id}
		axios.get(`/api/events/`).then((response) => {
      const relEvents = response.data.filter((event) => event.chapter_id === chapterId)
			setEvents(relEvents);
		});
    
    // add a trace_id_by_chapter/{id}
		axios.get(`/api/trace_id/${chapterId}`).then((response) => {
      traceId = response.data;
		});

    // replace with spans_by_chapter/{id}
    axios.get('/api/spans').then((response) => {
      const releSpans = response.data.filter((span) => span.chapter_id === chapterId)
      releSpans.sort((a, b) => a.time_sent - b.time_sent)
      setSpans(releSpans)
    })
	}, [chapterId]);

  if (!events || !spans) {
    return null;
  }

  return (
    <div>
      <h4>Chapter: {chapterId}</h4>
      <div onClick={() => setVisibleChapter(!visibleChapter)}>
        (click to expand/close chapter)
      </div>
      <br></br>
      {visibleChapter
        ? (
          <div>
            <Trace traceId={traceId} spans={spans} />
            <Events events={events} />
          </div>
          )
        : ''}
    </div>
  );
};

export default Chapter;
