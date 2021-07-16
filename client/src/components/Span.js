import React from "react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Span = ({ span }) => {
	const [visible, setVisible] = useState(false);
	const history = useHistory();

	const onChapterClick = (e) => {
		history.push(`/chapter/${span.chapter_id}`);
		e.preventDefault();
	}

	const onSessionClick = (e) => {
		history.push(`/session/${span.session_id}`);
		e.preventDefault();
	}

	return (
		<ul className="list-group">
			<li className="list-group-item">
				<h4>Span</h4>
				<div className="span-id">
					<strong>span id: </strong>
					{span.span_id}
				</div>
				<div className="trace-id">
					<strong>trace id: </strong>
					{span.trace_id}
				</div>
				<div className="chapter-id">
					<strong>chapter id: </strong>
					<a onClick={onChapterClick} href="/">{span.chapter_id}</a>
				</div>
				<div className="session-id">
					<strong>session id: </strong>
					<a onClick={onSessionClick} href="/">{span.session_id}</a>
				</div>
				<div className="user-id">
					<strong>user id: </strong>
					{span.user_id}
				</div>
				<div className="status-code">
					<strong>status code: </strong>
					{span.status_code}
				</div>
				<div className="time-sent">
					<strong>time sent: </strong>
					{span.time_sent}
				</div>
				<div className="trigger-route">
					<strong>trigger route: </strong>
					{span.trigger_route}
				</div>
				<div className="user-id">
					<strong>request data: </strong>
					{span.request_data}
				</div>
				<div className="tags" >
					<div><strong>span tags: </strong></div>
					<ul className="list-group">
						<li className="list-group-item">
						{span.data
							? Object.keys(span.data).map((key) => {
									return (
										<div>
											<strong>{key}: </strong>{span.data[key]}
										</div>
									);
								})
							: "Empty"}
						</li>
					</ul>
				</div>
				<br></br>
			</li>
		</ul>
	);
};

export default Span;
