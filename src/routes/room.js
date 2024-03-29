"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Hotel Api
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/room:

const room = require("../controllers/room");
const { isAdmin, isLogin } = require("../middlewares/permissions");

// URL: /pizzas

// ! odaları listeleme herkes, admin create, update, delete, idye göre okuma herkes..

router.route("/").get(isLogin, room.list).post(isAdmin, room.create);

router
  .route("/:id")
  .get(isLogin, room.read)
  .put(isAdmin, room.update)
  .patch(isAdmin, room.update)
  .delete(isAdmin, room.delete);

/* ------------------------------------------------------- */
module.exports = router;
