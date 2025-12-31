const router = require("express").Router();
const aboutRouter = require("../modules/about/about.router");
const authRouter = require("../modules/auth/auth.router")
const bannerRouter = require("../modules/banner/banner.router");
const chatRouter = require("../modules/chat/chat.router");
const teamRouter = require("../modules/team/team.router");
const donationRouter = require("../modules/donation/donation.router");  
router.use("/auth", authRouter);
router.use("/banner", bannerRouter);
router.use("/team", teamRouter);
router.use("/about", aboutRouter);
router.use("/chat", chatRouter);
router.use("/donation", donationRouter);

module.exports = router;