import React from "react";

const Trigger = ({ url }) => {
	return (
		<ul class="list-group">
			<li class="list-group-item">
				<div className="trigger">
					<div className="trigger_route-url">
						<strong>trigger route: </strong>
						<a href={`/trigger_routes/${encodeURIComponent(url)}`}>{url}</a>
					</div>
					<br></br>
				</div>
			</li>
		</ul>
	);
};

export default Trigger;
