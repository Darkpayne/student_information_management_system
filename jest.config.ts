// jest.config.ts
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      // Optional: add any aliases from your tsconfig paths
      '^@/(.*)$': '<rootDir>/$1',
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };
  