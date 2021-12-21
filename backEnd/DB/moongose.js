const mongoose = require('mongoose');

const db = process.env.DB

mongoose.connect(db,).then(() => {
    console.log("database connected")
}).catch((err) => {
    console.log("no connection")
})
