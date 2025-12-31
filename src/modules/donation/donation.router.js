const { logincheck } = require('../../middlewares/auth.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middleware');

const donationRouter = require('express').Router();
const donationCtrl = require('./donation.controller');
const { DonationCreateDTO, DonationUpdateDTO } = require('./donation.request');


donationRouter.get('/',logincheck, donationCtrl.index);


donationRouter.post('/',setPath("donation"),uploadFile("image").single("image"),bodyValidator(DonationCreateDTO) , donationCtrl.create);
donationRouter.put('/:id',logincheck,setPath("donation"),uploadFile("image").single("image"),bodyValidator(DonationUpdateDTO) , donationCtrl.update);

donationRouter.get('/:id',logincheck,  donationCtrl.show);
donationRouter.delete('/:id',logincheck,  donationCtrl.delete);

module.exports = donationRouter;

