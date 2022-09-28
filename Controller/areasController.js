const mongoose = require('mongoose');
const areaModel = require('../Models/areasModel');
const logconfig = require('../Logger/configuration');
const winston = require('winston');
const { ObjectId } = require('mongodb');
const logger = winston.createLogger(logconfig);

module.exports = {
    getAllAreas : async(req,res,next)=> {
    try{
        if(req.query.cityName){
            const cityName = req.query.cityName;
            await areaModel.find({city : cityName}).then((area) => {
            res.status(200).json({area})})
        }
        else{
        await areaModel.find().then((areas) => {
        res.status(200).json({areas})
        })
    }}
    catch(error){
        logger.error(error),
            res.status(500).json({error}),
            next(error)
        };
  },
  getAreaById : async(req,res,next) => {
    try{
    const id = req.params.id;
    await areaModel.findById(id).then((area) => {
        res.status(200).json({area})
    })
}  
    catch (error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},

createArea : async(req,res,next) => {
    try{
    const {city,neighborhood,area} = req.body;
    const newArea = new areaModel({
        _id:new mongoose.Types.ObjectId(),
        city,neighborhood,area
    });
    await newArea.save().then((area) => {
        res.status(200).json({area})
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
updateArea : async(req,res) => {
    try{
    const id = req.params.id;
    await areaModel.updateOne({_id:id},req.body).then(() =>{
        res.status(200).json({
            message:'area update!'
        })
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
deleteArea : async(req,res,next) => {
    try{
    const id = req.params.id;
    await areaModel.remove({_id:id}).then(() => {
        res.status(200).json({
            message: `area deleted`
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


