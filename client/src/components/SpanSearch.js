import React, { useState, useEffect } from 'react';
import Span from './Span';
import SpanSearchForm from './SpanSearchForm';
import axios from 'axios';

const SpanSearch = () => {
	const [spans, setSpans] = useState([]);
	const [search, setSearch] = useState(false);
	const [traceId, setTraceId] = useState('');
	const [userId, setUserId] = useState('');
	const [sessionId, setSessionId] = useState('');
	const [chapterId, setChapterId] = useState('');
	const [statusCode, setStatusCode] = useState('');

	const values = {
		traceId, 
		userId, 
		sessionId, 
		chapterId, 
		statusCode, 
	}

	const setFunctions = {
		setTraceId, 
		setUserId, 
		setSessionId, 
		setChapterId, 
		setStatusCode, 
	}

	useEffect(() => {
		let search = {
			trace_id: traceId,
			user_id: userId,
			session_id: sessionId,
			chapter_id: chapterId,
			status_code: statusCode,
		}

		let queryString = [];
		Object.entries(search).forEach((keyVal, _) => {
			queryString.push(`${keyVal[0]}=${keyVal[1]}`)
		})
		let queryStringConcat = queryString.join("&")

		axios
			.get(`/api/span_search?${queryStringConcat}`)
      .then((response) => {
				setSpans(response.data)
			})
	}, [search]);

	const handleSearch = () => {
		setSearch(!search);
	}

	return (
		<div>
			<SpanSearchForm values={values} setFunctions={setFunctions} />
			<button class="btn btn-primary" onClick={handleSearch}>Apply Search</button>
			<div id="span-list">
				{spans.map((span) => {
					return <Span key={span.span_id} span={span} />;
				})}
			</div>
		</div>
	);
}

export default SpanSearch;