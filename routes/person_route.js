const express = require('express')
const router = express.Router();

const person = require('./../models/person');
const { jwtAuthmiddleware ,generateToken} = require('./../jwt');


router.post('/signup' ,async (req,res) => {
    try{
        const data = req.body
        const newPerson = new person(data);
        const savedperson = await newPerson.save();
        console.log('data saved');
        const payload = {
            id : savedperson.id,
            username : savedperson.username
        }
        const token = generateToken(payload);
        console.log('Token is generated : ',token);
        
        res.status(200).json({response : savedperson , token : token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})

router.post('/login',async (req,res) =>{
    try{
        const {username , password} = req.body;
        const user = await person.findOne({username : username});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error : 'Invalid username or password'});
        }

        const payload = {
            id : user.id,
            username : user.username
        }
        
        const token = generateToken(payload);
        console.log('Token generated successfully');
        
        res.json({token : token});
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
        
    }

})

router.get('/profile' ,jwtAuthmiddleware, async (req,res) =>{
    try{
        const userData = req.userPayload;
        console.log('User Data : ',userData);
        const userId = userData.id;
        const user = await person.findById(userId);
        
        res.status(200).json({user: user});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})

router.get('/' ,jwtAuthmiddleware,async (req,res) =>{
    try{
        const data = await person.find();
        console.log('data fetched succuesfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})


router.get('/:workType',jwtAuthmiddleware ,async (req,res) =>{
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

router.put('/:id' ,jwtAuthmiddleware, async (req,res) =>{
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

router.delete('/:id' ,jwtAuthmiddleware, async (req,res) =>{
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