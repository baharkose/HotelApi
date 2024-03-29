"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Hotel Api
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/room:

const room = require("../controllers/room");

// URL: /pizzas


// ! odaları listeleme herkes, admin create, update, delete, idye göre okuma herkes..

router.route("/").get(room.list).post(room.create);

router
  .route("/:id")
  .get(room.read)
  .put(room.update)
  .patch(room.update)
  .delete(room.delete);

/* ------------------------------------------------------- */
module.exports = router;
