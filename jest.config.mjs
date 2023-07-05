import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/jest/prisma.ts',
    '<rootDir>/src/jest/next-auth.ts',
  ],
};

export default createJestConfig(config);
