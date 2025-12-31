const { logincheck } = require('../../middlewares/auth.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middleware');

const qrRouter = require('express').Router();
const qrCtrl = require('./qr.controller');
const { QrCreateDTO, QrUpdateDTO } = require('./qr.request');

qrRouter.get('/list-home', qrCtrl.listForHome);

qrRouter.get('/',logincheck, qrCtrl.index);


qrRouter.post('/',logincheck,setPath("qr"),uploadFile("image").single("image"),bodyValidator(QrCreateDTO) , qrCtrl.create);
qrRouter.put('/:id',logincheck,setPath("qr"),uploadFile("image").single("image"),bodyValidator(QrUpdateDTO) , qrCtrl.update);

qrRouter.get('/:id',logincheck,  qrCtrl.show);
qrRouter.delete('/:id',logincheck,  qrCtrl.delete);

module.exports = qrRouter;

