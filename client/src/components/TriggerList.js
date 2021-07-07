import React, { useState, useEffect } from "react";
import Trigger from "./Trigger";
import axios from "axios";

const TriggerList = () => {
	const [triggers, setTriggers] = useState([]);

	useEffect(() => {
		axios.get("/api/trigger_routes").then((response) => {
			console.log("response: ", response.data);
			setTriggers(triggers.concat(response.data));
		});
	}, []);

	console.log("trigger data in TriggerList: ", triggers);

	return (
		<div id="span-list">
			<h1>Trigger Routes</h1>
			{triggers.map((trigger) => {
				return <Trigger key={trigger} url={trigger} />;
			})}
		</div>
	);
};

export default TriggerList;
