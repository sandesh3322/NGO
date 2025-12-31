const { deleteCloudFile } = require("../../config/cloudinary.config")
const ChatModel = require("./chat.model")
class ChatService{
    createChat = async (data) => {
        try{
            const chat = new ChatModel(data)
            return await chat.save()
        }catch(exception)
        {
            throw exception
        }
    }
    listData = async ({skip=0 , limit=10,filter = {}}) =>{
        try{
            const count = await ChatModel.countDocuments(filter);
            const data = await  ChatModel.find(filter)
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
                const chatDetail = await ChatModel.findOne(filter)
                                        .populate("createdBy",["_id","name", "email", "role"])
                return chatDetail;
        }catch(exception){
            throw exception
        }
    }
    updateChat = async (data,id) => {
        try{
                const oldChat =  await ChatModel.findById(id)
              if(!oldChat){
                throw {status: 404, message :" chat not found " }
              }
               const updatedChat = await ChatModel.findByIdAndUpdate(
               id,
              { $set: data },
                { new: true } // IMPORTANT
                 );
                 if (data.image && oldChat.image) {
                      deleteCloudFile(oldChat.image)
                       
                       }
                return updatedChat
        }catch(exception){
            throw exception;
        }
    }
    deleteById = async (id) =>{
        try{
            const response = await ChatModel.findByIdAndDelete(id);
            await deleteCloudFile(response.image);

            
            if(!response){
                throw {status: 404, message :" chat not found " }
            }

            return response;
        }
        catch(exception){
            throw exception
        }
    }
}

module.exports = new ChatService ()