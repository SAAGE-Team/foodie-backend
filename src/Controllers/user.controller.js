const User = require('../Models/user.model')
const Cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')
const generateRandomAlphaNumericCode = require('../Utils/random')
const sendEmail = require('../Utils/sendEmail')

exports.Register = async(req,res,next)=>{
    try {
        const hashedPassword = Cryptojs.AES.encrypt(req.body.password , process.env.PASS_SEC_KEY)
        req.body.password = hashedPassword
        const code = generateRandomAlphaNumericCode()
        const user = new User({
            names: req.body.names,
            telephone:req.body.telephone,
            email:req.body.email,
            password:req.body.password,
            emailVerificationCode: code,
            emailVerificationCodeExpires: (Date.now()) + (10 * 60 * 1000)
        })
        await user.save()
        if(user){
            sendEmail({
                to:user.email,
                subject:'Email verification',
                from:`${process.env.EMAIL_USER}`,
                text:`
                <h1>Confirm your email address</h1>
                  <h2>Your confirmation code is below — enter it in your open browser window and we'll help you get signed in.</h2>
                  <h2>This code will expire in 10 minutes</h2>
                  <br>
                  <h1>${code}</h1>
                  <br>
                  <h3>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</h3>
                  <h3>Thanks for using Ederner</h3>
                
                `
            })
            return res.status(201).json({
                message:"verificaton code sent to your email"
            })
        }else{
            return res.status(400).json({
                message:"unable to create user"
            })
        }     
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send(err.message);
          } else {
            res.status(500).send(err.message);
          }
    }
}

//verify email
exports.VerifyEmail = async (req,res) => {
    try {
        const { email, code } = req.body;
      const { emailVerificationCode, emailVerificationCodeExpiresAt } = await User.findOne({ email });
      
      if (!emailVerificationCode) {
        return "email already verified";
      }
      
      if (emailVerificationCode !== code) {
        return "invalid verification code";
      }
      
      if (emailVerificationCodeExpiresAt && emailVerificationCodeExpiresAt < Date.now()) {
        return "verification code has expired";
      }
      
      await User.update({
        where: { email },
        data: {
          emailVerified: true,
          emailVerificationCode: null,
          emailVerificationCodeExpiresAt: null,
        },
      });
      
      return "email verified";
    } catch (error) {
      console.error(error);
      return "error verifying email";
    }
  };
  
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
        })
    }
}

exports.GetAllUser = async(req,res,next)=>{
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
   
}

// get a single user

exports.GetAUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
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
    } catch (err) {
        res.status(500).json({
            success:false,
            error_name :err.name,
            error:err.message
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
            message:"user  deleted successful"
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            error_name :err.name,
            error:err.message
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
    } catch (err) {
        res.status(500).json({
            success:false,
            error_name :err.name,
            error:err.message
        })
    }
}