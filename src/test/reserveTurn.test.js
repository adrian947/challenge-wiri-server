const sinon = require("sinon");
const { expect } = require("chai");
const reserveTurnServices = require("../services/reserveTurnServices");

const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
};

describe("reserveTurnServices", () => {
  const req = {
    body: {
      id_turn: "1234",
      id_patient: "5678",
      id_doctor: "9012",
    },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const turnManager = {
    getTurnByIdPatientAndDoctor: sinon.stub(),
    getTurnById: sinon.stub(),
    findTurnsByDate: sinon.stub(),
    updatedTurn: sinon.stub(),
  };

  it("should return error when patient already has a turn with the doctor", async () => {
    turnManager.getTurnByIdPatientAndDoctor.resolves(true);

    await reserveTurnServices(req, res, { turnManager });

    expect(res.status.calledWith(HttpStatusCode.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ msg: "Ya tienes turnos con este doctor" })).to
      .be.true;
  });

  it("should calculate the turn list and update the turns when no conflicting turn exists", async () => {
    turnManager.getTurnByIdPatientAndDoctor.resolves(false);
    turnManager.getTurnById.resolves({ date: "2023-05-06", hour: "09:00" });
    turnManager.findTurnsByDate.resolves([]);

    await reserveTurnServices(req, res, { turnManager });

    expect(res.status.calledWith(HttpStatusCode.OK)).to.be.true;
    expect(
      res.json.calledWith({ msg: "Tus turnos fueron cargados correctamente" })
    ).to.be.true;
    expect(turnManager.updatedTurn.callCount).to.equal(4);
  });

  it("should update the existing turn when a conflict exists in the future months", async () => {
    turnManager.getTurnByIdPatientAndDoctor.resolves(false);
    turnManager.getTurnById.resolves({ date: "2023-05-06", hour: "09:00" });
    turnManager.findTurnsByDate.resolves([
      { date: "2023-05-06", hour: "09:00" },
    ]);

    await reserveTurnServices(req, res, { turnManager });

    expect(res.status.calledWith(HttpStatusCode.OK)).to.be.true;
    expect(
      res.json.calledWith({
        msg: "Solo fue asignado el turno pedido en los proximos meses el turno de este horario se encuentra ocupado",
      })
    ).to.be.true;
    expect(turnManager.updatedTurn.called).to.be.true;
  });
});
