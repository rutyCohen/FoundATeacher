const mongoose = require('mongoose');
const userModel = require('../Models/userModel');

const logconfig = require('../Logger/configuration');
const winston = require('winston');
const { ObjectId } = require('mongodb');
const logger = winston.createLogger(logconfig);

module.exports = {
getAllUsers : async(req,res,next)=> {
    try{
        if(req.query.email && req.query.password)
        {
        const email = req.query.email;
        const password = req.query.password;
        await userModel.findOne({email:email, password:password}).then((user)=>{
                res.status(200).json({user});
        })
        }
        else{
        await userModel.find().then((users) => {
        res.status(200).json({users})
        })
    }}
    catch(error){
        logger.error(error),
            res.status(500).json({error}),
            next(error)
        };
},
getUserById : async(req,res,next) => {
    try{
    const id = req.params.id;
    await userModel.findById(id).then((user) => {
        res.status(200).json({user})
    })
}  
    catch (error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
createUser : async(req,res,next) => {
    try{
    const {firstName,lastName,email,password,birthDate,gender,phone,area,isActive} = req.body;
    const newUser = new userModel({
        _id:new mongoose.Types.ObjectId(),
        firstName,lastName,email,password,birthDate,gender,phone,area,isActive
    });
    await newUser.save().then((user) => {
        res.status(200).json({user})
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
updateUser : async(req,res) => {
    try{
    const id = req.params.id;
    await userModel.updateOne({_id:id},req.body).then(() =>{
        res.status(200).json({
            message:'user update!'
        })
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
deleteUser : async(req,res,next) => {
    try{
    const id = req.params.id;
    await userModel.remove({_id:id}).then(() => {
        res.status(200).json({
            message: `user deleted`
        })
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},

}


