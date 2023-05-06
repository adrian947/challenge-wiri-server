const { Op } = require("sequelize");
const { Turn, User } = require("../database/models");

module.exports = {
  createTurns: async (turn) => {
    const createdTurn = await Turn.bulkCreate(turn);

    return createdTurn;
  },

  getTurnsForPatient: async (query) => {
    const turnsList = await Turn.findAll({
      where: query,
      include: [
        {
          model: User,
          as: "doctor",
          attributes: ["id", "name", "address", "coverage", "photo_url"],
        },
      ],
      order: [
        ["date", "ASC"],
        ["hour", "ASC"],
      ],
    });

    return turnsList;
  },

  getTurnsForDoctor: async ({ id_doctor, start_date, end_date }) => {
    const whereQuery = {};
    if (start_date && end_date) {
      whereQuery.date = {
        [Op.between]: [start_date, end_date],
      };
    }
    if (start_date && !end_date) {
      whereQuery.date = {
        [Op.gte]: start_date,
      };
    }
    if (!start_date && end_date) {
      whereQuery.date = {
        [Op.lte]: end_date,
      };
    }
    whereQuery.id_doctor = id_doctor;
    whereQuery.status = "busy";
    
    const turnsList = await Turn.findAll({
      where: whereQuery,
      include: [
        {
          model: User,
          as: "patient",
          attributes: ["id", "name", "photo_url"],
        },
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

  getTurnByIdPatientAndDoctor: async (doctorId, PatientId) => {
    const turn = await Turn.findOne({
      where: {
        id_doctor: doctorId,
        id_patient: PatientId,
      },
    });
    return turn;
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
