"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Dessert Api
------------------------------------------------------- */

// npm i morgan

const morgan = require("morgan");
// to keep daily log records
//  fs is built-in module this module provides a set of functions and objects for interacting with the file system -> reading- writing- modifying, and deleting
//fs-> (File System) module to create and manage the log file.
const fs = require("node:fs");

const now = new Date();
const today = now.toISOString().split("T")[0];

// combined-> includes comprehensive set of information
// { stream: fs.createWriteStream(./logs/${today}.log, { flags: "a+" }), }: This part of the command tells morgan to direct the log output to a write stream created by fs.createWriteStream().
//  fs.createdWriteStream -> indicates that the file should be opened for appending, and if the file does not exist, it will be created
module.exports = morgan("combined", {
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
});
