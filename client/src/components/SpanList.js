import React, { useState, useEffect } from "react";
import Span from "./Span";
import axios from "axios";

// This is where you render a waterfall

const SpanList = ({ data }) => {
	const [spans, setSpans] = useState([]);

	useEffect(() => {
		axios.get("/api/spans").then((response) => {
			setSpans(spans.concat(response.data));
		});
	}, []);

	return (
		<div id="span-list">
			<h1>All Spans</h1>
			{spans.map((span) => {
				return <Span key={span.span_id} spanData={span} />;
			})}
		</div>
	);
};

export default SpanList;
