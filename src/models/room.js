"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | HOTEL API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    image: {
      type: [], //Array
    },
    bedType: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isEmpty: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "rooms",
    timestamps: true,
  }
);

// Model:
module.exports = mongoose.model("Room", RoomSchema);
