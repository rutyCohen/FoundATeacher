const mongoose = require('mongoose');
const {isEmail} = require('validator');
const areas =  require('./areasModel');


const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstName : { type:String, require:true},
    lastName : { type:String, require:true},
    email : { type:String,
              require:true,
              unique: true,
              validate: [isEmail,`Please enter a valid email`]
              },
    password : { type:String, require:true},
    birthDate : { type:Date, require:true},
    gender : { type:String,require:true,enum:['male', 'female']},
    phone : { type:Number, require:true},
    area : { type:areas.schema, require:true},
    isActive : {type:Boolean, require:false, default:true}
  

});

module.exports= mongoose.model('user',userSchema );




