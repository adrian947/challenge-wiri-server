const { HttpStatusCode } = require("../utils/cosnt");

const loginUserServices = async (
  req,
  res,
  { adminUserManager, bcrypt, signToken }
) => {
  const { email, password } = req.body;
  try {
    const userByEmail = await adminUserManager.getUser(email);

    if (!userByEmail) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ msg: "incorrect user or password" });
    }

    const comparePassword = bcrypt.compareSync(password, userByEmail.password);

    if (!comparePassword) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ msg: "incorrect user or password" });
    }

    const token = signToken(userByEmail.id, userByEmail.role);

    const user = {
      id: userByEmail.id,
      email: userByEmail.email,
      name: userByEmail.name,
      role: userByEmail.role,
      coverage: userByEmail.coverage,
      token,
    };

    return res.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    throw error;
  }
};
module.exports = loginUserServices;
