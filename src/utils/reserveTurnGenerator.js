const moment = require("moment");

const reserveTurnGenerator = (turn) => {
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

  return {turnList, dateList, hourList };
};

module.exports = reserveTurnGenerator;
