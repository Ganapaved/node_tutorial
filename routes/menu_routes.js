const express = require('express')
const router = express.Router()

const menu = require('./../models/menu')

router.post('/' ,async (req,res) => {
    try{
        const data = req.body
        const newMenu = new menu(data);
        const savedmenu = await newMenu.save();
        console.log('data saved');
        res.status(200).json(savedmenu);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})

router.get('/' ,async (req,res) =>{
    try{
        const data = await menu.find();
        console.log('data fetched succuesfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})

module.exports = router;