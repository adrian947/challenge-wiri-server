const { Op, Sequelize } = require("sequelize");
const { Turn, User } = require("../database/models");

module.exports = {
  createTurns: async (turn) => {
    const createdTurn = await Turn.bulkCreate(turn);

    return createdTurn;
  },
  getTurns: async (query, doctorId) => {    
    const turnsList = await Turn.findAll({
      where: {
        date: {
          [Op.gte]: query,
        },
        status: "available",
        id_doctor: doctorId,
      },
      include: [{ model: User, as: "doctor", attributes: ["id", "name", "address"] }],
    });

    return turnsList;
  },

  getTurnById: async (id) => {
    const turn = await Turn.findByPk(id);
    return turn;
  },

  findTurnsByDate: async (dateList, hourList) => {
    const updatedTurn = await Turn.findAll({
      where: {
        date: { [Op.in]: dateList },
        hour: { [Op.in]: hourList },
        status: "busy",
      },
    });
    return updatedTurn;
  },

  updatedTurn: async ({ values, turn }) => {
    const updatedTurn = await Turn.update(values, {
      where: { date: turn.date, hour: turn.hour },
      returning: true,
    });

    const [turnUp] = updatedTurn[1];

    return turnUp;
  },
};
