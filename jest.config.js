module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  coverageProvider: "v8",
  preset: "@shelf/jest-mongodb",
  transform: {
    "^.+\\.ts?$": "@swc/jest",
  },
};
