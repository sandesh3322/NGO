const { deleteCloudFile } = require("../../config/cloudinary.config")
const AboutModel = require("./about.model")
class AboutService{
    createAbout = async (data) => {
        try{
            const about = new AboutModel(data)
            return await about.save()
        }catch(exception)
        {
            throw exception
        }
    }
    listData = async ({skip=0 , limit=10,filter = {}}) =>{
        try{
            const count = await AboutModel.countDocuments(filter);
            const data = await  AboutModel.find(filter)
                                .sort({_id: "desc"}) // latest on top 
                                .limit(limit)
                                .skip(skip)
            return { count , data}
        }
        catch(exception){
            throw exception
        }
    }
    getDetailByFilter= async (filter) => {
        try{
                const aboutDetail = await AboutModel.findOne(filter)
                                        .populate("createdBy",["_id","name", "email", "role"])
                return aboutDetail;
        }catch(exception){
            throw exception
        }
    }
    updateAbout = async (data,id) => {
        try{
                const oldAbout =  await AboutModel.findById(id)
              if(!oldAbout){
                throw {status: 404, message :" about not found " }
              }
               const updatedAbout = await AboutModel.findByIdAndUpdate(
               id,
              { $set: data },
                { new: true } // IMPORTANT
                 );
                 if (data.image && oldAbout.image) {
                      deleteCloudFile(oldAbout.image)
                       
                       }
                return updatedAbout
        }catch(exception){
            throw exception;
        }
    }
    deleteById = async (id) =>{
        try{
            const response = await AboutModel.findByIdAndDelete(id);
            await deleteCloudFile(response.image);

            
            if(!response){
                throw {status: 404, message :" about not found " }
            }

            return response;
        }
        catch(exception){
            throw exception
        }
    }
}

module.exports = new AboutService ()