"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Hotel Api
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use("/auth", require("./auth"));
// user:
router.use("/users", require("./user"));
// token:
router.use("/tokens", require("./token"));

// order:
router.use("/reservations", require("./reservation"));
// pizza:
router.use("/rooms", require("./room"));

// document:
router.use("/documents", require("./document"));

/* ------------------------------------------------------- */
module.exports = router;
