import React, { useState, useEffect } from 'react';
import Span from './Span';
import SpanSearchForm from './SpanSearchForm';
import SpanFilterForm from './SpanFilterForm';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';


const SpanSearch = () => {
	const [spans, setSpans] = useState([]);
	const [visibleSpans, setVisibleSpans] = useState([]);
	const [gridableSpans, setGridableSpans] = useState([]);
	const [search, setSearch] = useState(false);
	const [traceId, setTraceId] = useState('');
	const [userId, setUserId] = useState('');
	const [sessionId, setSessionId] = useState('');
	const [chapterId, setChapterId] = useState('');
	const [statusCode, setStatusCode] = useState('');
	const [requestData, setRequestData] = useState('');
	const [serviceName, setServiceName] = useState('');

	const searchValues = {
		traceId, 
		userId, 
		sessionId, 
		chapterId, 
		statusCode, 
	}

	const filterValues = {
		requestData,
		// serviceName,
	}

	const setSearchFunctions = {
		setTraceId, 
		setUserId, 
		setSessionId, 
		setChapterId, 
		setStatusCode, 
	}

	const setFilterFunctions = {
		setRequestData,
		// setServiceName,
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
				setVisibleSpans(response.data)
				const gridSpans = response.data.map(span => {
					const { span_id, request_data, status_code, trigger_route } = span;
					return { id: span_id, request_data, status_code, trigger_route };
				})
				setGridableSpans(gridSpans)
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

		setVisibleSpans(filteredSpans)
		const gridSpans = filteredSpans.map(span => {
			const { span_id, trace_id, chapter_id, session_id, request_data, status_code, trigger_route } = span;
			return { id: span_id, trace_id, chapter_id, session_id, request_data, status_code, trigger_route };
		})
		setGridableSpans(gridSpans)
	}, [requestData]);

	const handleSearch = () => {
		setSearch(!search);
	}

	const columns = [
		{field: 'id', headerName: 'Span Id', width: 200},
		{field: 'request_data', headerName: 'Request Data', width: 200},
		{field: 'status_code', headerName: 'Status Code', width: 175},
		{field: 'trigger_route', headerName: 'Trigger Route', width: 300},
	];

	return (
		<div>
			{/* <SpanSearchForm values={searchValues} setFunctions={setSearchFunctions} />
			<button class="btn btn-primary" onClick={handleSearch}>Apply Search</button>
			<SpanFilterForm values={filterValues} setFunctions={setFilterFunctions} /> */}
			<div style={{ height: 700, width: '100%' }}>
      	<DataGrid
					components={{
						Toolbar: GridToolbar,
					}}
      	  rows={gridableSpans}
      	  columns={columns}
      	  pageSize={25}
					onRowClick={(e) => console.log("row click event: ", e)}
  				filterModel={{
						items: [
							{ columnField: 'request_data', operatorValue: 'contains', value: '' },
						],
  				}}
      	/>
			</div>
			{/* <div id="span-list">
				{visibleSpans.map((span) => {
					return <Span key={span.span_id} span={span} />;
				})}
			</div> */}
		</div>
	);
}

export default SpanSearch;