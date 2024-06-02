import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

test('TextEncoder is globally defined in Jest', () => {
  expect(global.TextEncoder).toBeDefined();
});
