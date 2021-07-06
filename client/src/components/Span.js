import React from "react";

const Span = ({ spanData }) => {
	return (
		<div className="span">
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
			<br></br>
		</div>
	);
};

export default Span;
