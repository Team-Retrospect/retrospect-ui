const express = require("express");
const router = express.Router();
// const Product = require("../models/product");
// const CartItem = require("../models/cartItem");
const Span = require("../models/span");
const Event = require("../models/event");
const axios = require('axios');

// will have to be updated when we use Cassandra
router.get("/spans", (req, res, next) => {
	axios.get('http://api.xadi.io/spans')
		.then(response => response.data)
		.then(spans => {
			spans = spans.map(span => {
				span.data = JSON.parse(span.data);
				return span;
			})
			res.json(spans);
		})
		.catch(err => console.log(err));
	// Span.find({})
	// 	.then((spans) => {
	// 		res.json(spans);
	// 	})
	// 	.catch(next);
});

router.get("/events", (req, res, next) => {
	Event.find({})
		.then((events) => {
			res.json(events);
		})
		.catch(next);
});

router.get("/trigger_routes", (req, res, next) => {
	axios.get('http://api.xadi.io/spans')
		.then(response => response.data)
		.then(spans => {
			const triggers = spans.reduce((acc, span) => {
				acc[span.trigger_route] = true;
				return acc;
			}, {});
			res.json(Object.keys(triggers));
		})
		.catch(err => console.log(err));
	// Span.find({})
	// 	.then((spans) => {
	// 		const triggers = spans.reduce((acc, span) => {
	// 			acc[span.get("trigger_route")] = true;
	// 			return acc;
	// 		}, {});
	// 		res.json(Object.keys(triggers));
	// 	})
	// 	.catch(next);
});

router.get("/session/:id", (req, res, next) => {
	Span.find({ session_id: req.params.id })
		.then((spans) => {
			res.json(spans);
		})
		.catch(next);
});

router.get("/events/:id", (req, res, next) => {
	Event.find({ session_id: req.params.id })
		.then((events) => {
			res.json(events);
		})
		.catch(next);
});

router.get("/trigger/:id", (req, res, next) => {
	// Span.find({ trigger_route: req.params.id })
	// 	.then((spans) => {
	// 		res.json(spans);
	// 	})
	// 	.catch(next);
	const triggerRoute = req.params.id;

	axios.get('http://api.xadi.io/spans')
		.then(response => response.data)
		.then(spans => {
			spans = spans.filter(span => span.trigger_route === triggerRoute)
			spans = spans.map(span => {
				span.data = JSON.parse(span.data);
				return span;
			})
			res.json(spans);
		})
		.catch(err => console.log(err));
});

// router.post("/products", (req, res, next) => {
// 	const { title, price, quantity } = req.body;
// 	Product.create({ title, price, quantity })
// 		.then((product) => res.json(product))
// 		.catch((err) => next(err));
// });

// router.put("/products/:id", (req, res) => {
// 	const productId = req.params.id;
// 	const { title, price, quantity } = req.body;
// 	Product.findById(productId)
// 		.then((product) => {
// 			return Product.findByIdAndUpdate(
// 				productId,
// 				{
// 					title: title || product.title,
// 					price: price === undefined ? product.price : price,
// 					quantity: quantity === undefined ? product.quantity : quantity,
// 				},
// 				{ new: true }
// 			);
// 		})
// 		.then((updatedProduct) => {
// 			res.json(updatedProduct);
// 		});
// });

// router.delete("/products/:id", (req, res, next) => {
// 	const productId = req.params.id;
// 	Product.findByIdAndRemove(productId)
// 		.then(() => {
// 			res.json();
// 		})
// 		.catch((err) => next(err));
// });

// router.post("/cart", (req, res) => {
// 	const { productId, title, price } = req.body;
// 	CartItem.findOne({
// 		productId,
// 	})
// 		.then((item) => {
// 			if (!item) {
// 				return CartItem.create({
// 					title: title,
// 					price: price,
// 					quantity: 1,
// 					productId,
// 				});
// 			} else {
// 				return CartItem.findOneAndUpdate(
// 					{ productId },
// 					{
// 						quantity: item.quantity + 1,
// 					},
// 					{ new: true }
// 				);
// 			}
// 		})
// 		.then((item) => {
// 			res.json(item);
// 		});
// });

// router.post("/cart/checkout", (req, res) => {
// 	CartItem.deleteMany({}).then(() => {
// 		res.json();
// 	});
// });

// router.get("/cart", (req, res, next) => {
// 	CartItem.find({})
// 		.then((cartItems) => res.json(cartItems))
// 		.catch(next);
// });

module.exports = router;
