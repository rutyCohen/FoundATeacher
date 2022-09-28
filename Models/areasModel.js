const mongoose = require('mongoose');


const areasSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    city : { type:String, require:true},
    neighborhood : { type:String, require:true},
    area : { type:String, require:true}

});

module.exports = mongoose.model('areas',areasSchema );
