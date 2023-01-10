const mongoose = require("mongoose");
const {MONGO_CONNECTION_URL} = require("./index");

mongoose.connect(MONGO_CONNECTION_URL);

const db = mongoose.connection;

db.on('err', console.error.bind(console, "Error Connectiong to Database!"));

db.once('open', function(){
    console.log("Successfully Connected to DB!");
});

module.exports=  db;