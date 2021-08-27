const express = require("express");
const apiRoutes = require("./routes/api");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5200;

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
	next();
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
