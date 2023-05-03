const moment = require("moment");

const createTurnList = (user) => {
  const startDate = moment().add(1, "day");
  const endDate = moment().add(1, "month");
  const days = [];

  for (let date = startDate; date.isBefore(endDate); date.add(1, "day")) {
    const dayOfWeek = date.format("dddd");
    const day = user.schedule.find((t) => t.day === dayOfWeek);
    if (day) {
      const turnsAvailable = day.daily_time.map((h) => {
        const startTime = moment(date)
          .set("hour", h.start.split(":")[0])
          .set("minute", h.start.split(":")[1]);
        const endTime = moment(date)
          .set("hour", h.end.split(":")[0])
          .set("minute", h.end.split(":")[1]);
        const interval = h.interval;
        const result = [];

        for (
          let time = startTime;
          time.isBefore(endTime);
          time.add(interval, "minute")
        ) {
          result.push({
            available: time.format("YYYY-MM-DD HH:mm"),
            name: user.name,
            address: user.address,
          });
        }

        return result;
      });
      days.push(...turnsAvailable.reduce((a, b) => [...a, ...b], []));
    }
  }

  return days;
};

module.exports = createTurnList;
