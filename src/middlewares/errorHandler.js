"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Dessert Api
------------------------------------------------------- */

module.exports = (err, req, res, next) => {
    // request -> hizmet talep eden cihazdan(istemci) gelen bilgiler
    // response -> sununcunun istemciye gönderdiği mesajlar. res -> http yanıtı
  return res.status(res?.errorStatusCode || 500).send({
    error: true,
    message: err.message,
    // explain what the error is
    cause: err.cause,
    body: req.body,
  });
};


