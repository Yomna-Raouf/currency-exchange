import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  injectGlobals: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFiles: ['<rootDir>/setJestEnvVars.ts'],
  moduleNameMapper: {
    '^@/*/(.*)$': '<rootDir>/*/$1',
  },
};

export default createJestConfig(config);
