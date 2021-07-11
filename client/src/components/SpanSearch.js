import React, { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";
import SpanSearchBar from './SpanSearchBar';
import Span from './Span';
import axios from 'axios';
import * as JsSearch from 'js-search';

const SpanSearch = () => {
	const [spans, setSpans] = useState([]);
	// const params = useParams();
	// const search = params.search.toLowerCase();
	const { search } = window.location;
	const query = new URLSearchParams(search).get('s');
	const [searchQuery, setSearchQuery] = useState(query || '');

	console.log("SpanSearch component loaded")

	const filter = new JsSearch.Search('span_id');
	filter.addIndex('trace_id');
	filter.addIndex('user_id');
	filter.addIndex('session_id');
	filter.addIndex('chapter_id');
	filter.addIndex('request_data');
	filter.addIndex('status_code');
	filter.addIndex('trigger_route');
	filter.addIndex(['data', 'http.url']);
	filter.addIndex(['data', 'service.name']);

	const filterSpans = (spans, query) => {
		if (!query) {
			return spans;
		}

		filter.addDocuments(spans);
		return filter.search(query);
	}

	useEffect(() => {
		axios.get("/api/spans").then((response) => {
			console.log("spans fetched")
			setSpans(filterSpans(response.data, searchQuery));
		});
	}, [searchQuery]);

	console.log("span data in SpanList: ", spans);

	return (
		<div>
			<SpanSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<div id="span-list">
				<h2>Spans:</h2>
				{/* <h2>Search by trace id, user id, session id, chapter id, request data, response status code, trigger route, service name, or targeted url:</h2> */}
				<h3>Search by trace, user, session, or chapter id</h3>
				<h3>Search by request data, response status code, trigger route, service name, or requested url</h3>
				{spans.map((span) => {
					return <Span key={span.span_id} spanData={span} />;
				})}
			</div>
		</div>
	);
}

export default SpanSearch;