import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Event from "./Event";
import Trace from "./Trace";

const TraceAndEvents = () => {
  const [events, setEvents] = useState([])
  const [spans, setSpans] = useState([])
	const params = useParams();
	const traceId = params.id;

  // get spans associated with the traceId
  // get the chapterId associated with the traceId
  // get events associated with the chapterId
  //   sort the events by time

  return (
    <div>
      <h1>Trace: {traceId}</h1>
      <Trace traceId={traceId} spans={spans}/>
		  <div>
        <h2>Preceding Events</h2>
		  	{events.map((event) => {
		  		return <Event eventData={event} />
		  	})}
		  </div>
    </div>
  )
}

export default TraceAndEvents;