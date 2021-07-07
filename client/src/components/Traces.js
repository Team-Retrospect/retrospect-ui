const Traces = ({ sessionId }) => {
	return (
		<div>
			{traces.map((trace) => {
				<Trace spans={trace} onClick={hide / show} />;
			})}
		</div>
	);
};
