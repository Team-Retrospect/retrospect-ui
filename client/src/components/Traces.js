import React from "react";
import Trace from "./Trace";

const Traces = ({ sessionId }) => {
	let traceIds;
	const handleClick = () => {};

	return (
		<div>
			{traceIds.map((traceId) => {
				<Trace traceId={traceId} onClick={handleClick} />;
			})}
		</div>
	);
};

export default Traces;
