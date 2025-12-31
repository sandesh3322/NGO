const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilities/helpers");
const donationSvc= require("./donation.service");

class DonationController {

    #validateId = async (id) => {
       try{
        if(!id){
            throw { status: 400, message: "id is required"}
            
        }
        this.donationDetail = await donationSvc.getDetailByFilter({_id: id})
        if(!this.donationDetail){
            throw { status: 404, message: "donation not found"}
        }
       }catch(exception)
       {
        throw exception;
       }
    }

  create = async (req,res,next) => {
        try{
            const data = req.body;
            data.image= await uploadImage("./public/uploads/donation/"+req.file.filename)
            deleteFile(req.file.path)
            const donation = await donationSvc.create(data);

            res.json({
                result: donation,
                message: " donation created sucessfully",
                meta : null

            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
   update = async (req, res, next) => {
    try {
        const id = req.params.id;

        await this.#validateId(id);

        const data = req.body;

        // If admin is updating the status to verified or rejected, set verifiedBy
        if (req.authuser) {
            if (data.status && ["verified", "rejected"].includes(data.status)) {
                data.verifiedBy = req.authuser._id;
            }
        }

        if (req.file) {
            data.image = await uploadImage("./public/uploads/donation/" + req.file.filename);
        }

        const donation = await donationSvc.update(data, id);

        if (req.file) {
            deleteFile("./public/uploads/donation/" + req.file.filename);
        }

        res.json({
            result: donation,
            message: "Donation updated successfully",
            meta: null
        });

    } catch (exception) {
        next(exception);
    }
};

    delete = async(req, res, next) =>{
        try{
            const id = req.params.id
            await this.#validateId(id)
            const response = await donationSvc.deleteById(id)
            // todo delete image from cloudinary
            res.json({
                result: response ,
                meta: null,
                message : "donation deleted"
            })
        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req,res,next) =>{
        try{
            const list = await donationSvc.listData({
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
                message: " donation list"
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
                const {count ,data} = await donationSvc.listData({
                    skip: skip , 
                    filter: filter,
                    limit: limit

                });
                res.json({
                    result: data,
                    message: "donation list all ",
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
                result :this.donationDetail,
                message : " Donation fetched sucessfully ",
                meta : null
            })
        }catch(exception){
            next(exception)
        }

    }



}
module.exports = new DonationController();