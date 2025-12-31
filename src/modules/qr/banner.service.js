const { deleteCloudFile } = require("../../config/cloudinary.config")
const QrModel = require("./qr.model")
class QrService{
    createQr = async (data) => {
        try{
            const qr = new QrModel(data)
            return await qr.save()
        }catch(exception)
        {
            throw exception
        }
    }
    listData = async ({skip=0 , limit=10,filter = {}}) =>{
        try{
            const count = await QrModel.countDocuments(filter);
            const data = await  QrModel.find(filter)
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
                const qrDetail = await QrModel.findOne(filter)
                                        .populate("createdBy",["_id","name", "email", "role"])
                return qrDetail;
        }catch(exception){
            throw exception
        }
    }
    updateQr = async (data,id) => {
        try{
                const oldQr =  await QrModel.findById(id)
              if(!oldQr){
                throw {status: 404, message :" qr not found " }
              }
               const updatedQr = await QrModel.findByIdAndUpdate(
               id,
              { $set: data },
                { new: true } // IMPORTANT
                 );
                 if (data.image && oldQr.image) {
                      deleteCloudFile(oldQr.image)
                       
                       }
                return updatedQr
        }catch(exception){
            throw exception;
        }
    }
    deleteById = async (id) =>{
        try{
            const response = await QrModel.findByIdAndDelete(id);
            await deleteCloudFile(response.image);

            
            if(!response){
                throw {status: 404, message :" qr not found " }
            }

            return response;
        }
        catch(exception){
            throw exception
        }
    }
}

module.exports = new QrService ()