import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Event from "./Event";
import Trace from "./Trace";

const Chapter = () => {
  const [events, setEvents] = useState([])
  const [spans, setSpans] = useState([])
	const [visibleEvents, setVisibleEvents] = useState(false);
	const params = useParams();
	const chapterId = params.id;

  // get the traceId associated with this chapterId
  // get all spans, filter for the ones with this chapterId
  // get the traceId
  let traceId;

  // get spans associated with the traceId (should be the same as the chapterId)

  // get events associated with the chapterId
  // get all events
  // filter for events with this chapterId
  // sort by time

	useEffect(() => {
		axios.get(`/api/events/`).then((response) => {
      const relEvents = response.data.filter((event) => event.chapter_id === chapterId)
			setEvents(relEvents);
		});

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
      <h1>Chapter: {chapterId}</h1>
      <br></br>
      <h2>Trace for this chapter</h2>
      <Trace traceId={traceId} spans={spans}/>
      <br></br>
      <h2>Events for this chapter</h2>
      <br></br>
		  <div onClick={() => setVisibleEvents(!visibleEvents)}>
		  	(click to expand/close events)
		  </div>
      {visibleEvents ? events.map((event) => {
		    	return <Event eventData={event} />
		    }) : ""}
    </div>
  )
}

export default Chapter;