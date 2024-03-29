"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Hotel Api
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/user:

const user = require("../controllers/user");
const { isAdmin, isLogin } = require("../middlewares/permissions");
// URL: /users

router.route("/").get(isAdmin, user.list).post(isAdmin, user.create);

router
  .route("/:id")
  .get(isLogin, user.read)
  .put(isAdmin, user.update)
  .patch(isAdmin, user.update)
  .delete(isAdmin, user.delete);

/* ------------------------------------------------------- */
module.exports = router;
