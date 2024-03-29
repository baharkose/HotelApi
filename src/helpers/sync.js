// // "use strict"
// /* -------------------------------------------------------
//     NODEJS EXPRESS | HOTEL API
// ------------------------------------------------------- */
// // sync():

// module.exports = async function() {

//     return null;

//     /* CLEAR DATABASE */
//     const { mongoose } = require('../configs/dbConnection')
//     await mongoose.connection.dropDatabase()
//     console.log('- Database and all data DELETED!')
//     /* CLEAR DATABASE */

// }

"use strict";

const mongoose = require('mongoose');
const {dbConnection} = require('../configs/dbConnection'); // Veritabanı bağlantı ayarlarınızı içeren dosyanın yolu
const Room = require('../models/room');
const Reservation = require('../models/reservation');
const User = require('../models/user');

const passwordEncrypt = require('../helpers/passwordEncrypt'); // Şifreleme fonksiyonunun bulunduğu dosya

async function seedDatabase() {
    // Veritabanı bağlantısı
    await dbConnection();

    // Veritabanını temizle
    await mongoose.connection.dropDatabase();
    console.log("Database cleared.");

    // Kullanıcılar için örnek veriler
    for (let i = 1; i <= 10; i++) {
        await User.create({
            username: `user${i}`,
            password: 'Aa*123456',
            email: `user${i}@example.com`,
            isActive: true,
            isAdmin: i % 2 === 0 // Çift sayılı kullanıcılar admin olacak
        });
    }
    console.log("Users created.");

    // Odalar için örnek veriler
    for (let i = 1; i <= 10; i++) {
        await Room.create({
            roomNumber: i,
            image: [],
            bedType: i % 3 + 1, // 1, 2, veya 3 değerlerinden birini alacak
            price: 100 * i // Fiyat artarak gidecek
        });
    }
    console.log("Rooms created.");

    // Rezervasyonlar için örnek veriler
    const users = await User.find();
    const rooms = await Room.find();
    for (let i = 0; i < 10; i++) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + i * 2); // Başlangıç tarihi bugünden itibaren ikişer gün arayla
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 3); // Her rezervasyon 3 gün sürecek

        await Reservation.create({
            userId: users[i]._id,
            roomId: rooms[i]._id,
            arrival_date: startDate,
            departure_date: endDate,
            guest_number: 2,
            price: rooms[i].price,
        });
    }
    console.log("Reservations created.");

    // Bağlantıyı kapat
    await mongoose.connection.close();
    console.log("Database seeding completed and connection closed.");
}

seedDatabase().catch(err => {
    console.error("Database seeding failed:", err);
    process.exit(1);
});
