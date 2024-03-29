"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Hotel Api
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/reservation:

const reservation = require("../controllers/reservation");
const { isAdmin, isLogin } = require("../middlewares/permissions");

// URL: /reservations
// ! yapılacaklar
// + login olanalr, listeleme, oluşturma, okuma, ama başkasınınkini görmemesi lazım. onu controllerda halladeceğiz.
//+ admin olanlar, güncelleme,silme

router
  .route("/")
  .get(isLogin, reservation.list)
  .post(isLogin, reservation.create);

router
  .route("/:id")
  .get(isLogin, reservation.read)
  .put(isAdmin, reservation.update)
  .patch(isAdmin, reservation.update)
  .delete(isAdmin, reservation.delete);

/* ------------------------------------------------------- */
module.exports = router;
