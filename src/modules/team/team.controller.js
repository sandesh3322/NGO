const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilities/helpers");
const teamSvc= require("./team.service");

class TeamController {

    #validateId = async (id) => {
       try{
        if(!id){
            throw { status: 400, message: "id is required"}
            
        }
        this.teamDetail = await teamSvc.getDetailByFilter({_id: id})
        if(!this.teamDetail){
            throw { status: 404, message: "team not found"}
        }
       }catch(exception)
       {
        throw exception;
       }
    }

  create = async (req,res,next) => {
        try{
            const data = req.body;
            data.image= await uploadImage("./public/uploads/team/"+req.file.filename)
            deleteFile(req.file.path)
            const team = await teamSvc.createTeam(data);
            data.createdBy = req.authuser._id;
            res.json({
                result: team,
                message: " team created sucessfully",
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
                data.image= await uploadImage("./public/uploads/team/"+req.file.filename)
            }  
            const team = await teamSvc.updateTeam(data,id);
            if(req.file){
            deleteFile("./public/uploads/team/"+req.file.filename)
            }
            res.json({
                result: team,
                message: " team updated sucessfully",
                meta : null })



        }catch(exception){
            next(exception)
    }  
 } ;
    delete = async(req, res, next) =>{
        try{
            const id = req.params.id
            await this.#validateId(id)
            const response = await teamSvc.deleteById(id)
            // todo delete image from cloudinary
            res.json({
                result: response ,
                meta: null,
                message : "team deleted"
            })
        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req,res,next) =>{
        try{
            const list = await teamSvc.listData({
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
                message: " team list"
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
                const {count ,data} = await teamSvc.listData({
                    skip: skip , 
                    filter: filter,
                    limit: limit

                });
                res.json({
                    result: data,
                    message: "team list all ",
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
                result :this.teamDetail,
                message : " Team fetched sucessfully ",
                meta : null
            })
        }catch(exception){
            next(exception)
        }

    }



}
module.exports = new TeamController();