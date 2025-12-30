const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({

    
    title: { 
        type:String,
        required: true,
        min: 3,
        max: 100
    } ,
    image:{
        type: String,
        required: true,

    },
    link :{
      type: String,
      default: null


    },
   

    status:{ 
        type: String ,
        enum: ["active", "inactive"],
        default: "inactive"
        
    },
    createdBy:{
     type : mongoose.Schema.Types.ObjectId,
     ref : "AdminUser",
     default : null
    },   
        
      

},{
    timestamps: true,
    autoIndex : true,
    autoCreate: true,
})

const BannerModel = mongoose.model("Banner", BannerSchema);

module.exports = BannerModel;
