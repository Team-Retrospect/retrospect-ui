import React from "react";
import { useState } from "react";

const Span = ({ spanData }) => {
	const [visible, setVisible] = useState(false);
	return (
		<ul class="list-group">
      <li class="list-group-item">
				<h2>Span</h2>
				{/* <div className="span-details">{spanId}</div> */}
				<div className="session-id">session id: {spanData.session_id}</div>
				<div className="span-id">span id: {spanData.span_id}</div>
				<div className="status-code">status code: {spanData.status_code}</div>
				<div className="time-sent">time sent: {spanData.time_sent}</div>
				<div className="trace-id">trace id: {spanData.trace_id}</div>
				<div className="trigger-route">
					trigger route: {spanData.trigger_route}
				</div>
				<div className="user-id">user id: {spanData.user_id}</div>
				<div className="tags" onClick={() => setVisible(!visible)} >span tags (click to expand/close):
					{visible ?
						<div style={{ border: '2px solid gray' }}>
							{
								spanData.span_data ? Object.keys(spanData.span_data).map((key) => {
									return <div >{key}: {spanData.span_data[key]}</div>
								}) : "Empty"
							}
						</div>
						: <div></div>
					}

				</div>
				<br></br>
			</li>
  	</ul>
	);
};

export default Span;
