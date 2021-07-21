import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
	container: {
		display: 'flex'
	}
})

// ERROR STATS: count spans with 400 & 500 codes, count events with console error



// Percentage of Traces/Events are Errors (contain 400+, console error)
// Service Names? (wish list item) - server names, db names



const Home = () => {
  const [spans, setSpans] = useState([]);
  const [events, setEvents] = useState([]);
  const [spansWithErrors, setSpansWithErrors] = useState([]);
  const [eventsWithErrors, setEventsWithErrors] = useState([]);

  useEffect(() => {
    axios
			.get(`/api/spans`)
      .then((response) => {
          setSpans(response.data)
				})

    axios
    .get(`/api/events`)
      .then((response) => {
				setEvents(response.data);
				})
  }, [])

  let clientSideSpanErrors = spans.filter(span => {
    return span.status_code >= 400 & span.status_code <= 499;
  })

  let serverSideSpanErrors = spans.filter(span => {
    return span.status_code >= 500;
  })

  let allSpanErrors = spans.filter(span => {
    return span.status_code >= 400;
  })

  let frontendErrors = events.filter(event => {
    return event.data.data.level === "error";
  })

  let spanErrorRatio = Math.round((allSpanErrors.length / spans.length) * 100);

  let eventErrorRatio = Math.round((frontendErrors.length / events.length) * 100)

  let serviceNames = spans.map(span => {
    return span.data["service.name"];
  })

  let uniqueServiceNames = Array.from(new Set(serviceNames))

  let dbSpans = spans.filter(span => {
      return span.data["db.system"]
  })

  let dbNames = [];

  dbSpans = dbSpans.forEach(span => {
    dbNames.push(span.data["db.system"]);
  })

  let unqiueDbNames = Array.from(new Set(dbNames));

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>Homepage (WIP)</h1>
    </div>
  );
};

export default Home;
