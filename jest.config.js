module.exports = {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    collectCoverageFrom: ['src/**/*.ts'],
    coverageThreshold: { global: { statements: 90, branches: 85, functions: 80, lines: 90 } },
    coverageReporters: ['text-summary', 'json', 'lcov'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    testRegex: '/tests/.*.test.(ts|tsx)$',
    modulePathIgnorePatterns: ['/tests/.*(.d.ts)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
