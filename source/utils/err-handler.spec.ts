import { describe, expect, it } from 'vitest';
import { promiseErrorHandler } from './err-handler';

describe('Promise Err Handler (Unit)', () => {
    it('should resolve with data when promise is resolved', async () => {
        const promise = Promise.resolve('success');
        const result = await promiseErrorHandler(promise);
        expect(result).toEqual([null, 'success']);
    });

    it('should reject with error when promise is rejected', async () => {
        const promise = Promise.reject('error');
        const result = await promiseErrorHandler(promise);
        expect(result).toEqual(['error', null]);
    });
});
