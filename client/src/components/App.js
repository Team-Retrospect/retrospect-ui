import React from "react";
import { Route } from "react-router-dom";
import Triggers from "./Triggers";
import TopNav from "./TopNav";
import Home from "./Home";
import Chapter from './Chapter';
import Chapters from './Chapters';
import SpanSearch from './SpanSearch';
import EventSearch from './EventSearch';
import Issues from './Issues'
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
	return (
		<div id="app">
			<CssBaseline />
			<TopNav />
			<Route path="/" exact component={Home} /> {/* Count of errors maybe? */}
			<Route path="/spans" exact component={SpanSearch} />
			<Route path="/events" exact component={EventSearch} />
			<Route path="/trigger_routes" exact component={Triggers} />
			<Route path="/trigger_route/:id" component={Chapters} />
			<Route path="/session/:id" component={Chapters} />
			<Route path="/chapter/:id" component={Chapter} />
			<Route path="/issues" component={Issues} />
		</div>
	);
}

export default App;
