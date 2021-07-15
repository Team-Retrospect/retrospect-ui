import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Trace from './Trace';
import Events from './Events';

const Chapter = ({ id }) => {
  const [events, setEvents] = useState([]);
  const [spans, setSpans] = useState([]);
  const [traceId, setTraceId] = useState("");
  const [visibleChapter, setVisibleChapter] = useState(false);

	useEffect(() => {
    // replace with events_by_chapter/{id}
		axios.get(`/api/events_by_chapter/${id}`).then((response) => {
      // const relEvents = response.data.filter((event) => event.chapter_id === chapterId)
      console.log("response.data: ", response.data)
			setEvents(response.data);
		});
    
    // // add a trace_id_by_chapter/{id}
		// axios.get(`/api/trace_id/${chapterId}`).then((response) => {
    //   traceId = response.data;
		// });

    // replace with spans_by_chapter/{id}
    axios.get(`/api/spans_by_chapter/${id}`).then((response) => {
      const spans = response.data;
      spans.sort((a, b) => a.time_sent - b.time_sent)
      setTraceId(spans[0].trace_id)
      setSpans(spans)
    })
	}, [id]);

  if (!events || !spans) {
    return null;
  }

  return (
    <div>
      <h4>Chapter: {id}</h4>
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
