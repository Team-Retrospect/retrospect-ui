import React, { useState } from "react";
import TraceSpans from "./TraceSpans";

const Trace = ({ traceId, spans }) => {
	const [visibleTrace, setVisibleTrace] = useState(false);
	return (
		<div>
			<div>
				<h3>Spans for Trace: {traceId}</h3>
				<div onClick={() => setVisibleTrace(!visibleTrace)}>
					(click to expand/close trace)
				</div>
				{visibleTrace ? <TraceSpans data={spans} /> : ""}
			</div>
		</div>
	);
};

export default Trace;
