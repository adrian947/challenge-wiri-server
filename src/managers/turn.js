const { Op } = require("sequelize");
const { Turn } = require("../database/models");

module.exports = {
  createTurn: async (turn) => {
    const createdTurn = await Turn.create(turn);

    return createdTurn;
  },
  getTurns: async (query) => {
    const turnsList = await Turn.findAll({
      where: {
        createdAt: {
          [Op.between]: [query.startDate, query.endDate],
        },
      },
    });

    return turnsList;
  },
};
