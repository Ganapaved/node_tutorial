const express = require('express')
const router = express.Router();

const person = require('./../models/person')


router.post('/' ,async (req,res) => {
    try{
        const data = req.body
        const newPerson = new person(data);
        const savedperson = await newPerson.save();
        console.log('data saved');
        res.status(200).json(savedperson);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})

router.get('/' ,async (req,res) =>{
    try{
        const data = await person.find();
        console.log('data fetched succuesfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})


router.get('/:workType' ,async (req,res) =>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef'|| workType == 'manager' || workType == "waiter"){
            const response = await person.find({work : workType});
            console.log('Response fetched');
            res.status(200).json(response);
            
        }else{
            res.status(404).json({error: 'Invalid WorkType'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})

router.put('/:id' , async (req,res) =>{
    try {
        const personID = req.params.id;
        const updatepersonData = req.body;

        const response = await person.findByIdAndUpdate(personID , updatepersonData,{
            new : true,
            funValidator : true
        })

        if(!response){
            res.status(404).json('Person Not found');
        }
        
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})

router.delete('/:id' , async (req,res) =>{
    try {
        const personID = req.params.id;

        const response = await person.findByIdAndDelete(personID)

        if(!response){
            res.status(404).json('Person Not found');
        }
        
        res.status(200).json({message:'Preson deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})

module.exports = router;