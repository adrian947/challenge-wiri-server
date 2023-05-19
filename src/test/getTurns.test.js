const sinon = require("sinon");
const { expect } = require("chai");
const moment = require("moment");
const { HttpStatusCode } = require("../utils/cosnt");
const { Op } = require("sequelize");
const getTurnsServices = require("../services/getTurnsServices");

describe("getTurnsServices", () => {
  let req;
  let res;
  let adminUserManager;
  let turnManager;
  beforeEach(() => {
    req = {
      query: { id: "1" },
    };
    res = {
      status: sinon.stub(),
    };
    adminUserManager = {
      getUserByPk: sinon.stub(),
    };
    turnManager = {
      getTurnsForPatient: sinon.stub(),
    };
    res.status.returns({
      json: sinon.stub(),
    });
  });

  it("should return a list of turns for a doctor", async () => {    
    const now = moment().format("YYYY-MM-DD");
    const user = {
      id: "1",
      role: "doctor",
    };
    adminUserManager.getUserByPk.resolves(user);
    const expectedQuery = {
      date: {
        [Op.gte]: now,
      },
      status: "available",
      id_doctor: user.id,
    };
    const expectedTurnsList = [{ id: "1", status: "available" }];
    turnManager.getTurnsForPatient.resolves(expectedTurnsList);
    
    await getTurnsServices(req, res, { adminUserManager, turnManager });
        
    expect(adminUserManager.getUserByPk.calledOnceWith(req.query.id)).to.be
      .true;
    expect(turnManager.getTurnsForPatient.calledOnceWith(expectedQuery)).to.be
      .true;
    expect(res.status.calledOnceWith(HttpStatusCode.OK)).to.be.true;
    expect(res.status().json.calledOnceWith(expectedTurnsList)).to.be.true;
  });

  it("should return a list of turns for a patient", async () => {    
    const now = moment().format("YYYY-MM-DD");
    const user = {
      id: "1",
      role: "patient",
    };
    adminUserManager.getUserByPk.resolves(user);
    const expectedQuery = {
      status: "busy",
      id_patient: user.id,
      date: {
        [Op.gte]: now,
      },
    };
    const expectedTurnsList = [{ id: "2", status: "busy" }];
    turnManager.getTurnsForPatient.resolves(expectedTurnsList);
    
    await getTurnsServices(req, res, { adminUserManager, turnManager });
    
    expect(adminUserManager.getUserByPk.calledOnceWith(req.query.id)).to.be
      .true;
    expect(turnManager.getTurnsForPatient.calledOnceWith(expectedQuery)).to.be
      .true;
    expect(res.status.calledOnceWith(HttpStatusCode.OK)).to.be.true;
    expect(res.status().json.calledOnceWith(expectedTurnsList)).to.be.true;
  });
});
