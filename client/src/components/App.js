import React from "react";
import { Route } from "react-router-dom";
import SpanList from "./SpanList";
import TriggerList from "./TriggerList";
import TriggerTraces from "./TriggerTraces";
import Session from "./Session";
import TopNav from "./TopNav";
import Home from "./Home";
import EventList from "./EventList";
import TraceAndEvents from './TraceAndEvents'

function App() {
	return (
		<div id="app">
			<TopNav />
			<Route path="/" exact component={Home} />
			<Route path="/spans" component={SpanList} />
			<Route path="/events" component={EventList} />
			<Route path="/trigger_routes" exact component={TriggerList} />
			<Route path="/trigger_routes/:id" component={TriggerTraces} />
			<Route path="/session/:id" component={Session} />
			<Route path="/trace/:id" component={TraceAndEvents} />
		</div>
	);
}

export default App;
