const sinon = require("sinon");
const { expect } = require("chai");
const getTurnsForDoctorServices = require("../services/getTurnsForDoctorServices");


describe("getTurnsForDoctorServices", () => {
  describe("when given valid query parameters", () => {
    const id = "valid_doctor_id";
    const start_date = "2023-05-01";
    const end_date = "2023-05-31";
    const query = { id_doctor: id, start_date, end_date };
    const turnsList = [{ id: "turn_id_1" }, { id: "turn_id_2" }];
    const turnManager = {
      getTurnsForDoctor: sinon.stub().resolves(turnsList),
    };

    let req, res;

    beforeEach(() => {
      req = {
        query: { id, start_date, end_date },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    it("should retrieve turns for the doctor and return a success response", async () => {
      await getTurnsForDoctorServices(req, res, { turnManager });

      expect(turnManager.getTurnsForDoctor.calledOnceWith(query)).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(turnsList)).to.be.true;
    });
  });

  describe("when there is an error retrieving the turns", () => {
    const id = "valid_doctor_id";
    const start_date = "2023-05-01";
    const end_date = "2023-05-31";
    const query = { id_doctor: id, start_date, end_date };
    const error = new Error("Some error");
    const turnManager = {
      getTurnsForDoctor: sinon.stub().rejects(error),
    };

    let req, res;

    beforeEach(() => {
      req = {
        query: { id, start_date, end_date },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    it("should throw an error", async () => {
      try {
        await getTurnsForDoctorServices(req, res, { turnManager });
      } catch (error) {
        expect(error).to.equal(error);
      }
    });
  });
});
