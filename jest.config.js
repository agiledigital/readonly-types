// eslint-disable-next-line no-undef
module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 62.5,
      lines: 84.21,
      statements: 84.21,
    },
  },
};
