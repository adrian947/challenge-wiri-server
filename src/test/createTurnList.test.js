const { expect } = require("chai");
const createTurnList = require("../utils/createTurnList");

describe("createTurnList", () => {
  it("must be return array length 10", () => {
    const user = {
      name: "John Doe",
      address: "123 Main St",
      schedule: [
        {
          day: "Monday",
          daily_time: [
            {
              start: "09:00",
              end: "12:00",
              interval: 30,
            },
            {
              start: "13:00",
              end: "17:00",
              interval: 60,
            },
          ],
        },
        {
          day: "Wednesday",
          daily_time: [
            {
              start: "10:00",
              end: "15:00",
              interval: 60,
            },
          ],
        },
      ],
    };

    const actualTurns = createTurnList(user);
    expect(actualTurns).to.be.an("array");
    expect(actualTurns).to.not.be.empty;
    expect(actualTurns[0]).to.have.all.keys(
      "coverage",
      "date",
      "hour",
      "id_doctor"
    );
  });
});
