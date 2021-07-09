import React from "react";
import { useState } from "react";
import EventParser from "../lib/EventParser";

const Event = ({ eventData }) => {
	const [visible, setVisible] = useState(false);
	console.log(eventData.event_data)

	return (
		<ul class="list-group">
			<li class="list-group-item">
				<h4>Event</h4>
				{/* <div className="span-details">{spanId}</div> */}
				<div className="session-id">
					<strong>session id: </strong>
					{eventData.session_id}
				</div>
				<div className="user_id">
					<strong>user id: </strong>
					{eventData.user_id}
				</div>
				<div className="time-sent">
					<strong>time sent: </strong>
					{eventData.time_sent}
				</div>
				<div className="event-data" onClick={() => setVisible(!visible)}>
					<strong>event data: </strong>
						<ul class="list-group">
							<li class="list-group-item">
								<div>
									<strong>type: </strong>{EventParser(eventData.event_data).type}
								</div>
								<div>
									<strong>data: </strong>{JSON.stringify(eventData.event_data.data, null, 2)}
								</div>
								<div>
									<strong>timestamp: </strong>{eventData.event_data.timestamp}
								</div>
							</li>
						</ul>
				</div>
				<br></br>
			</li>
		</ul>
	);
};

export default Event;
