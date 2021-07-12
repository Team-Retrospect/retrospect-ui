import React, { useState, useEffect } from "react";
import Trace from "./Trace";
import axios from "axios";

const Traces = ({ sessionId }) => {
	const [traces, setTraces] = useState({});

	const orderSpansByTrace = (spans) => {
		return spans.reduce((acc, val) => {
			const traceId = val.trace_id;
			if (!acc[traceId]) {
				acc[traceId] = [val];
			} else {
				acc[traceId].push(val);
			}
			return acc;
		}, {});
	};

	useEffect(() => {
		axios.get(`/api/session/${sessionId}`).then((response) => {
			const traceHash = orderSpansByTrace(response.data);
			setTraces(traceHash);
		});
	}, [sessionId]);

	if (!traces) {
		return null;
	}

	const handleClick = () => {};

	return (
		<div>
			{Object.keys(traces).map((traceId) => {
				return (
					<Trace
						key={traceId}
						traceId={traceId}
						spans={traces[traceId]}
						onClick={handleClick}
					/>
				);
			})}
		</div>
	);
};

export default Traces;
