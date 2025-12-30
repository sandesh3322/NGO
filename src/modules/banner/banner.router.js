const { logincheck } = require('../../middlewares/auth.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middleware');

const bannerRouter = require('express').Router();
const bannerCtrl = require('./banner.controller');
const { BannerCreateDTO, BannerUpdateDTO } = require('./banner.request');

bannerRouter.get('/list-home', bannerCtrl.listForHome);

bannerRouter.get('/',logincheck, bannerCtrl.index);


bannerRouter.post('/',logincheck,setPath("banner"),uploadFile("image").single("image"),bodyValidator(BannerCreateDTO) , bannerCtrl.create);
bannerRouter.put('/:id',logincheck,setPath("banner"),uploadFile("image").single("image"),bodyValidator(BannerUpdateDTO) , bannerCtrl.update);

bannerRouter.get('/:id',logincheck,  bannerCtrl.show);
bannerRouter.delete('/:id',logincheck,  bannerCtrl.delete);

module.exports = bannerRouter;

