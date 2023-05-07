const sinon = require("sinon");
const { expect } = require("chai");
const cancelTurnsServices = require("../services/cancelTurnsServices");
const { HttpStatusCode } = require("../utils/cosnt");


describe("cancelTurnsServices", () => {
  describe("when given a valid turn ID", () => {
    const id_turn = "valid_turn_id";
    const turnManager = {
      cancelTurn: sinon.stub().resolves({ id: id_turn, status: "cancelled" }),
    };

    let req, res;

    beforeEach(() => {
      req = {
        body: { id_turn },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    it("should cancel the turn and return a success response", async () => {
      await cancelTurnsServices(req, res, { turnManager });

      expect(turnManager.cancelTurn.calledOnceWith(id_turn)).to.be.true;
      expect(res.status.calledOnceWith(HttpStatusCode.OK)).to.be.true;
      expect(res.json.calledOnceWith({ id: id_turn, status: "cancelled" })).to
        .be.true;
    });
  });

  describe("when given an invalid turn ID", () => {
    const id_turn = "invalid_turn_id";
    const turnManager = {
      cancelTurn: sinon.stub().resolves(null),
    };

    let req, res;

    beforeEach(() => {
      req = {
        body: { id_turn },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    it("should return a not found response", async () => {
      await cancelTurnsServices(req, res, { turnManager });

      expect(turnManager.cancelTurn.calledOnceWith(id_turn)).to.be.true;
      expect(res.status.calledOnceWith(HttpStatusCode.NOT_FOUND)).to.be.true;
      expect(res.json.calledOnceWith({ message: "El turno no existe" })).to.be
        .true;
    });
  });

  describe("when there is an error cancelling the turn", () => {
    const id_turn = "valid_turn_id";
    const turnManager = {
      cancelTurn: sinon.stub().rejects(new Error("Some error")),
    };

    let req, res;

    beforeEach(() => {
      req = {
        body: { id_turn },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    it("should throw an error", async () => {
      try {
        await cancelTurnsServices(req, res, { turnManager });
      } catch (error) {
        expect(error.message).to.equal("Some error");
      }
    });
  });
});
