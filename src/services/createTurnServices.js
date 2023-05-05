const moment = require("moment");

const createTurnServices = async (req, res, { turnManager }) => {
  const { id_turn, id_patient } = req.body;

  const turn = await turnManager.getTurnById(id_turn);

  const initialDate = moment(turn.date); // initial date (Thursday of the second week)
  const dayOfWeek = initialDate.day(); // day of the week of the initial date (in this case, 4 for Thursday)
  const weekOfMonth =
    initialDate.week() - moment(initialDate).startOf("month").week() + 1; // week number of the initial date (in this case, 2)

  // Get the date of the task corresponding to the current month
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
    // iterate through the next 11 months (the task for the current month has already been shown)
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
    return res.status(200).json({
      msg: "Solo fue asignado el turno pedido en los proximos meses el turno de este horario se encuentra ocupado",
    });
  }

  turnList.forEach((turn) => {
    turnManager.updatedTurn({ values, turn });
  });

  return res.status(200).json({ msg: "ok" });
};

module.exports = createTurnServices;
