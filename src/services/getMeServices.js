const { HttpStatusCode } = require("../utils/cosnt");

const getMeServices = async (req, res, { adminUserManager, signToken }) => {
  const userById = await adminUserManager.getUserByPk(req.user.id);

  if (!userById) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ msg: "error" });
  }

  const token = signToken(userById.id, userById.role);

  const user = {
    id: userById.id,
    email: userById.email,
    name: userById.name,
    role: userById.role,
    token,
  };

  return res.status(HttpStatusCode.OK).json(user);
};

module.exports = getMeServices;
