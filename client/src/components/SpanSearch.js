import React, { useState, useEffect } from 'react';
import Span from './Span';
import SpanSearchForm from './SpanSearchForm';
import SpanFilterForm from './SpanFilterForm';
import axios from 'axios';

const SpanSearch = () => {
	const [spans, setSpans] = useState([]);
	const [search, setSearch] = useState(false);
	const [filter, setFilter] = useState(false);
	const [traceId, setTraceId] = useState('');
	const [userId, setUserId] = useState('');
	const [sessionId, setSessionId] = useState('');
	const [chapterId, setChapterId] = useState('');
	const [statusCode, setStatusCode] = useState('');
	const [requestData, setRequestData] = useState('');

	const searchValues = {
		traceId, 
		userId, 
		sessionId, 
		chapterId, 
		statusCode, 
	}

	const filterValues = {
		requestData
	}

	const setSearchFunctions = {
		setTraceId, 
		setUserId, 
		setSessionId, 
		setChapterId, 
		setStatusCode, 
	}

	const setFilterFunctions = {
		setRequestData
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
		Object.entries(search).forEach(keyVal => {
			queryString.push(`${keyVal[0]}=${keyVal[1]}`)
		})
		let queryStringConcat = queryString.join("&")

		axios
			.get(`/api/span_search?${queryStringConcat}`)
      .then((response) => {
				setSpans(response.data)
			})
	}, [search]);

	useEffect(() => {
		let filter = {
			request_data: requestData
		}

		let filteredSpans = spans.filter(span => {
			let valid = false;
			Object.entries(filter).forEach(keyVal => {
				if (span[keyVal[0]].includes(keyVal[1])) {
					valid = true;
				}
			})
			return valid;
		})

		setSpans(filteredSpans)
	}, [filter]);

	const handleSearch = () => {
		setSearch(!search);
	}

	const handleFilter = () => {
		setFilter(!filter);
	}

	return (
		<div>
			<SpanSearchForm values={searchValues} setFunctions={setSearchFunctions} />
			<button class="btn btn-primary" onClick={handleSearch}>Apply Search</button>
			<SpanFilterForm values={filterValues} setFunctions={setFilterFunctions} />
			<button class="btn btn-primary" onClick={handleFilter}>Apply Filter</button>
			<div id="span-list">
				{spans.map((span) => {
					return <Span key={span.span_id} span={span} />;
				})}
			</div>
		</div>
	);
}

export default SpanSearch;