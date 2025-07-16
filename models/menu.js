const mongoose = require('mongoose');



// {
// "name": "Spicy Chicken Wings",
// "price":
// 9.99,
// "taste":
// "Spicy",
// "is_drink": false,
// "ingredients": ["chicken wings", "spices", "sauce"],
// "num_sales":62
// }
const menuschema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
        default : 200
    },
    taste : {
        type : String,
        enum : ['sweet' , 'spicy' , 'sour']
    },
    is_drink : {
        type : Boolean,
        default : false
    },
    ingredients : {
        type : [String],
        default:[]
    },
    num_sales : {
        type : Number,
        default : 0
    }
})

const menu = mongoose.model('menu',menuschema)

module.exports = menu;