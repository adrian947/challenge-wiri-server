const sinon = require("sinon");
const expect = require("chai").expect;
const patientAuthorization = require("../middlewares/patientAuthorization");
const { HttpStatusCode } = require("../utils/cosnt");
const decodedToken = require("../utils/decodeJWT");

describe("patientAuthorization middleware", () => {
  it("should return error response if token is invalid", async () => {
    const req = {
      headers: {
        authorization: "Bearer invalid_token",
      },
    };
    const res = {};
    const next = sinon.spy();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await patientAuthorization(req, res, next);

    expect(res.status.calledOnceWith(HttpStatusCode.BAD_REQUEST)).to.be.true;
    expect(res.json.calledOnceWith({ msg: "invalid token" })).to.be.true;
    expect(next.called).to.be.false;
  });

  it("should return error response if token is not sent", async () => {
    const req = {
      headers: {},
    };

    const res = {};
    const next = sinon.spy();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await patientAuthorization(req, res, next);

    expect(res.status.calledOnceWith(HttpStatusCode.BAD_REQUEST)).to.be.true;
    expect(res.json.calledOnceWith({ msg: "token not sent" })).to.be.true;
    expect(next.called).to.be.false;
  });
});
