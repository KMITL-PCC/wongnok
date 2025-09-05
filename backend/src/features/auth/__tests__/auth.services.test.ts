import authServices from "../auth.services";
import prisma from "../../../config/db.config";
import transporter from "../../../config/email.config";
import otpGenerator from "otp-generator";

import { Role } from "../../../../generated/prisma";

jest.mock("../../../config/db.config", () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock("../../../config/email.config", () => ({
  __esModule: true,
  default: { sendMail: jest.fn() },
}));

jest.mock("otp-generator", () => ({
  generate: jest.fn(() => "12345"),
}));

describe("Auth Services", () => {
  afterEach(() => {
    jest.clearAllMocks(); // clear mock after every test
  });

  describe("checkUserNotExistence", () => {
    it("should return success true if no user exists", async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await authServices.checkUserNotExistence(
        "newuser",
        "new@email.com"
      );

      expect(result.success).toBe(true);
      expect(prisma.user.findFirst).toHaveBeenCalledTimes(1);
    });

    it("should return error if username exists", async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue({
        id: "user_1",
        username: "existing",
        email: "other@gmail.com",
        passwordHash: "hashedpw",
        role: Role.User, // หรือ Role.USER ถ้าเป็น enum
        profilePictureUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await authServices.checkUserNotExistence(
        "existing",
        "new@gmail.com"
      );

      expect(result.success).toBe(false);
      expect(result.status).toBe(409);
      expect(result.messeage).toBe("Username already taken.");
    });

    it("should return error if email exists", async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue({
        id: "user_1",
        username: "test",
        email: "existing@gmail.com",
        passwordHash: "hashedpw",
        role: Role.User, // หรือ Role.USER ถ้าเป็น enum
        profilePictureUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await authServices.checkUserNotExistence(
        "other",
        "existing@gmail.com"
      );

      expect(result.success).toBe(false);
      expect(result.status).toBe(409);
      expect(result.messeage).toBe("Email already registered.");
    });

    it("should be use default paramter", async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await authServices.checkUserNotExistence();

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { OR: [{ username: "" }, { email: "" }] },
      });

      expect(prisma.user.findFirst).toHaveBeenCalledTimes(1);
    });
  });

  describe("sendVerificationOtp", () => {
    const mockSendMail = transporter.sendMail as jest.Mock;

    it("should send OTP email successfully", async () => {
      mockSendMail.mockResolvedValueOnce({});

      const result = await authServices.sendVerificationOtp("test@email.com");

      expect(result).toHaveProperty("otp");
      expect(result).toHaveProperty("expiresAt");

      expect(mockSendMail.mock.calls[0][0]).toMatchObject({
        to: "test@email.com",
        subject: "Verify Tastetrail OTP",
      });

      expect(otpGenerator.generate).toHaveBeenCalledWith(5, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      expect(result.otp).toBe("12345");
    });

    it("should throw error if sendMail fails", async () => {
      mockSendMail.mockRejectedValueOnce(new Error("SMTP error"));

      await expect(
        authServices.sendVerificationOtp("test@example.com")
      ).rejects.toThrow("Failed to send verification email.");

      expect(mockSendMail).toHaveBeenCalledTimes(1);
    });
  });

  describe("create", () => {
    it("should return new user if success", async () => {
      const mockUser = {
        username: "test",
        email: "test@example.com",
        passwordHash: "pwdhased",
      };
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await authServices.create(
        "test",
        "test@example.com",
        "pwdhased"
      );

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: "test",
          email: "test@example.com",
          passwordHash: "pwdhased",
        },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("updatePassword", () => {
    it("should update password if success", async () => {
      const mockUpdate = {
        email: "test@example.com",
        passwordHash: "pwdhased",
      };
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUpdate);

      const result = await authServices.updatePassword(
        "test@example.com",
        "pwdhased"
      );

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          email: "test@example.com",
        },
        data: {
          passwordHash: "pwdhased",
        },
      });
      expect(result).toEqual(mockUpdate);
    });
  });
});
