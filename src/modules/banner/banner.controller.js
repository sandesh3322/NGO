const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilities/helpers");
const bannerSvc= require("./banner.service");

class BannerController {

    #validateId = async (id) => {
       try{
        if(!id){
            throw { status: 400, message: "id is required"}
            
        }
        this.bannerDetail = await bannerSvc.getDetailByFilter({_id: id})
        if(!this.bannerDetail){
            throw { status: 404, message: "banner not found"}
        }
       }catch(exception)
       {
        throw exception;
       }
    }

  create = async (req,res,next) => {
        try{
            const data = req.body;
            data.image= await uploadImage("./public/uploads/banner/"+req.file.filename)
            deleteFile(req.file.path)
            const banner = await bannerSvc.createBanner(data);
            data.createdBy = req.authuser._id;
            res.json({
                result: banner,
                message: " banner created sucessfully",
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
                data.image= await uploadImage("./public/uploads/banner/"+req.file.filename)
            }  
            const banner = await bannerSvc.updateBanner(data,id);
            if(req.file){
            deleteFile("./public/uploads/banner/"+req.file.filename)
            }
            res.json({
                result: banner,
                message: " banner updated sucessfully",
                meta : null })



        }catch(exception){
            next(exception)
    }  
 } ;
    delete = async(req, res, next) =>{
        try{
            const id = req.params.id
            await this.#validateId(id)
            const response = await bannerSvc.deleteById(id)
            // todo delete image from cloudinary
            res.json({
                result: response ,
                meta: null,
                message : "banner deleted"
            })
        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req,res,next) =>{
        try{
            const list = await bannerSvc.listData({
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
                message: " banner list"
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
                const {count ,data} = await bannerSvc.listData({
                    skip: skip , 
                    filter: filter,
                    limit: limit

                });
                res.json({
                    result: data,
                    message: "banner list all ",
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
                result :this.bannerDetail,
                message : " Banner fetched sucessfully ",
                meta : null
            })
        }catch(exception){
            next(exception)
        }

    }



}
module.exports = new BannerController();