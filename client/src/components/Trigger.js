import React from "react";

const Trigger = ({ url }) => {
	return (
		<ul class="list-group">
      <li class="list-group-item">
				<div className="trigger">
					<div className="trigger_route-url">
						trigger route: <a href="#">{url}</a>
					</div>
					<br></br>
				</div>
			</li>
  	</ul>
	);
};

export default Trigger;
