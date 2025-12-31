const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    
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
    
   

    status:{ 
        type: String ,
        enum: ["active", "inactive"],
        default: "inactive"
        
    },
    description:{ 
        type: String, 
        default: null
     }  

}, {
    timestamps: true,
    autoIndex : true,
    autoCreate: true,
})

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
