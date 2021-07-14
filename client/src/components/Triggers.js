import React, { useState, useEffect } from "react";
import Trigger from "./Trigger";
import axios from "axios";

const Triggers = () => {
	const [triggers, setTriggers] = useState([]);

	useEffect(() => {
		axios.get("/api/trigger_routes").then((response) => {
			setTriggers(triggers.concat(response.data));
		});
	}, []);

	return (
		<div id="span-list">
			<h1>Trigger Routes</h1>
			{triggers.map((trigger) => {
				return <Trigger key={trigger} url={trigger} />;
			})}
		</div>
	);
};

export default Triggers;
