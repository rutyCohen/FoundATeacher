const mongoose = require('mongoose');
const institutionsModel = require('../Models/institutionModel');
const logconfig = require('../Logger/configuration');
const winston = require('winston');
const { ObjectId } = require('mongodb');
const logger = winston.createLogger(logconfig);

module.exports = {
    getAllInstitutions : async(req,res,next)=> {
    try{
        if(req.query.managerEmail && req.query.managerPassword){
            const managerEmail = req.query.managerEmail;
            const managerPassword = req.query.managerPassword;
            await institutionsModel.findOne({email:managerEmail,password:managerPassword}).then((institutions)=>{
            res.status(200).json({institutions});
        })}
        else{
            await institutionsModel.find().then((institutions) => {
            res.status(200).json({institutions})
        })
    }}
    catch(error){
        logger.error(error),
            res.status(500).json({error}),
            next(error)
        };
  },
  getInstitutionById : async(req,res,next) => {
    try{
    const id = req.params.id;
    await institutionsModel.findById(id).then((institutions) => {
        res.status(200).json({institutions})
    })
}  
    catch (error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},

createInstitution : async(req,res,next) => {
    try{
    const {institutionName,institutionPhone,institutionType,institutionEmail,institutionArea,isActive,existingTeachersList,teachersForApprovalList,manager} = req.body;
    const newInstitutions = new institutionsModel({
        _id:new mongoose.Types.ObjectId(),
        institutionName,institutionPhone,institutionType,institutionEmail,institutionArea,isActive,existingTeachersList,teachersForApprovalList,manager
    });
    await newInstitutions.save().then((institution) => {
        res.status(200).json({institution})
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
updateInstitution : async(req,res) => {
    try{
    const id = req.params.id;
    await institutionsModel.updateOne({_id:id},req.body).then(() =>{
        res.status(200).json({
            message:'institutions update!'
        })
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
deleteInstitution : async(req,res,next) => {
    try{
    const id = req.params.id;
    await institutionsModel.remove({_id:id}).then(() => {
        res.status(200).json({
            message: `institutions deleted`
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



