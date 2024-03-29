"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | HotelApi
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require("../models/reservation");
const Room = require("../models/room");

module.exports = {
  // ! burada customFilter yapılcak, list ve read için
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(Reservation, {}, ["userId", "roomId"]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },

  // CRUD:

  create: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
        */

    const checkRoom = await Room.findOne({ _id: req.body.roomId });
    console.log(checkRoom.isEmpty);
    if (checkRoom && checkRoom.isEmpty) {
      const data = await Reservation.create(req.body);
      // console.log(data);

      const roomId = data.roomId;
      const updateData = await Room.updateOne(
        { _id: roomId },
        { isEmpty: false }
      );
      // console.log(updateData);

      res.status(201).send({
        error: false,
        data,
        checkRoom,
      });
    } else {
      res.status(200).send({
        error: false,
        message: "the room is not empty",
      });
    }
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

    const data = await Reservation.findOne({ _id: req.params.id }).populate([
      "userId",
      "roomId",
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
        */

    const data = await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
