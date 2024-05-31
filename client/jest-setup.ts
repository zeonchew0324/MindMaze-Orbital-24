import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
beforeAll(() => {
    // global setup logic
  });
  
afterAll(() => {
    // global teardown logic
  });

 
module.exports = {
    // other Jest configurations
    setupFilesAfterEnv: ['./jest-setup.ts'],
};