const authService = require("./auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // make sure this is imported
const userSvc = require("./auth.service"); // you used userSvc in refreshToken

class AuthController {

  // login method
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.getSingleUserByFilter({ email });
      if (!user) throw { status: 401, message: "invalid credentials" };

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw { status: 401, message: "invalid credentials" };

      const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
      const refreshToken = jwt.sign(
        { sub: user._id, type: "refresh" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        result: {
          userDetail: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: { token, refreshToken }
        },
        message: "Login successful",
        meta: null
      });
    } catch (error) {
      next(error);
    }
  }

  async getLoggedInUser(req, res, next) {
    try {
      res.json({
        result: req.authuser,
        message: "your profile",
        meta: null
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      let token = req.headers['authorization'];
      if (!token) throw { status: 401, message: "token required" };
      token = token.split(" ").pop();

      const { sub, type } = jwt.verify(token, process.env.JWT_SECRET);
      if (!type || type !== "refresh") throw { status: 401, message: "refresh token required" };

      const user = await userSvc.getSingleUserByFilter({ _id: sub });

      const accessToken = jwt.sign({ sub: sub }, process.env.JWT_SECRET, { expiresIn: "1d" });
      const refreshToken = jwt.sign({ sub: sub, type: "refresh" }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.json({
        result: { token: accessToken, refreshToken },
        message: "token refresh successful",
        meta: null
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
