module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  extends: [
    "agile-digital",
  ],
  env: {
    "jest/globals": true,
    es6: true,
    browser: true
  },
  plugins: ["jest", "sonarjs", "functional", "@typescript-eslint", "prettier", "total-functions", "spellcheck", "react", "react-hooks", "jsx-a11y"],
  rules: {
    "spellcheck/spell-checker": [
      1,
      {
        skipWords: [
          "globals",
          "readonly",
          "Readonly",
          "sonarjs",
        ],
      },
    ],
  },
};
