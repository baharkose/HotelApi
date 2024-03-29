"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Hotel Api
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/reservation:

const reservation = require("../controllers/reservation");

// URL: /reservations
// ! yapılacaklar
// + login olanalr, listeleme, oluşturma, okuma, ama başkasınınkini görmemesi lazım. onu controllerda halladeceğiz.
//+ admin olanlar, güncelleme,silme

router.route("/").get(reservation.list).post(reservation.create);

router
  .route("/:id")
  .get(reservation.read)
  .put(reservation.update)
  .patch(reservation.update)
  .delete(reservation.delete);

/* ------------------------------------------------------- */
module.exports = router;
