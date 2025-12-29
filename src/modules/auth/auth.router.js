const authRouter = require("express").Router();
const {bodyValidator} = require("../../middlewares/validator.middleware");
const LoginDTO = require("./auth.request");
const authController = require("./auth.controller");
const {logincheck} = require("../../middlewares/auth.middleware");

authRouter.post("/login", bodyValidator(LoginDTO), authController.login);
authRouter.get("/refresh",authController.refreshToken)
authRouter.get("/me",logincheck ,authController.getLoggedInUser);


module.exports = authRouter;
