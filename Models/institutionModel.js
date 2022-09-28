const mongoose = require('mongoose');
const {isEmail} = require('validator');

const areas = require('./areasModel');
const user = require('./userModel');

const institutionSchema = mongoose.Schema({
    institutionName : {type:String, require:true},
    institutionPhone : {type:Number, require:true},
    institutionType : {type:String, require:true, enum:['seminar', 'school', 'kindergarten', 'nursery'] },
    institutionEmail : { 
        type:String,
        require:true,
        unique: true,
        validate: [isEmail,`Please enter a valid email`]
       },
    institutionArea : {type:areas.schema, require:true},
    isActive : {type:Boolean, require:false, default:true},
    existingTeachersList : {type:[String], require:false},
    teachersForApprovalList : {type:[String], require:false},
    manager : {type:user.schema, require:true}
})
module.exports = mongoose.model('institution',institutionSchema );
