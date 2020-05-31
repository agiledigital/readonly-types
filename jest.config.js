module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "collectCoverage": true,
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 14.29,
      "lines": 62.5,
      "statements": 62.5
    }
  },
}
