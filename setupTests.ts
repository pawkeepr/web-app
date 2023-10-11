import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// extends Vitest's expect method with methods from react-testing-library

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});
