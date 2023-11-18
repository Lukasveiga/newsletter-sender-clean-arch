module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  testEnvironment: "node",
  coverageProvider: "v8",
  transform: {
    "^.+\\.ts?$": "@swc/jest",
  },
};
