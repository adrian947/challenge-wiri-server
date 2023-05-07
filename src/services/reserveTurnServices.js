const { HttpStatusCode } = require("../utils/cosnt");
const reserveTurnGenerator = require("../utils/reserveTurnGenerator");

const reserveTurnServices = async (req, res, { turnManager }) => {
  const { id_turn, id_patient, id_doctor } = req.body;

  try {
    const turnFromPatient = await turnManager.getTurnByIdPatientAndDoctor(
      id_doctor,
      id_patient
    );

    if (turnFromPatient) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ msg: "Ya tienes turnos con este doctor" });
    }

    const turn = await turnManager.getTurnById(id_turn);

    const { turnList, dateList, hourList } = reserveTurnGenerator(turn);

    const values = {
      id_patient,
      status: "busy",
    };

    const findTurnBusy = await turnManager.findTurnsByDate(dateList, hourList);
    if (findTurnBusy.length) {
      turnManager.updatedTurn({ values, turn: turnList[0] });
      return res.status(HttpStatusCode.OK).json({
        msg: "Solo fue asignado el turno pedido en los proximos meses el turno de este horario se encuentra ocupado",
      });
    }
    turnList.forEach((turn) => {
      turnManager.updatedTurn({ values, turn });
    });

    return res
      .status(HttpStatusCode.OK)
      .json({ msg: "Tus turnos fueron cargados correctamente" });
  } catch (error) {
    throw error;
  }
};

module.exports = reserveTurnServices;
