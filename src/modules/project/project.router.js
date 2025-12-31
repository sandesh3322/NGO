const { logincheck } = require('../../middlewares/auth.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middleware');

const projectRouter = require('express').Router();
const projectCtrl = require('./project.controller');
const { ProjectCreateDTO, ProjectUpdateDTO } = require('./project.request');

projectRouter.get('/list-home', projectCtrl.listForHome);

projectRouter.get('/',logincheck, projectCtrl.index);


projectRouter.post('/',logincheck,setPath("project"),uploadFile("image").single("image"),bodyValidator(ProjectCreateDTO) , projectCtrl.create);
projectRouter.put('/:id',logincheck,setPath("project"),uploadFile("image").single("image"),bodyValidator(ProjectUpdateDTO) , projectCtrl.update);

projectRouter.get('/:id',logincheck,  projectCtrl.show);
projectRouter.delete('/:id',logincheck,  projectCtrl.delete);

module.exports = projectRouter;

