import React from "react";
import TraceSpans from "./SpanList";

const Trace = ({ traceId }) => {
	let spans;

	return (
		<div>
			<TraceSpans data={spans} />
		</div>
	);
};

export default Trace;
