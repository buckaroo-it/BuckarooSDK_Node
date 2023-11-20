module.exports = {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/tests/.*.test.(ts|tsx)$',
    modulePathIgnorePatterns: ['/tests/.*(.d.ts)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
