const { deleteCloudFile } = require("../../config/cloudinary.config")
const TeamModel = require("./team.model")
class TeamService{
    createTeam = async (data) => {
        try{
            const banner = new TeamModel(data)
            return await banner.save()
        }catch(exception)
        {
            throw exception
        }
    }
    listData = async ({skip=0 , limit=10,filter = {}}) =>{
        try{
            const count = await TeamModel.countDocuments(filter);
            const data = await  TeamModel.find(filter)
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
                const bannerDetail = await TeamModel.findOne(filter)
                                        .populate("createdBy",["_id","name", "email", "role"])
                return bannerDetail;
        }catch(exception){
            throw exception
        }
    }
    updateTeam = async (data,id) => {
        try{
                const oldTeam =  await TeamModel.findById(id)
              if(!oldTeam){
                throw {status: 404, message :" banner not found " }
              }
               const updatedTeam = await TeamModel.findByIdAndUpdate(
               id,
              { $set: data },
                { new: true } // IMPORTANT
                 );
                 if (data.image && oldTeam.image) {
                      deleteCloudFile(oldTeam.image)
                       
                       }
                return updatedTeam
        }catch(exception){
            throw exception;
        }
    }
    deleteById = async (id) =>{
        try{
            const response = await TeamModel.findByIdAndDelete(id);
            await deleteCloudFile(response.image);

            
            if(!response){
                throw {status: 404, message :" banner not found " }
            }

            return response;
        }
        catch(exception){
            throw exception
        }
    }
}

module.exports = new TeamService ()