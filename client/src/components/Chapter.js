import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Trace from './Trace';
import Events from './Events';

const Chapter = ({ id }) => {
  const [events, setEvents] = useState([]);
  const [spans, setSpans] = useState([]);
  const [traceId, setTraceId] = useState("");
  const [visibleChapter, setVisibleChapter] = useState(false);
  const params = useParams();
  // const url = window.location.href.split("/")[3];

	useEffect(() => {
    // if (url === "chapter") {
    if (!id) {
      id = params.id;
    }
		axios.get(`/api/events_by_chapter/${id}`).then((response) => {
			setEvents(response.data);
		});
    
    axios.get(`/api/spans_by_chapter/${id}`)
      .then((response) => {
        const spans = response.data;
        spans.sort((a, b) => a.time_sent - b.time_sent)
        // console.log("spans[0].trace_id: ", spans[0].trace_id)
        let traceId;
        if (spans.length > 0) {
          traceId = spans[0].trace_id;
        } else {
          traceId = "No spans available"
        }
        setTraceId(traceId)
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
