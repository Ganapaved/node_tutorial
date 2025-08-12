const jwt = require('jsonwebtoken');



const jwtAuthmiddleware = (req,res,next) => {
    const authorization = req.headers.authorization
    if(!authorization) res.status(401).json({error : 'token not found'});

    const token = req.headers.authorization.split(' ')[1];
    if(!token) res.status(401).json({error : 'UnAuthorized'});

    try{
        const decoded = jwt.verify(token, process.env.JSON_SECRET);
        req.userPayload = decoded
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid token'});
    }
}

const generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JSON_SECRET , {expiresIn : 30000})
}

module.exports = {jwtAuthmiddleware , generateToken};