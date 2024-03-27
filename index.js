"use strict";

/* -------------------------------------------------------
    NODEJS EXPRESS | Dessert Api
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules

// envVariables to process.env
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to ErrorHandler
require("express-async-errors");

/* ------------------------------------------------------- */

// Configurations
// Connect to DB
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */

// Middlewares

// Accept JSON

// gövdedeki json nesnelerini otomatik js nesnelerine dönüştür.
app.use(express.json()); // json parsing

// logger
app.use(require("./src/middlewares/logger"));

//errorHandler
app.use(require("./src/middlewares/errorHandler"));

//Routes
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "welcome to Dessert Api",
  });
});

// RUN SERVER
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
