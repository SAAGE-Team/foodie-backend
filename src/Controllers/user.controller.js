const User = require('../Models/user.model')
const Cryptojs = require('crypto-js')

exports.Register = async(req,res,next)=>{
    try {
        const hashedPassword = Cryptojs.AES.encrypt(req.body.password , process.env.PASS_SEC_KEY)
        console.log(hashedPassword);
        req.body.password = hashedPassword
        const user = await User.create(req.body)
        res.status(201).json({
            success:true,
            data:user
        })     
    } catch (error) {
        res.status(500).json({
            success:false
        })
    }
}

exports.GetAllUser = async(req,res,next)=>{
    const users = User.find()
    if(!users){
        return res.status(400).json({
            message:"no users found"
        })
    }
    res.status(200).json({
        success:true,
        data:users
    })
}

// get a single user

exports.GetAUser = async (req,res,next)=>{
    try {
        const user =  await User.findById(req.params.id).toString()
        if(!user){
            return res.status(400).json({
                message:"no user found!"
            })
        }
        const {password,...others} = user._doc
        res.status(200).json({
        success:true,
        data:{...others}
        })
    } catch (error) {
        res.status(500).json({
            success:false
        })
    }
}

// delete user
exports.DeleteUser = async (req,res,next)=>{
    try {
        const user =  await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).json({
                message:" No users found!"
            })
        }
        res.status(200).json({
            success:true,
            message:"user is deleted successful"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
// update user

exports.UpdateUser = async (req,res,next)=>{
        if(req.body.password){
            req.body.password = Cryptojs.AES.encrypt(req.body.password , process.env.PASS_SEC_KEY).toString();
            }
    try {
        const user =  await User.findByIdAndUpdate(req.params.id , {$set:req.body},{new:true})
        if(!user){
            return res.status(400).json({
                message:"no users found!"
            })
        }
        const {password,...others} = user._doc
        res.status(200).json({
        success:true,
        data:{...others},
        message:"user updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        console.log(error);
    }
}