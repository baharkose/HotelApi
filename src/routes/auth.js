"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Hotel Api
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/auth:

const auth = require("../controllers/auth");

const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");

// URL: /auth

// Login/logout:
router.post("/login", auth.login);
// router.all('/logout', auth.logout)
router.get("/logout", auth.logout);

/* ------------------------------------------------------- */
module.exports = router;
