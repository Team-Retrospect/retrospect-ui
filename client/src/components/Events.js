import Event from "./Event";

const Events = ({ sessionId }) => {
	let events;

	if (!events) {
		return null;
	}
	return (
		<div>
			{events.map((event) => {
				<Event data={event} />;
			})}
		</div>
	);
};

export default Events;
