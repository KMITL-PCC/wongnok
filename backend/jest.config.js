const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/features/**/*.ts", // เก็บ coverage เฉพาะไฟล์ใน src
    "src/middleware/**/*.ts",
  ],
  coverageReporters: [
    "text-summary", // สรุปเป็น directory
    "text", // รายละเอียดใน console
    "lcov", // สำหรับ CI/CD tools
    "html", // ดูผ่าน browser
  ],
};
