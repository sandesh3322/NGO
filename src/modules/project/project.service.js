const { deleteCloudFile } = require("../../config/cloudinary.config")
const ProjectModel = require("./project.model")
class ProjectService{
    createProject = async (data) => {
        try{
            const project = new ProjectModel(data)
            return await project.save()
        }catch(exception)
        {
            throw exception
        }
    }
    listData = async ({skip=0 , limit=10,filter = {}}) =>{
        try{
            const count = await ProjectModel.countDocuments(filter);
            const data = await  ProjectModel.find(filter)
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
                const projectDetail = await ProjectModel.findOne(filter)
                                        .populate("createdBy",["_id","name", "email", "role"])
                return projectDetail;
        }catch(exception){
            throw exception
        }
    }
    updateProject = async (data,id) => {
        try{
                const oldProject =  await ProjectModel.findById(id)
              if(!oldProject){
                throw {status: 404, message :" project not found " }
              }
               const updatedProject = await ProjectModel.findByIdAndUpdate(
               id,
              { $set: data },
                { new: true } // IMPORTANT
                 );
                 if (data.image && oldProject.image) {
                      deleteCloudFile(oldProject.image)
                       
                       }
                return updatedProject
        }catch(exception){
            throw exception;
        }
    }
    deleteById = async (id) =>{
        try{
            const response = await ProjectModel.findByIdAndDelete(id);
            await deleteCloudFile(response.image);

            
            if(!response){
                throw {status: 404, message :" project not found " }
            }

            return response;
        }
        catch(exception){
            throw exception
        }
    }
}

module.exports = new ProjectService ()