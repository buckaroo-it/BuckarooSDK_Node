module.exports = {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/Tests/.*.(ts|tsx)$',
    modulePathIgnorePatterns: ['/Tests/.*(.d.ts)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
