import React from "react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Span = ({ spanData }) => {
	const [visible, setVisible] = useState(false);
	const history = useHistory();

	const onChapterClick = (e) => {
		history.push(`/chapter/${spanData.chapter_id}`);
		e.preventDefault();
	}

	const onSessionClick = (e) => {
		history.push(`/session/${spanData.session_id}`);
		e.preventDefault();
	}

	return (
		<ul class="list-group">
			<li class="list-group-item">
				<h4>Span</h4>
				<div className="span-id">
					<strong>span id: </strong>
					{spanData.span_id}
				</div>
				<div className="trace-id">
					<strong>trace id: </strong>
					{spanData.trace_id}
				</div>
				<div className="chapter-id">
					<strong>chapter id: </strong>
					<a onClick={onChapterClick} href="#">{spanData.chapter_id}</a>
				</div>
				<div className="session-id">
					<strong>session id: </strong>
					<a onClick={onSessionClick} href="#">{spanData.session_id}</a>
				</div>
				<div className="user-id">
					<strong>user id: </strong>
					{spanData.user_id}
				</div>
				<div className="status-code">
					<strong>status code: </strong>
					{spanData.status_code}
				</div>
				<div className="time-sent">
					<strong>time sent: </strong>
					{spanData.time_sent}
				</div>
				<div className="trigger-route">
					<strong>trigger route: </strong>
					{spanData.trigger_route}
				</div>
				<div className="user-id">
					<strong>request data: </strong>
					{spanData.request_data}
				</div>
				<div className="tags" >
					<div onClick={() => setVisible(!visible)}><strong>span tags</strong> (click to expand/close):</div>
					{visible ? (
						<ul class="list-group">
							<li class="list-group-item">
							{spanData.data
								? Object.keys(spanData.data).map((key) => {
										return (
											<div>
												<strong>{key}: </strong>{spanData.data[key]}
											</div>
										);
								  })
								: "Empty"}
							</li>
						</ul>
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
