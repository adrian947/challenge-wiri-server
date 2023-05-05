const { Op, Sequelize } = require("sequelize");
const { Turn, User } = require("../database/models");

module.exports = {
  createTurns: async (turn) => {
    const createdTurn = await Turn.bulkCreate(turn);

    return createdTurn;
  },
  getTurns: async (type) => {
    const turnsList = await Turn.findAll({
      where: type,
      include: [
        { model: User, as: "doctor", attributes: ["id", "name", "address"] },
      ],
      order: [
        ["date", "ASC"],
        ["hour", "ASC"],
      ],
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

  cancelTurn: async (id) => {
    const updatedTurn = await Turn.update(
      { status: "available", id_patient: null },
      {
        where: { id },
        returning: true,
      }
    );

    const [turnUp] = updatedTurn[1];

    return turnUp;
  },
};
