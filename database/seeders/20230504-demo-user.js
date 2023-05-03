const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const userDoctor = {
  id: '5e73947a-87b5-4f23-8d8b-79e9e1a7c476',
  email: 'jamaica@jamaica.com',
  password: hashPassword('holamundo'),
  name: 'Jamaica',
  role: 'doctor',
  address: 'AV Jamaica 166',
  schedule: JSON.stringify([
    {
      day: 'Thursday',
      daily_time: [
        { start: '10:00', end: '13:00', interval: 20 },
        { start: '14:30', end: '17:00', interval: 20 },
      ],
    },
    {
      day: 'Saturday',
      daily_time: [{ start: '16:15', end: '20:00', interval: 40 }],
    },
  ]),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userPatient = {
  id: 'b8f3bf3e-6efc-4b3d-8da4-4f9e0d4c4c52',
  email: 'rumania@rumania.com',
  password: hashPassword('holamundo'),
  name: 'Rumania',
  role: 'patient',
  schedule: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [userDoctor, userPatient]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { id: user.id });
  }
};
