const { deleteCloudFile } = require("../../config/cloudinary.config")
const FooterModel = require("./footer.model")
class FooterService{
    createFooter = async (data) => {
        try{
            const footer = new FooterModel(data)
            return await footer.save()
        }catch(exception)
        {
            throw exception
        }
    }
    listData = async ({skip=0 , limit=10,filter = {}}) =>{
        try{
            const count = await FooterModel.countDocuments(filter);
            const data = await  FooterModel.find(filter)
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
                const footerDetail = await FooterModel.findOne(filter)
                                        .populate("createdBy",["_id","name", "email", "role"])
                return footerDetail;
        }catch(exception){
            throw exception
        }
    }
    updateFooter = async (data,id) => {
        try{
                const oldFooter =  await FooterModel.findById(id)
              if(!oldFooter){
                throw {status: 404, message :" footer not found " }
              }
               const updatedFooter = await FooterModel.findByIdAndUpdate(
               id,
              { $set: data },
                { new: true } // IMPORTANT
                 );
                 if (data.image && oldFooter.image) {
                      deleteCloudFile(oldFooter.image)
                       
                       }
                return updatedFooter
        }catch(exception){
            throw exception;
        }
    }
    deleteById = async (id) =>{
        try{
            const response = await FooterModel.findByIdAndDelete(id);
            await deleteCloudFile(response.image);

            
            if(!response){
                throw {status: 404, message :" footer not found " }
            }

            return response;
        }
        catch(exception){
            throw exception
        }
    }
}

module.exports = new FooterService ()