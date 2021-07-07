const Events = ({events}) => {
	return (
		<div>
			{events.map((event) => {
				<Event data={event} />;
			})}
		</div>
	);
};
