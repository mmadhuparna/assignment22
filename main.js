const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port= 3000;
//Load Product model
const Product = require("./models/Product.js");


app.set('view engine', 'ejs');
// set the view engine to ejs


//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var route = require('./routes.js');
app.use('/', route);

// DB Config
const db = require("./config.js").url;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.listen(port, () => console.log('Server runnning on port' + port));
