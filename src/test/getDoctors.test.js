const sinon = require("sinon");
const { expect } = require("chai");
const getDoctorsServices = require("../services/getDoctorsServices");
const { HttpStatusCode } = require("../utils/cosnt");


describe("getDoctorsServices", () => {
  describe("when there are doctors available", () => {
    const doctors = [{ id: "doctor_id_1" }, { id: "doctor_id_2" }];
    const adminUserManager = {
      getAllDoctors: sinon.stub().resolves(doctors),
    };
    let req, res;

    beforeEach(() => {
      req = {};
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    it("should retrieve all doctors and return a success response", async () => {
      await getDoctorsServices(req, res, { adminUserManager });

      expect(adminUserManager.getAllDoctors.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(HttpStatusCode.OK)).to.be.true;
      expect(res.json.calledOnceWith(doctors)).to.be.true;
    });
  });

  describe("when there are no doctors available", () => {
    const adminUserManager = {
      getAllDoctors: sinon.stub().resolves([]),
    };
    let req, res;

    beforeEach(() => {
      req = {};
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    it("should return a bad request response with an error message", async () => {
      await getDoctorsServices(req, res, { adminUserManager });

      expect(adminUserManager.getAllDoctors.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(HttpStatusCode.BAD_REQUEST)).to.be.true;
      expect(res.json.calledOnceWith("no hay doctores disponibles")).to.be.true;
    });
  });

  describe("when there is an error retrieving the doctors", () => {
    const error = new Error("Some error");
    const adminUserManager = {
      getAllDoctors: sinon.stub().rejects(error),
    };
    let req, res;

    beforeEach(() => {
      req = {};
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    it("should throw an error", async () => {
      try {
        await getDoctorsServices(req, res, { adminUserManager });
      } catch (error) {
        expect(error).to.equal(error);
      }
    });
  });
});
