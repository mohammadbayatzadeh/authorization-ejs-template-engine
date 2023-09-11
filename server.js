const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("express-flash");
const { errorHandler, notFoundHandler } = require("./utils/errroHandling");
const { allRouters } = require("./routes/index.routes");

const app = express();

//enviroment variables
const dotenv = require("dotenv");
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

//set upt view engine
app.use(expressLayouts);
app.set("layout", "./layout/main.ejs");
app.set("view engine", "ejs");
app.use(express.static("public"));

//set up session
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);

//routes
app.use(allRouters);


//error handling
app.use(notFoundHandler);
app.use(errorHandler);

//set port
const port = process.env.PORT || 3000;

//server run
app.listen(port, () => {
  console.log("server run on port " + port + " http://localhost:" + port);
});
