const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilities/helpers");
const chatSvc= require("./chat.service");
const notifyAdminOnWhatsApp = require("../../utilities/service");

class ChatController {

    #validateId = async (id) => {
       try{
        if(!id){
            throw { status: 400, message: "id is required"}
            
        }
        this.chatDetail = await chatSvc.getDetailByFilter({_id: id})
        if(!this.chatDetail){
            throw { status: 404, message: "chat not found"}
        }
       }catch(exception)
       {
        throw exception;
       }
    }

  create = async (req,res,next) => {
        try{
            const data = req.body;
            const chat = await chatSvc.createChat(data);
              await notifyAdminOnWhatsApp(chat);
            res.json({
                result: chat,
                message: " chat created sucessfully",
                meta : null

            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    update = async (req,res,next) =>{
        try{
            const id = req.params.id;

            await this.#validateId(id)

            const data = req.body;
            if(req.file){
                data.image= await uploadImage("./public/uploads/chat/"+req.file.filename)
            }  
            const chat = await chatSvc.updateChat(data,id);
            if(req.file){
            deleteFile("./public/uploads/chat/"+req.file.filename)
            }
            res.json({
                result: chat,
                message: " chat updated sucessfully",
                meta : null })



        }catch(exception){
            next(exception)
    }  
 } ;
    delete = async(req, res, next) =>{
        try{
            const id = req.params.id
            await this.#validateId(id)
            const response = await chatSvc.deleteById(id)
            // todo delete image from cloudinary
            res.json({
                result: response ,
                meta: null,
                message : "chat deleted"
            })
        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req,res,next) =>{
        try{
            const list = await chatSvc.listData({
                limit: 5,
                filter : {
                    status: "active",
                    // startDate: {$lte: new Date()},
                    // endDate: {$gte: new Date()}
                }
            })
            res.json({
                result : list ,
                meta: null,
                message: " chat list"
            })
        }catch(exception){
                next(exception);
        }
    }
     index = async (req,res,next) =>{
        try{
            //load all data
            // pagination 
            // 100 data
            // 10 data perpage
            //total page = 10 => Math.ceil(totalPPAGES/LIMIT)
            // 1 - 100
                const page = +req.query.page || 1
                const limit = +req.query.limit || 10;
                const skip = (page-1) * limit ;
                let filter = {};
                if(req.query.search){
                    filter = {
                        // title 
                        title : new RegExp(req.query.search,'i') // case insensitive
                    }
                }
                const {count ,data} = await chatSvc.listData({
                    skip: skip , 
                    filter: filter,
                    limit: limit

                });
                res.json({
                    result: data,
                    message: "chat list all ",
                    meta: {
                        currentPage: page,
                        total : count ,
                        limit : limit 
                    }
                })



        }catch(exception){
            next(exception);
        }

    }
     show = async (req, res ,next) =>{
        try{
            const id = req.params.id;
           await  this.#validateId(id);
            res.json({
                result :this.chatDetail,
                message : " Chat fetched sucessfully ",
                meta : null
            })
        }catch(exception){
            next(exception)
        }

    }



}
module.exports = new ChatController();