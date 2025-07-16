const mongoose = require('mongoose');

const mongourl = 'mongodb://127.0.0.1:27017/hotels'



mongoose.connect(mongourl)

const db = mongoose.connection;

db.on('connected' , () => {
    console.log('connected to Mongodb server');
})

db.on('error' , (err) => {
    console.error('Error occured:',err);
})

db.on('disconnected' , () => {
    console.log('Mongodb server disconnected');
})

module.exports = db;