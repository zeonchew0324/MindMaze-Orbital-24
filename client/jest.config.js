/** @type {import('ts-jest').JestConfigWithTsJest} */
const { TextDecoder, TextEncoder } = require('util')

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/styleMock.js',
  },
  globals: {
    TextDecoder: TextDecoder,
    TextEncoder: TextEncoder,
  }
}