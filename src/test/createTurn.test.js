const sinon = require("sinon");
const { expect } = require("chai");
const createTurnServices = require("../services/createTurnServices");

describe("createTurnServices", () => {
  it("should create a turn and return the created turn data", async () => {
    const req = {
      body: {
        date: "2023-05-06 17:35",
        name: "John Doe",
        address: "AV Jamaica 166",
        id_doctor: "123",
        id_patient: "456",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const turnManager = {
      createTurn: sinon.stub().returns({ id: "789", ...req.body }),
    };

    const options = { turnManager };

    await createTurnServices(req, res, options);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ id: "789", ...req.body })).to.be.true;
    expect(turnManager.createTurn.calledWith(req.body)).to.be.true;
  });
});
