const { User } = require("../database/models");

module.exports = {
  getUser: async (email) => {
    const user = await User.findOne({ where: { email } });

    return user;
  },

  getUserByPk: async (id) => {
    const user = await User.findByPk(id);

    return user;
  },

  getUserById: async (id) => {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    return user;
  },
};
