import React from "react";
import Traces from "./Traces";
import Events from "./Events";

const Session = () => {
	// get the session id
	let sessionId;
	const handleClick = () => {};
	return (
		<div>
			<Traces onClick={handleClick} sessionId={sessionId} />
			<Events sessionId={sessionId} />
		</div>
	);
};

export default Session;
