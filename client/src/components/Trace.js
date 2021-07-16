import React, { useState } from "react";
import Span from './Span';

// This is where the waterfall code should go

const Trace = ({ traceId, spans }) => {
	const [visibleTrace, setVisibleTrace] = useState(false);

	return (
		<div>
			<div>
				<h3>Trace: {traceId}</h3>
				<div onClick={() => setVisibleTrace(!visibleTrace)}>
					(click to expand/close trace)
				</div>
				{visibleTrace ? 
					spans.map((span) => {
						return <Span key={span.span_id} span={span} />
					})
				: ""}
			</div>
		</div>
	);
};

export default Trace;
