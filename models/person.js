const mongoose = require('mongoose');

const personShema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type:Number
    },
    work : {
        type: String,
        enum : ['chef' , 'manager' , 'waiter'],
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required :true,
        unique : true
    },
    address  : {
        type : String
    },
    salary : {
        type : Number,
        required :true
    }

})

const person = mongoose.model('person' , personShema);
module.exports = person;