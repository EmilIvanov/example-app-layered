/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // run test via Nodejs
  testEnvironment: 'node',
  // needed for TypeScript
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // root dir is the app root
  rootDir: '.',
  // does some setup before each test file
  setupFiles: [
    '<rootDir>/jest.setup.ts'
  ],
  // path aliases from tsconfig.json
  moduleNameMapper: {
    '^@business$': '<rootDir>/src/business',
    '^@business/(.*)$': '<rootDir>/src/business/$1',
    '^@data$': '<rootDir>/src/data',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@extensions/(.*)$': '<rootDir>/src/extensions/$1',
    '^@presentation$': '<rootDir>/src/presentation',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  // coverage directory
  coverageDirectory: '<rootDir>/coverage',
  // coverage is collected from files under src/
  collectCoverageFrom: [
    '<rootDir>/src/**/*.[tj]s?(x)'
  ],
  // and from those files ignore
  coveragePathIgnorePatterns: [
    // entry points
    '<rootDir>/src/index.[tj]sx?$',
    // extensions
    '<rootDir>/src/extensions',
    // module indexes
    '<rootDir>/.*/index.[tj]sx?$',
    // e2e tests
    '(spec|test)-e2e.[tj]sx?$',
    // type definitions
    '<rootDir>/src/@types/',
    // database migrations
    '<rootDir>/src/modules/database/migrations',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
