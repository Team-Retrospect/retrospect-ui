const express = require("express");
const router = express.Router();
// const Product = require("../models/product");
// const CartItem = require("../models/cartItem");
const Span = require("../models/span");

// router.get("/products", (req, res, next) => {
// 	Product.find({})
// 		.then((products) => res.json(products))
// 		.catch(next);
// });

router.get("/spans", (req, res, next) => {
	Span.find({})
		.then((spans) => {
			res.json(spans);
		})
		.catch(next);
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
