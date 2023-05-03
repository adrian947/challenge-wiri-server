const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

const loginUserServices = require("../services/loginUserServices");

describe("loginUser", () => {
  it("should return an error if the user is not found", async () => {
    const req = {
      body: { email: "nonexistent@example.com", password: "password" },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const getUserStub = sinon.stub().resolves(null);
    const adminUserManager = { getUser: getUserStub };

    await loginUserServices(req, res, { adminUserManager });

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ msg: "incorrect user or password" })).to.be
      .true;
    expect(getUserStub.calledWith("nonexistent@example.com")).to.be.true;
  }).timeout(15000);

  it("should return an error if the password is incorrect", async () => {
    const req = {
      body: { email: "user@example.com", password: "wrongpassword" },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const getUserStub = sinon.stub().resolves({
      id: "123",
      email: "user@example.com",
      password: "$2b$10$TUBTfv4L4O8B0tkA4hrgxOxBlSbGv8TpjqW6hJRYfxc3E5b5U6fzW",
      role: "admin",
    });
    const bcryptCompareStub = sinon.stub().returns(false);
    const bcrypt = { compareSync: bcryptCompareStub };
    const adminUserManager = { getUser: getUserStub };

    await loginUserServices(req, res, {
      adminUserManager,
      bcrypt,
    });

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ msg: "incorrect user or password" })).to.be
      .true;
    expect(getUserStub.calledWith("user@example.com")).to.be.true;
    expect(
      bcryptCompareStub.calledWith(
        "wrongpassword",
        "$2b$10$TUBTfv4L4O8B0tkA4hrgxOxBlSbGv8TpjqW6hJRYfxc3E5b5U6fzW"
      )
    ).to.be.true;
  });

  it("should return a user object with a token if the email and password are correct", async () => {
    const req = { body: { email: "user@example.com", password: "password" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const getUserStub = sinon.stub().resolves({
      id: "123",
      email: "user@example.com",
      password: "$2b$10$TUBTfv4L4O8B0tkA4hrgxOxBlSbGv8TpjqW6hJRYfxc3E5b5U6fzW",
      role: "admin",
    });
    const bcryptCompareStub = sinon.stub().returns(true);
    const signTokenStub = sinon.stub().returns("jwt-token");
    const bcrypt = { compareSync: bcryptCompareStub };    
    const signToken = signTokenStub
    const adminUserManager = { getUser: getUserStub };

    await loginUserServices(req, res, {
      adminUserManager,
      bcrypt,
      signToken
    });

    expect(res.status.calledWith(200)).to.be.true;   
    expect(getUserStub.calledWith("user@example.com")).to.be.true;

    const response = res.json.args[0][0];
    expect(response).to.have.property("id", "123");
    expect(response).to.have.property("email", "user@example.com");
    expect(response).to.have.property("role", "admin");
    expect(response).to.have.property("token", "jwt-token");
  });
});
