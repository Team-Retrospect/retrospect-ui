import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Span from './Span';
import axios from 'axios';

const SpanSearch = () => {
	const [spans, setSpans] = useState([]);
	const params = useParams();
	const search = params.search.toLowerCase();

	useEffect(() => {
		axios.get("/api/spans").then((response) => {
      const releSpans = response.data.filter(span => {
        const requestData = span.request_data.toLowerCase().includes(search);
        const triggerRoute = span.trigger_route.toLowerCase().includes(search);
        const statusCode = span.status_code === parseInt(search, 10);
        return requestData || triggerRoute || statusCode;
      })
			setSpans(spans.concat(releSpans));
		});
	}, []);

	console.log("span data in SpanList: ", spans);

	return (
		<div id="span-list">
			<h1>All Spans</h1>
			{/* {data.map((span) => { */}
			{spans.map((span) => {
				return <Span key={span.span_id} spanData={span} />;
			})}
		</div>
	);
}

export default SpanSearch;