const cron = require('node-cron');

cron.schedule('0 0 * * *', async () => { // Her gün gece yarısı çalışır
  const today = new Date();
  const reservationsToUpdate = await Reservation.find({ departure_date: { $lt: today } });

  for (const reservation of reservationsToUpdate) {
    await Room.updateOne({ _id: reservation.roomId }, { isEmpty: true });
  }
});
