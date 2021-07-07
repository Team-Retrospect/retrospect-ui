import React from "react";
import { Route } from "react-router-dom";
import SpanList from "./SpanList";
import TriggerList from "./TriggerList";

function App() {
	return (
		<div id="app">
			<header>Something</header>
			<a href="/spans">Get'cha spans here</a>
			<br></br>
			<a href="/trigger_routes">Get'cha trigger routes here</a>
			<br></br>
			<a href="/">Hide ya spans here</a>
			<br></br>
			<a href="/">Hide ya trigger routes here</a>
			<Route path="/spans" component={SpanList} />
			<Route path="/trigger_routes" component={TriggerList} />
		</div>
	);
}

export default App;
