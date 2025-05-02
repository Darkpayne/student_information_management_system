import '@testing-library/jest-dom';

export default {
    // ... other config options
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
  };
  