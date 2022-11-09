const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
   name:{
        type:String,
        requird:true
   },
   email:{
    type:String,
    requird:true,
    unique:true
},
password:{
    type:String,
    requird:true
},
date:{
    type:Date,
    default:Date.now
},
  });
const User = mongoose.model('user',UserSchema);
  module.exports = User;