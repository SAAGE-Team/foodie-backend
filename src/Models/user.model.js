const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    names:{type:String , required:true },
<<<<<<< HEAD
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(email) {
            const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(email);
          },
          message: props => `${props.value} is not a valid email address!`
        }
      },
      telephone: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(telephone) {
            const telephoneRegex = /^\d{10}$/;
            return telephoneRegex.test(telephone);
          },
          message: props => `${props.value} is not a valid telephone number!`
        }
    },
    password:{
        type:String , 
        required:true
    },
    isAdmin:{
        type:Boolean,
=======
    telephone:{type:Number , required:true , uniques:true},
    email:{type:String , required:true , uniques:true},
    password:{type:String , required:true},
    isAdmin:{
>>>>>>> e5acdbc (user crud)
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('User',UserSchema)