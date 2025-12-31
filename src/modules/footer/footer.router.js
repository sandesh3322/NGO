const { logincheck } = require('../../middlewares/auth.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middleware');

const footerRouter = require('express').Router();
const footerCtrl = require('./footer.controller');
const { FooterCreateDTO, FooterUpdateDTO } = require('./footer.request');

footerRouter.get('/list-home', footerCtrl.listForHome);

footerRouter.get('/',logincheck, footerCtrl.index);


footerRouter.post('/',logincheck,setPath("footer"),uploadFile("image").single("image"),bodyValidator(FooterCreateDTO) , footerCtrl.create);
footerRouter.put('/:id',logincheck,setPath("footer"),uploadFile("image").single("image"),bodyValidator(FooterUpdateDTO) , footerCtrl.update);

footerRouter.get('/:id',logincheck,  footerCtrl.show);
footerRouter.delete('/:id',logincheck,  footerCtrl.delete);

module.exports = footerRouter;

