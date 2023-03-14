const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'Unauthorized access. No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token.' });
  }
}

const verifyTokenAndAuthorisation = (req,res,next)=>{
    verifyToken(req,res , ()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("you are not allowed to do that")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,next , ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed to do that")
        }
    })
}

module.exports={verifyToken,verifyTokenAndAuthorisation,verifyTokenAndAdmin}