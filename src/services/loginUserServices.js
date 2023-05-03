const loginUserServices = async (
  req,
  res,
  { adminUserManager, bcrypt, signToken }
) => {
  const { email, password } = req.body;
  const userByEmail = await adminUserManager.getUser(email);

  if (!userByEmail) {
    return res.status(400).json({ msg: "incorrect user or password" });
  }

  const comparePassword = bcrypt.compareSync(password, userByEmail.password);

  if (!comparePassword) {
    return res.status(400).json({ msg: "incorrect user or password" });
  }

  const token = signToken(userByEmail.id, userByEmail.role);

  const user = {
    id: userByEmail.id,
    email: userByEmail.email,
    role: userByEmail.role,
    token,
  };

  return res.status(200).json(user);
};
module.exports = loginUserServices;
