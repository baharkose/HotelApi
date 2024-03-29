"use strict";

/* -------------------------------------------------------
    NODEJS EXPRESS | HOTEL Api
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
    -> JWT
    $ npm i jsonwebtoken 
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

// Logger:
app.use(require("./src/middlewares/logger"));

// Auhentication:
app.use(require("./src/middlewares/authentication"));

// findSearchSortPage / res.getModelList:
app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */
// Routes:
// routes/index.js:
app.use("/", require("./src/routes/"));

//HomePath
// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Hotel API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

//errorHandler
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')
