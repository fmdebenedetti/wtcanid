/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  roots: ['<rootDir>/test', '<rootDir>/services'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
      useESM: true
    }]
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'services/**/*.{js,ts}',
    '!services/**/*.d.ts'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!graphql-request)/'
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
