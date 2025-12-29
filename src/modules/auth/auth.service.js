const UserModel = require("./auth.model");

class authService {
      getSingleUserByFilter = async (filter) => {
    try {
      const userDetail = await UserModel.findOne(filter);
      if (userDetail) {
        return userDetail;
      } else {
        throw { status: 404, message: "user does not exists" };
      }
    } catch (exception) {
      throw exception;
    }
  };
}
module.exports = new authService();