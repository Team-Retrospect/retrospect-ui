import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Span from "./Span";
import axios from "axios";

const SessionSpans = () => {
  const [spans, setSpans] = useState([]);
  const params = useParams();

	useEffect(() => {
		axios.get(`/api/session/${params.id}`).then((response) => {
			console.log("response: ", response.data);
			setSpans(spans.concat(response.data));
		});
	}, []);

  if (!spans) {
    return null;
  }

  return (
    <div id="span-list">
      <h1>Spans with Session ID {params.id}</h1>
			{spans.map((span) => {
				return <Span key={span.span_id} spanData={span} />;
			})}
		</div>
  );
};

export default SessionSpans;
