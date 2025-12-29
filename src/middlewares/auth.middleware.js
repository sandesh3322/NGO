
const jwt = require("jsonwebtoken")
const authService = require("../modules/auth/auth.service") 

const logincheck = async (req,res,next) =>{

  try{
    let token = req.headers['authorization'] || null
    if(!token){
      throw {status:401, message: "unauthorized access"}
    }else{
      // bearer token
      token = token.split(" ").pop()
   
      const data = jwt.verify(token, process.env.JWT_SECRET);

      if(data.hasOwnProperty("type")){
        throw {status: 403 , message: "Access token required"}
      }
      const user = await authService.getSingleUserByFilter({
        _id : data.sub
      })
     req.authuser ={
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone ,
      image: user.image  || null
     }
     next()
    }
  } catch (exception){
    console.log(exception)
    next({status:401,message:exception.message})

  }
    
  
}

module.exports = {
    logincheck
}