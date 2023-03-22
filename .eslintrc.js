module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    "no-unused-vars": "off",
    "prefer-rest-params": "off",
    "multiline-comment-style": ["off"],
    "@typescript-eslint/no-unused-vars": ["warn", { "varsIgnorePattern": "^_+$" }]
  }
}
