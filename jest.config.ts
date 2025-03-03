/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['src'],
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.entity.ts', '!src/main.ts'],
  coverageDirectory: '../coverage',
  coverageReporters: ['lcov', 'text'],
  testEnvironment: 'node',
  setupFilesAfterEnv: [],
}

export default config
