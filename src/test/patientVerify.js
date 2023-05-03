const { expect } = require("chai");
const sinon = require("sinon");
const request = require("supertest");

const adminUserManager = require("../managers/adminUser");
const { HttpStatusCode } = require("../utils/cosnt");
const patientVerify = require("../middlewares/patientVerify");
const decodedToken = require("../utils/decodeJWT");
const app = require("../..");

describe("patientVerify middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: sinon.spy(() => res),
      json: sinon.spy(),
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return status 400 and error message when token is not sent", async () => {
    await patientVerify(req, res, next);

    expect(res.status.calledWith(HttpStatusCode.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ msg: "token not sent" })).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should return status 400 and error message when token is invalid", async () => {
    req.headers.authorization = "Bearer invalid-token";

    await patientVerify(req, res, next);

    expect(res.status.calledWith(HttpStatusCode.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ msg: "invalid token" })).to.be.true;
    expect(next.notCalled).to.be.true;
  });

//   it("should set user in request and call next function when token is valid", async () => {
//     const decode = { id: "valid-user-id" };
//     const user = { id: "valid-user-id", name: "John Doe" };
//     sinon.stub(adminUserManager, "getUserById").resolves(user);

//     const res = await request(app)
//     .get("api/turns")
//     .set("Authorization", "Bearer token-valido");
    
//     console.log("🚀 ~ res:", res)


//     req.headers.authorization = "Bearer valid-token";

//     await patientVerify(req, res, next);

//     console.log("req", req);

//     expect(req.user).to.deep.equal(user);
//     expect(next.calledOnce).to.be.true;
//     expect(res.status.notCalled).to.be.true;
//     expect(res.json.notCalled).to.be.true;
//   });
});
