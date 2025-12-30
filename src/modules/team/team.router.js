const { logincheck } = require('../../middlewares/auth.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middleware');

const teamRouter = require('express').Router();
const teamCtrl = require('./team.controller');
const { TeamCreateDTO, TeamUpdateDTO } = require('./team.request');

teamRouter.get('/list-home', teamCtrl.listForHome);

teamRouter.get('/',logincheck, teamCtrl.index);


teamRouter.post('/',logincheck,setPath("team"),uploadFile("image").single("image"),bodyValidator(TeamCreateDTO) , teamCtrl.create);
teamRouter.put('/:id',logincheck,setPath("team"),uploadFile("image").single("image"),bodyValidator(TeamUpdateDTO) , teamCtrl.update);

teamRouter.get('/:id',logincheck,  teamCtrl.show);
teamRouter.delete('/:id',logincheck,  teamCtrl.delete);

module.exports = teamRouter;

