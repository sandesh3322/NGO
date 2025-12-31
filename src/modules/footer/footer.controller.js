const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilities/helpers");
const footerSvc= require("./footer.service");

class FooterController {

    #validateId = async (id) => {
       try{
        if(!id){
            throw { status: 400, message: "id is required"}
            
        }
        this.footerDetail = await footerSvc.getDetailByFilter({_id: id})
        if(!this.footerDetail){
            throw { status: 404, message: "footer not found"}
        }
       }catch(exception)
       {
        throw exception;
       }
    }

  create = async (req,res,next) => {
        try{
            const data = req.body;
            data.image= await uploadImage("./public/uploads/footer/"+req.file.filename)
            deleteFile(req.file.path)
            const footer = await footerSvc.createFooter(data);
            data.createdBy = req.authuser._id;
            res.json({
                result: footer,
                message: " footer created sucessfully",
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
                data.image= await uploadImage("./public/uploads/footer/"+req.file.filename)
            }  
            const footer = await footerSvc.updateFooter(data,id);
            if(req.file){
            deleteFile("./public/uploads/footer/"+req.file.filename)
            }
            res.json({
                result: footer,
                message: " footer updated sucessfully",
                meta : null })



        }catch(exception){
            next(exception)
    }  
 } ;
    delete = async(req, res, next) =>{
        try{
            const id = req.params.id
            await this.#validateId(id)
            const response = await footerSvc.deleteById(id)
            // todo delete image from cloudinary
            res.json({
                result: response ,
                meta: null,
                message : "footer deleted"
            })
        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req,res,next) =>{
        try{
            const list = await footerSvc.listData({
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
                message: " footer list"
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
                const {count ,data} = await footerSvc.listData({
                    skip: skip , 
                    filter: filter,
                    limit: limit

                });
                res.json({
                    result: data,
                    message: "footer list all ",
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
                result :this.footerDetail,
                message : " Footer fetched sucessfully ",
                meta : null
            })
        }catch(exception){
            next(exception)
        }

    }



}
module.exports = new FooterController();