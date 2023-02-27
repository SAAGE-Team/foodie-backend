const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    names:{type:String , required:true },
    telephone:{type:Number , required:true , uniques:true},
    email:{type:String , required:true , uniques:true},
    password:{type:String , required:true},
    isAdmin:{
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('User',UserSchema)