import React, { useState, useEffect } from "react";
import Span from "./Span";
import axios from "axios";

const SpanList = () => {
	const [spans, setSpans] = useState([]);

	useEffect(() => {
		axios.get("/api/spans").then((response) => {
			console.log("response: ", response.data);
			setSpans(spans.concat(response.data));
		});
	}, []);

	console.log("span data in SpanList: ", spans);

	return (
		<div id="span-list">
			{spans.map((span) => {
				return <Span key={span.span_id} spanData={span} />;
			})}
		</div>
	);
};

export default SpanList;
