import React, { useState, useEffect } from "react";
import Span from "./Span";
import axios from "axios";

const SpanList = () => {
	const [spans, setSpans] = useState([]);

	useEffect(() => {
		axios.get("/api/spans").then((response) => {
			console.log("response: ", response.data);
			console.log("Response Data is an Array: ", Array.isArray(response.data));
			setSpans(spans.concat(response.data));
		});
	}, []);
	// const spans = axios
	// 	.get("/api/spans")
	// 	.then((response) => response.data)
	// 	.then((data) => data)
	// 	.catch((err) => console.error(err));

	console.log("span data in SpanList: ", spans);

	return (
		<div id="span-list">
			{spans.map((span, idx) => {
				return <Span key={idx} spanData={span} />;
			})}
		</div>
	);
};

export default SpanList;
