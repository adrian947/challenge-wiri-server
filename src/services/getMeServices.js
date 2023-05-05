const getMeServices = async (req, res, { adminUserManager, signToken }) => {
  const userById = await adminUserManager.getUserByPk(req.user.id);

  if (!userById) {
    return res.status(400).json({ msg: "error" });
  }

  const token = signToken(userById.id, userById.role);

  const user = {
    id: userById.id,
    email: userById.email,
    name: userById.name,
    role: userById.role,
    token,
  };

  return res.status(200).json(user);
};

module.exports = getMeServices;
