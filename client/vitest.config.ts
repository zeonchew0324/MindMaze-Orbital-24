import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import '@testing-library/jest-dom/vitest';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
