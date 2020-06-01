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
      functions: 57.14,
      lines: 81.25,
      statements: 81.25,
    },
  },
};
