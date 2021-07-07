import React from "react";

const Trigger = ({ url }) => {
	return (
		<div className="trigger">
			<div className="trigger_route-url">
				trigger route: <a href="#">{url}</a>
			</div>
			<br></br>
		</div>
	);
};

export default Trigger;
