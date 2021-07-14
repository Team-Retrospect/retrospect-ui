import React, { useState, useEffect } from 'react';
import Span from './Span';
import axios from 'axios';

const SpanSearch = () => {
	const [spans, setSpans] = useState([]);

	useEffect(() => {
		let search = {
			trace_id: '49925f0ba546eec93d4dfda392664414',
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
	}, []);

	return (
		<div>
			<div id="span-list">
				{spans.map((span) => {
					return <Span key={span.span_id} span={span} />;
				})}
			</div>
		</div>
	);
}

export default SpanSearch;