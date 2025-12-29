// const { string } = require('joi');
const mongoose = require('mongoose')


const  UserSchema = new mongoose.Schema({
    name : {
        type: String,
        min : 2,
        max: 50 ,
        required: true
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    
    password:{
        type: String,
        required: true
    },
   
    
   
   

    phone : String,
  
    
    image : String,
   
                    

},{
    timestamps: true , // createdAt , updated at 
    autoIndex: true,
    autoCreate: true
});
const UserModel = mongoose.model("AdminUser",UserSchema)
//authusers 
module.exports = UserModel;