const Session = () => {
	// get the session id
	let sessionId;
	return (
		<div>
			<Traces onClick={expand / retract} sessionId={sessionId} />
			<Events sessionId={sessionId} />
		</div>
	);
};
