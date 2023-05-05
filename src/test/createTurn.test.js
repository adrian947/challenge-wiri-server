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
        repeat: 2,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const mockArray = [
      {
        date: "2023-05-06 17:35",
        name: "John Doe",
        address: "AV Jamaica 166",
        id_doctor: "123",
        id_patient: "456",
      },
      {
        date: "2023-06-06 17:35",
        name: "John Doe",
        address: "AV Jamaica 166",
        id_doctor: "123",
        id_patient: "456",
      },
      {
        date: "2023-07-06 17:35",
        name: "John Doe",
        address: "AV Jamaica 166",
        id_doctor: "123",
        id_patient: "456",
      },
    ];

    const turnManager = {
      createTurn: sinon.stub().returns(mockArray),
    };

    await createTurnServices(req, res, { turnManager });

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.args[0][0]).to.equal(mockArray);
    expect(turnManager.createTurn.calledOnce).to.be.true;
    expect(turnManager.createTurn.firstCall.args[0]).to.deep.equal(mockArray);
  });
});
