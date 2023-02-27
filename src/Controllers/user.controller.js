const User = require('../Models/user.model')
const Cryptojs = require('crypto-js')
<<<<<<< HEAD
const jwt = require('jsonwebtoken')
=======
>>>>>>> e5acdbc (user crud)

exports.Register = async(req,res,next)=>{
    try {
        const hashedPassword = Cryptojs.AES.encrypt(req.body.password , process.env.PASS_SEC_KEY)
<<<<<<< HEAD
=======
        console.log(hashedPassword);
>>>>>>> e5acdbc (user crud)
        req.body.password = hashedPassword
        const user = await User.create(req.body)
        res.status(201).json({
            success:true,
            data:user
        })     
<<<<<<< HEAD
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send(err.message);
          } else {
            res.status(500).send(err.message);
          }
    }
}

// login
exports.Login = async(req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"wrong credentials"
            })
        }

        const hashedPassword = Cryptojs.AES.decrypt(user.password,process.env.PASS_SEC_KEY)
        const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8)

        if(originalPassword != req.body.password){
            return res.status(401).json({
                success:false,
                message:"false to login wrong username or password"
            })
        }
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        }, process.env.JWT_SECRET,{expiresIn:"2d"})

        const {password,...others} = user._doc
            res.status(200).json({
            success:true,
            data:{...others,accessToken}
            })

    } catch (err) {
        res.status(500).json({
            success:false,
            error_name :err.name,
            error:err.message
=======
    } catch (error) {
        res.status(500).json({
            success:false
>>>>>>> e5acdbc (user crud)
        })
    }
}

exports.GetAllUser = async(req,res,next)=>{
<<<<<<< HEAD
    try {
        const users = await User.find()
        if(!users){
            return res.status(400).json({
                message:"no users found"
            })
        }
        res.status(200).json({
            success:true,
            data:users
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            error_name :err.name,
            error:err.message
        })
    }
   
=======
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
>>>>>>> e5acdbc (user crud)
}

// get a single user

exports.GetAUser = async (req,res,next)=>{
    try {
<<<<<<< HEAD
        const user = await User.findById(req.params.id)
=======
        const user =  await User.findById(req.params.id).toString()
>>>>>>> e5acdbc (user crud)
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
<<<<<<< HEAD
    } catch (err) {
        res.status(500).json({
            success:false,
            error_name :err.name,
            error:err.message
=======
    } catch (error) {
        res.status(500).json({
            success:false
>>>>>>> e5acdbc (user crud)
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
<<<<<<< HEAD
            message:"user  deleted successful"
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            error_name :err.name,
            error:err.message
=======
            message:"user is deleted successful"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
>>>>>>> e5acdbc (user crud)
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
<<<<<<< HEAD
    } catch (err) {
        res.status(500).json({
            success:false,
            error_name :err.name,
            error:err.message
        })
=======
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        console.log(error);
>>>>>>> e5acdbc (user crud)
    }
}