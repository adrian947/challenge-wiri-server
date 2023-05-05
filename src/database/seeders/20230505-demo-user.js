const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const userDoctor = {
  id: "ae940f2e-6723-4e2d-912a-73d46f413c32",
  email: "japon@japon.com",
  password: hashPassword("holamundo"),
  name: "Japon",
  role: "doctor",
  address: "AV Japon 166",
  coverage: false,
  schedule: JSON.stringify([
    {
      day: "Monday",
      daily_time: [{ start: "10:00", end: "18:00", interval: 60 }],
    },
  ]),
  photo_url: 'https://randomuser.me/api/portraits/men/92.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userPatient = {
  id: "6a7f6dc1-c6b9-4b4e-8dd4-4c84a56f23ad",
  email: "italia@italia.com",
  password: hashPassword("holamundo"),
  name: "Italia",
  role: "patient",
  schedule: null,
  coverage: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [userDoctor, userPatient]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", { id: user.id });
  },
};
