const Traces = ({ traces }) => {
	return (
		<div>
			{traces.map((trace) => {
				<Trace spans={trace} onClick={hide / show} />;
			})}
		</div>
	);
};
