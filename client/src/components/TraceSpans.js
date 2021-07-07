import React from "react";
import Span from "./Span";

const TraceSpans = ({ spans }) => {
	return (
		<div>
			{spans.map((span) => {
				return <Span key={span.span_id} spanData={span} />;
			})}
		</div>
	);
};

export default TraceSpans;
