import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Trace from "./Trace";

const TriggerTraces = () => {
	const [traces, setTraces] = useState({});
	const params = useParams();
	const trigger = decodeURIComponent(params.id);

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
		axios.get(`/api/trigger/${params.id}`).then((response) => {
			const traceHash = orderSpansByTrace(response.data);
			setTraces(traceHash);
		});
	}, [params]);

	if (!traces) {
		return null;
	}

	const handleClick = () => {};

	return (
		<>
			<h2>Traces for "{trigger}"</h2>
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
		</>
	);
};

export default TriggerTraces;
