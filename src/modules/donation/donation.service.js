const { deleteCloudFile } = require("../../config/cloudinary.config")
const DonationModel = require("./donation.model")
class DonationService{
    createDonation = async (data) => {
        try{
            const donation = new DonationModel(data)
            return await donation.save()
        }catch(exception)
        {
            throw exception
        }
    }
    listData = async ({skip=0 , limit=10,filter = {}}) =>{
        try{
            const count = await DonationModel.countDocuments(filter);
            const data = await  DonationModel.find(filter)
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
                const donationDetail = await DonationModel.findOne(filter)
                                        .populate("createdBy",["_id","name", "email", "role"])
                return donationDetail;
        }catch(exception){
            throw exception
        }
    }
    updateDonation = async (data,id) => {
        try{
                const oldDonation =  await DonationModel.findById(id)
              if(!oldDonation){
                throw {status: 404, message :" donation not found " }
              }
               const updatedDonation = await DonationModel.findByIdAndUpdate(
               id,
              { $set: data },
                { new: true } // IMPORTANT
                 );
                 if (data.image && oldDonation.image) {
                      deleteCloudFile(oldDonation.image)
                       
                       }
                return updatedDonation
        }catch(exception){
            throw exception;
        }
    }
    deleteById = async (id) =>{
        try{
            const response = await DonationModel.findByIdAndDelete(id);
            await deleteCloudFile(response.image);

            
            if(!response){
                throw {status: 404, message :" donation not found " }
            }

            return response;
        }
        catch(exception){
            throw exception
        }
    }
}

module.exports = new DonationService()