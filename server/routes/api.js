const express = require("express");
const router = express.Router();
// const Product = require("../models/product");
// const CartItem = require("../models/cartItem");
const Span = require("../models/span");
const Event = require("../models/event");
const axios = require('axios');

// will have to be updated when we use Cassandra
router.get("/spans", (req, res, next) => {
	// axios.get('http://api.xadi.io/spans')
	// 	.then(response => response.data)
	// 	.then(spans => {
	// 		spans = spans.map(span => {
	// 			span.data = JSON.parse(span.data);
	// 			return span;
	// 		})
	// 		res.json(spans);
	// 	})
	// 	.catch(err => console.log(err));
	Span.find({})
		.then((spans) => {
			res.json(spans);
		})
		.catch(next);
});

router.get("/events", (req, res, next) => {
	Event.find({})
		.then((events) => {
			res.json(events);
		})
		.catch(next);
});

router.get("/trigger_routes", (req, res, next) => {
	// axios.get('http://api.xadi.io/spans')
	// 	.then(response => response.data)
	// 	.then(spans => {
	// 		const triggers = spans.reduce((acc, span) => {
	// 			acc[span.trigger_route] = true;
	// 			return acc;
	// 		}, {});
	// 		res.json(Object.keys(triggers));
	// 	})
	// 	.catch(err => console.log(err));
	Span.find({})
		.then((spans) => {
			const triggers = spans.reduce((acc, span) => {
				acc[span.get("trigger_route")] = true;
				return acc;
			}, {});
			res.json(Object.keys(triggers));
		})
		.catch(next);
});

// get spans by session id
router.get("/session/:id", (req, res, next) => {
	Span.find({ session_id: req.params.id })
		.then((spans) => {
			res.json(spans);
		})
		.catch(next);
});

// get events by session id
router.get("/events/:id", (req, res, next) => {
	Event.find({ session_id: req.params.id })
		.then((events) => {
			res.json(events);
		})
		.catch(next);
});

// get spans by trigger id
router.get("/trigger/:id", (req, res, next) => {
	Span.find({ trigger_route: req.params.id })
		.then((spans) => {
			res.json(spans);
		})
		.catch(next);
	// const triggerRoute = req.params.id;

	// axios.get('http://api.xadi.io/spans')
	// 	.then(response => response.data)
	// 	.then(spans => {
	// 		spans = spans.filter(span => span.trigger_route === triggerRoute)
	// 		spans = spans.map(span => {
	// 			span.data = JSON.parse(span.data);
	// 			return span;
	// 		})
	// 		res.json(spans);
	// 	})
	// 	.catch(err => console.log(err));
});

module.exports = router;
