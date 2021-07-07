import React from "react";
import { Route } from "react-router-dom";
import SpanList from "./SpanList";
import TriggerList from "./TriggerList";
// import SessionSpans from "./SessionSpans";
import Session from "./Session";
import TopNav from "./TopNav";
import Home from "./Home";

function App() {
	return (
		<div id="app">
			<TopNav />
			<Route path="/" exact component={Home} />
			{/* <header>Something</header>
			<a href="/spans">Get'cha spans here</a>
			<br></br>
			<a href="/trigger_routes">Get'cha trigger routes here</a>
			<br></br>
			<a href="/">Hide ya spans here</a>
			<br></br>
			<a href="/">Hide ya trigger routes here</a>
			<br></br> */}
			<Route path="/spans" component={SpanList} />
			<Route path="/trigger_routes" component={TriggerList} />
			{/* <Route path="/session/:id" component={SessionSpans} /> */}
			<Route path="/session/:id" component={Session} />
		</div>
	);
}

export default App;
