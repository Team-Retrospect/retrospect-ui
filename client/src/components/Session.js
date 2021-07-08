import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Traces from "./Traces";
import Events from "./Events";

const Session = () => {
	const [visibleTraces, setVisibleTraces] = useState(false);
	const [visibleEvents, setVisibleEvents] = useState(false);
	const params = useParams();
	const sessionId = params.id;

	const handleClick = () => {};

	return (
		<div>
			<div>
				<h2>Traces for Session: {sessionId}</h2>
				<div onClick={() => setVisibleTraces(!visibleTraces)}>
					(click to expand/close traces)
				</div>
				{visibleTraces ? (
					<Traces onClick={handleClick} sessionId={sessionId} />
				) : (
					""
				)}
			</div>
			<div>
				<div onClick={() => setVisibleEvents(!visibleEvents)}>
					(click to expand/close events)
				</div>
				{visibleEvents ? <Events sessionId={sessionId} /> : ""}
			</div>
		</div>
	);
};

export default Session;
