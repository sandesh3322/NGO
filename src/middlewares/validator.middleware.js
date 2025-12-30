const { deleteFile } = require("../utilities/helpers");
const bodyValidator = (schema) => {
    return async (req, res , next) =>{
        try{
            const data = req.body;
        if(req.file){
            
            data[req.file.fieldname] = req.file.filename
        }
       
        await schema.validateAsync(data,{abortEarly: false})
        next();
        }
        catch(exception){
          
            let detail = {};

            if(req.file){
                deleteFile("./"+ req.file.path)
            }
            exception.details.map((error)=>{

                detail[error['path'][0]] = error.message
                
            })

            next({status : 400, detail: detail })
        }
    }
}

module.exports = {
    bodyValidator
}