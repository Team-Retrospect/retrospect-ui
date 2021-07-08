import React from "react";
import { useState } from "react";

const Span = ({ spanData }) => {
	const [visible, setVisible] = useState(false);
	return (
		<ul class="list-group">
			<li class="list-group-item">
				<h4>Span</h4>
				{/* <div className="span-details">{spanId}</div> */}
				<div className="session-id">
					<strong>session id: </strong>
					{spanData.session_id}
				</div>
				<div className="span-id">
					<strong>span id: </strong>
					{spanData.span_id}
				</div>
				<div className="status-code">
					<strong>status code: </strong>
					{spanData.status_code}
				</div>
				<div className="time-sent">
					<strong>time sent: </strong>
					{spanData.time_sent}
				</div>
				<div className="trace-id">
					<strong>trace id: </strong>
					{spanData.trace_id}
				</div>
				<div className="trigger-route">
					<strong>trigger route: </strong>
					{spanData.trigger_route}
				</div>
				<div className="user-id">
					<strong>user id: </strong>
					{spanData.user_id}
				</div>
				<div className="tags" onClick={() => setVisible(!visible)}>
					<strong>span tags</strong> (click to expand/close):
					{visible ? (
						<div style={{ border: "2px solid gray" }}>
							{spanData.span_data
								? Object.keys(spanData.span_data).map((key) => {
										return (
											<div>
												{key}: {spanData.span_data[key]}
											</div>
										);
								  })
								: "Empty"}
						</div>
					) : (
						<div></div>
					)}
				</div>
				<br></br>
			</li>
		</ul>
	);
};

export default Span;
