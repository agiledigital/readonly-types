module.exports = {
  packageManager: "yarn",
  reporters: ["clear-text", "progress"],
  testRunner: "jest",
  coverageAnalysis: "perTest",
  tsconfigFile: "tsconfig.json",
  thresholds: { high: 100, low: 100, break: 100 }
};
