const { logincheck } = require('../../middlewares/auth.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middleware');

const chatRouter = require('express').Router();
const chatCtrl = require('./chat.controller');
const { ChatCreateDTO, ChatUpdateDTO } = require('./chat.request');

chatRouter.get('/list-home',logincheck, chatCtrl.listForHome);

chatRouter.get('/',logincheck, chatCtrl.index);


chatRouter.post('/',bodyValidator(ChatCreateDTO) , chatCtrl.create);
chatRouter.put('/:id',logincheck,bodyValidator(ChatUpdateDTO) , chatCtrl.update);

chatRouter.get('/:id',logincheck,  chatCtrl.show);
chatRouter.delete('/:id',logincheck,  chatCtrl.delete);

module.exports = chatRouter;

