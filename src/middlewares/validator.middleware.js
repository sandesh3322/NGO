const bodyValidator = (schema) => {
    return async (req, res , next) =>{
        try{
            const data = req.body;
        if(req.file){
            // console.log(req.file)  if({.....field :"image"})
            // data.image 
            data[req.file.fieldname] = req.file.filename
        }
        else if(req.files){
            //todo: manipulate
        }
        await schema.validateAsync(data,{abortEarly: false})
        next();
        }
        catch(exception){
            // console.log(exception);
            // const code = 400 ;
            let detail = {};
            if(req.file){
                deleteFile("./"+ req.file.path)
            }
            exception.details.map((error)=>{
                // console.log(error)
                detail[error['path'][0]] = error.message
                
            })

            next({status : 400, detail: detail })
            // next({})
        }
    }
}

module.exports = {
    bodyValidator
}