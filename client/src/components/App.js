import React from "react";
import { Route } from "react-router-dom";
import SpanList from "./SpanList";
import TriggerList from "./TriggerList";
import TriggerTraces from "./TriggerTraces";
import Session from "./Session";
import TopNav from "./TopNav";
import Home from "./Home";
import EventList from "./EventList";
import Chapter from './Chapter'
import SpanSearch from './SpanSearch'

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
			<Route path="/span/:search" component={SpanSearch} />
			<Route path="/chapter/:id" component={Chapter} />
		</div>
	);
}

export default App;
