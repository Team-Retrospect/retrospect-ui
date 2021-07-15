import React, { useState } from "react";
// import TraceSpans from "./TraceSpans";
import Span from './Span';

const Trace = ({ traceId, spans }) => {
	const [visibleTrace, setVisibleTrace] = useState(false);
	return (
		<div>
			<div>
				<h3>Trace: {traceId}</h3>
				<div onClick={() => setVisibleTrace(!visibleTrace)}>
					(click to expand/close trace)
				</div>
				{/* {visibleTrace ? <TraceSpans data={spans} /> : ""} */}
				{spans.map((span) => {
					return <h4>{span}</h4>
					{/* return <Span key={span.span_id} spanData={span} />; */}
				})}
			</div>
		</div>
	);
};

export default Trace;
