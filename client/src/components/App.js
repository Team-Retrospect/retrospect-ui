import React from "react";
import { Route } from "react-router-dom";
import SpanList from "./SpanList";
import Triggers from "./Triggers";
import TriggerTraces from "./TriggerTraces";
import Session from "./Session";
import TopNav from "./TopNav";
import Home from "./Home";
import Chapter from './Chapter';
import Chapters from './Chapters';
import SpanSearch from './SpanSearch';
import EventSearch from './EventSearch';

function App() {
	return (
		<div id="app">
			<TopNav />
			<Route path="/" exact component={Home} /> {/* Count of errors maybe? */}
			<Route path="/spans" exact component={SpanSearch} />
			<Route path="/events" exact component={EventSearch} />
			<Route path="/trigger_routes" exact component={Triggers} />
			<Route path="/trigger_route/:id" component={Chapters} />
			{/* <Route path="/events" exact component={EventSearch} />
			<Route path="/trigger_routes" exact component={TriggerList} />
			<Route path="/trigger_routes/:id" component={TriggerTraces} /> */}


			{/* Old Stuff */}
			{/* <Route path="/" exact component={Home} />
			<Route path="/spans" component={SpanList} />
			<Route path="/events" component={EventList} />
			<Route path="/trigger_routes" exact component={TriggerList} />
			<Route path="/trigger_routes/:id" component={TriggerTraces} />
			<Route path="/session/:id" component={Session} />
			<Route path="/span" component={SpanSearch} />
			<Route path="/chapter/:id" component={Chapter} /> */}
		</div>
	);
}

export default App;
