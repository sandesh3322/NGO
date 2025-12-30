const multer = require('multer');
const fs=require('fs');
const { randomStringGenerator } = require('../utilities/helpers');


// user , banner , brand , products

const myStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        // dir where you want to upload your file 
        const path = "./public/uploads/"+req.uploadPath
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{recursive:true})
        }
        cb(null,path)
    },

    filename: (req,file,cb) =>{
        
        const ext = file.originalname.split(".").pop()
        const filename = randomStringGenerator(40)+"."+ext;
        // validation for extension
        cb(null,filename);

    }
})



const uploadFile = (fileType = "image") =>{
    let allowed = ['jpg','png','jpeg','svg','bmp','webp','gif']
    if(fileType === "document"){
        allowed = ['doc','docx','pdf','csv','xlsx','txt']
    }
    else if(fileType === "video"){
        allowed = ['mp4','mov','wav','mkv']
    }
    return  multer({
        storage: myStorage,
        limit: {
            fileSize: 4000000
        },
        fileFilter: (req,file,cb) => {
            const ext = file.originalname.split('.').pop()   // jpg
           
            if(allowed.includes(ext.toLocaleLowerCase())){
                cb(null,true)
            }else{
                cb({code:400, message: "file format not supported"},false);
            }
        }
    
    })
    
}

const setPath = (path) =>{
    return (req,res,next)=>{
        req.uploadPath = path;
        next();
    }

}

module.exports = {
    uploadFile,
    setPath
}





