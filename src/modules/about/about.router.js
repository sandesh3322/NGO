const { logincheck } = require('../../middlewares/auth.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middleware');

const aboutRouter = require('express').Router();
const aboutCtrl = require('./about.controller');
const { AboutCreateDTO, AboutUpdateDTO } = require('./about.request');

aboutRouter.get('/list-home', aboutCtrl.listForHome);

aboutRouter.get('/',logincheck, aboutCtrl.index);


aboutRouter.post('/',logincheck,setPath("about"),uploadFile("image").array("image",5),bodyValidator(AboutCreateDTO) , aboutCtrl.create);
aboutRouter.put('/:id',logincheck,setPath("about"),uploadFile("image").single("image",5),bodyValidator(AboutUpdateDTO) , aboutCtrl.update);

aboutRouter.get('/:id',logincheck,  aboutCtrl.show);
aboutRouter.delete('/:id',logincheck,  aboutCtrl.delete);

module.exports = aboutRouter;

