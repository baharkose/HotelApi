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
  // ! BOŞ ODALARA GÖRE
  // CRUD:
  create: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
        */
    try {
      const { roomId, arrival_date, departure_date, guest_number } = req.body;

      // İlgili odayı sorgula
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).send({ error: true, message: "Room not found" });
      }

      // Oda müsaitlik kontrolü
      const checkRoom = await Reservation.findOne({
        roomId: roomId,
        $nor: [
          { arrival_date: { $gt: departure_date } },
          { departure_date: { $lt: arrival_date } },
        ],
      });

      if (checkRoom) {
        return res
          .status(400)
          .send({
            error: true,
            message: "The room is not empty for the given dates",
          });
      }

      // Yatak tipine göre misafir sayısını kontrol et
      if (
        (room.bedType === 1 && guest_number > 1) ||
        (room.bedType === 2 && guest_number > 2)
      ) {
        return res
          .status(400)
          .send({
            error: true,
            message:
              "Maximum guest number exceeded for the selected room bed type",
          });
      }

      // Rezervasyon oluştur
      const data = await Reservation.create(req.body);

      res.status(201).send({
        error: false,
        data,
      });
    } catch (error) {
      res.status(500).send({ error: true, message: error.message });
    }
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */
    
    // Başka bir kullanıcı datasını görmesini engelleme
    let customFilter = {}
    if(!req.user.isAdmin){
      
    }
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
    //! reservasyon silindiğinde odayı da güncelle.
    const getData = await Reservation.findOne({ _id: req.params.id }).populate(
      "roomId"
    );
    const data = await Reservation.deleteOne({ _id: req.params.id });
    console.log(data);
    if (data.deletedCount) {
      console.log(getData);
      const updateRoom = await Room.updateOne(
        { _id: getData.roomId },
        { isEmpty: true }
      );
      res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,
        message: `${req.params.id} is deleted`,
        data,
        updateRoom,
      });
    }
  },
};
