"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | HOTEL API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    arrival_date: {
      type: Date,
      required: true,
    },
    departure_date: {
      type: Date,
    },
    guest_number: {
      type: Number,
      required: true,
    },
    night: {
      type: Number,
      default: function () {
        return this.arrival_date - this.departure_date - 1;
      }, // Create
      transform: function () {
        return this.arrival_date - this.departure_date - 1;
      }, // Update
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: function () {
        return this.price * this.night;
      }, // Create
      transform: function () {
        return this.price * this.night;
      }, // Update
    },
  },
  {
    collection: "reservations",
    timestamps: true,
  }
);

// Model:
module.exports = mongoose.model("Reservation", ReservationSchema);
