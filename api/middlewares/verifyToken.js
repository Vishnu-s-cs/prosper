const jwt = require("jsonwebtoken");
const User=require('../models/User')
function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
   
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) res.status(404).json("Token is not valid!")&&next([err]);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}
const verifyTokenAndAdmin=(req,res,next)=>{
  verify(req,res,()=>{
      if(req.user.isAdmin){
          next()
      }else{
          res.status(403).json("you are not allowed to do that")
      }

  })
}

const verifyTokenAndAuthorization=(req,res,next)=>{
  verify(req,res,async()=>{
    const user = await User.findOne({
      email: req.user.email
    });
   
      if(!user.blocked&&req.params.id===req.user.id|| req.user.isAdmin){
          next()
      }else{
          res.status(403).json('you are not allowed to to that!')
      }
  })
}
module.exports = {verify,verifyTokenAndAdmin,verifyTokenAndAuthorization};


