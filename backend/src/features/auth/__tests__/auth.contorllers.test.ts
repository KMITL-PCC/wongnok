import authControllers from "../auth.controllers";
import authServices from "../auth.services";
import bcrypt from "bcrypt";

describe("Auth Services", () => {
  let req: any;
  let res: any;
  beforeEach(() => {
    req = {
      body: {},
      session: {},
      sessionID: "fake-session-id",
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(async (data) => `hashed-${data}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registerStep1_sendOtp", () => {
    it("should return status 400 if missing user data", async () => {
      req.body = {};
      await authControllers.registerStep1_sendOtp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing user data" });
    });

    it("should return error if user is already exist", async () => {
      req.body = {
        username: "test",
        email: "test@test.com",
        password: "123456",
      };
      jest.spyOn(authServices, "checkUserNotExistence").mockResolvedValue({
        success: false,
        status: 409,
        messeage: "User already exists",
        isLocal: true,
      });

      await authControllers.registerStep1_sendOtp(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
    });

    it("should return otp and expires time if success", async () => {
      const expiresAt = new Date(Date.now() + 5 * 60000);
      req.body = {
        username: "newuser",
        email: "new@test.com",
        password: "pass123",
      };

      jest.spyOn(authServices, "checkUserNotExistence").mockResolvedValue({
        success: true,
      });

      jest.spyOn(authServices, "sendVerificationOtp").mockResolvedValue({
        otp: "123456",
        expiresAt,
      });

      req.session.save = jest.fn((cb) => cb());

      await authControllers.registerStep1_sendOtp(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "OTP sent to your email. Please verify to complete registration.",
      });
      expect(req.session.registerData).toMatchObject({
        username: "newuser",
        email: "new@test.com",
        passwordHash: "hashed-pass123",
        otp: "hashed-123456",
        expiresAt,
      });
    });

    it("should return 500 if session save error", async () => {
      req.body = {
        username: "newuser",
        email: "new@test.com",
        password: "pass123",
      };
      jest.spyOn(authServices, "checkUserNotExistence").mockResolvedValue({
        success: true,
      });

      jest.spyOn(authServices, "sendVerificationOtp").mockResolvedValue({
        otp: "123456",
        expiresAt: new Date(Date.now() + 5 * 60000),
      });

      req.session.save = jest.fn((cb) => {
        cb(new Error("Session error"));
      });

      await authControllers.registerStep1_sendOtp(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Internal Server Error");
    });

    it("should return 500 if server error", async () => {
      req.body = {
        username: "erruser",
        email: "err@test.com",
        password: "pass",
      };
      jest
        .spyOn(authServices, "checkUserNotExistence")
        .mockRejectedValue(new Error("DB error"));

      await authControllers.registerStep1_sendOtp(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error during registration.",
      });
    });
  });

  describe("registerStep2_verifyOTPandCreateUser", () => {
    it("should return error if doesn't have session", async () => {
      req.session = {};
      req.body = { otp: "12345" };
      const result = await authControllers.registerStep2_verifyOTPandCreateUser(
        req,
        res
      );

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "No pending registration. Please start registration again.",
      });
    });

    it("should return error if doesn't have session register otp", async () => {
      req.session = { registerData: {} };
      req.body = {
        otp: "12345",
      };

      const result = await authControllers.registerStep2_verifyOTPandCreateUser(
        req,
        res
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "No pending registration. Please start registration again.",
      });
    });

    it("should return Invalid OTP if doesn't have OTP", async () => {
      req.body = {};
      req.session = {
        registerData: {
          otp: "12344",
        },
      };

      const result = await authControllers.registerStep2_verifyOTPandCreateUser(
        req,
        res
      );

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid OTP. Please try again.",
      });
    });
  });
});
