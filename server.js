const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const person = require('./models/person')
const bodyParser = require('body-parser');
const passport = require('./auth')
app.use(bodyParser.json());


const logrequest = (req , res , next)=>{
    console.log(`${Date().toLocaleString()} Request made to ${req.originalUrl}`);
    next();
}
app.use(logrequest);
const localAuth = passport.authenticate('local' , {session : false});
app.use(passport.initialize())

app.get('/' , (req,res) =>{
    res.send('<h1>Namaste</h1>');
})


const personRoutes = require('./routes/person_route');

app.use('/person',localAuth, personRoutes);

const menuRoutes = require('./routes/menu_routes')

app.use('/menu' , menuRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT , () =>{
    console.log('listening in port ');
    
})


