const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { errorHandler, notFoundHandler } = require("./utils/errroHandling");
const { allRouters } = require("./routes/index.routes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set port
const port = process.env.PORT || 3000;

//set upt view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.set('layouts' , './layout/main.ejs')

//routes
app.use(allRouters);

//error handling
app.use(notFoundHandler);
app.use(errorHandler);

//server run
app.listen(port, () => {
  console.log("server run on port " + port + " http://localhost:" + port);
});
