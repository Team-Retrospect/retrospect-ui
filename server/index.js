const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
// const uiRoutes = require("./routes/ui");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5200;

mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log(`Database connected successfully`))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(express.static(__dirname + "/public"));

// app.use(bodyParser.json());
app.use(express.json());

app.use("/api", apiRoutes);
// app.use("/ui", uiRoutes);

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
