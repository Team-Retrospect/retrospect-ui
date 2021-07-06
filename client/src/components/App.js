import React from "react";
import { Route } from "react-router-dom";
import SpanList from "./SpanList";

function App() {
	return (
		<div id="app">
			<header>Something</header>
			<a href="/spans">Get'cha spans here</a>
			<br></br>
			<a href="/">Hide ya spans here</a>
			<Route path="/spans" component={SpanList} />
		</div>
	);
}

export default App;
