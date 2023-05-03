const { expect } = require("chai");
const sinon = require("sinon");
const getTurnsServices = require("../services/getTurnsServices");

describe("getTurnsServices", () => {
  it("llama a getTurns al menos una vez", async () => {
    const req = {
      query: { id: 123 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const adminUserManager = {
      getUserByPk: sinon.stub().returns({
        role: "doctor",
        schedule: [
          {
            day: "Monday",
            daily_time: [{ start: "09:00", end: "17:00", interval: 30 }],
          },
        ],
      }),
    };
    const turnManager = {
      getTurns: sinon.stub().returns([
        {
          available: "2023-05-04 10:20",
          name: "Jamaica",
          address: "AV Jamaica 166",
        },
        {
          available: "2023-05-04 10:40",
          name: "Jamaica",
          address: "AV Jamaica 166",
        },
      ]),
    };

    await getTurnsServices(req, res, { adminUserManager, turnManager });
    sinon.assert.calledOnce(turnManager.getTurns);
  });
});
