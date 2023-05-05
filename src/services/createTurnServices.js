const moment = require("moment");
const { HttpStatusCode } = require("../utils/cosnt");

const createTurnServices = async (req, res, { turnManager }) => {
  const { id_turn, id_patient, id_doctor } = req.body;

  const turnFromPatient = await turnManager.getTurnByIdPatientAndDoctor(
    id_doctor,
    id_patient
  );

  if (turnFromPatient) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ msg: "Ya tienes turnos con este doctor" });
  }

  const turn = await turnManager.getTurnById(id_turn);

  const initialDate = moment(turn.date);
  const dayOfWeek = initialDate.day();
  const weekOfMonth =
    initialDate.week() - moment(initialDate).startOf("month").week() + 1;

  const currentMonthTaskDate = initialDate
    .startOf("month")
    .add(weekOfMonth - 1, "weeks")
    .day(dayOfWeek);

  const turnList = [
    { date: currentMonthTaskDate.format("YYYY-MM-DD"), hour: turn.hour },
  ];
  const dateList = [currentMonthTaskDate.format("YYYY-MM-DD")];
  const hourList = [turn.hour];

  // To replicate the task in subsequent months:
  for (let i = 1; i <= 3; i++) {
    // iterate through the next 3 months (the task for the current month has already been shown)
    const nextMonth = initialDate.clone().add(i, "months"); // date of the next month

    // Find the date of the same day of the week in the next month
    const nextMonthTaskDate = nextMonth
      .clone()
      .startOf("month")
      .add(weekOfMonth - 1, "weeks")
      .day(dayOfWeek);

    turnList.push({
      date: nextMonthTaskDate.format("YYYY-MM-DD"),
      hour: turn.hour,
    });
    dateList.push(nextMonthTaskDate.format("YYYY-MM-DD"));
    hourList.push(turn.hour);
  }

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

  return res.status(HttpStatusCode.OK).json({ msg: "Tus turnos fueron cargados correctamente" });
};

module.exports = createTurnServices;
