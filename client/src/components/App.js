import React from "react";
import { Route } from "react-router-dom";
import SpanList from "./SpanList";
import TriggerList from "./TriggerList";
import TriggerTraces from "./TriggerTraces";
import Session from "./Session";
import TopNav from "./TopNav";
import Home from "./Home";

function App() {
	return (
		<div id="app">
			<TopNav />
			<Route path="/" exact component={Home} />
			<Route path="/spans" component={SpanList} />
			<Route path="/trigger_routes" exact component={TriggerList} />
			<Route path="/trigger_routes/:id" component={TriggerTraces} />
			<Route path="/session/:id" component={Session} />
		</div>
	);
}

export default App;
