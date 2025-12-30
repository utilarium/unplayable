import { describe, it, expect } from 'vitest';

import { UnplayableError } from '../../src/error/UnplayableError';

describe('UnplayableError Coverage', () => {
    it('should create error without details', () => {
        const error = new UnplayableError('Test error', 'TEST_CODE');
        expect(error.message).toBe('Test error');
        expect(error.code).toBe('TEST_CODE');
        expect(error.details).toBeUndefined();
    });

    it('should create error with details', () => {
        const details = { foo: 'bar' };
        const error = new UnplayableError('Test error', 'TEST_CODE', details);
        expect(error.message).toBe('Test error');
        expect(error.code).toBe('TEST_CODE');
        expect(error.details).toEqual(details);
    });

    it('should implement toJSON', () => {
        const error = new UnplayableError('Test error', 'TEST_CODE', { foo: 'bar' });
        const json = error.toJSON();
        expect(json).toEqual({
            name: 'UnplayableError',
            message: 'Test error',
            code: 'TEST_CODE',
            details: { foo: 'bar' },
            stack: expect.any(String)
        });
    });

    it('should have correct name', () => {
        const error = new UnplayableError('Test error', 'TEST_CODE');
        expect(error.name).toBe('UnplayableError');
    });

    it('should handle missing Error.captureStackTrace', () => {
        const originalCaptureStackTrace = Error.captureStackTrace;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Error as any).captureStackTrace = undefined;

        try {
            const error = new UnplayableError('Test error', 'TEST_CODE');
            expect(error.stack).toBeDefined(); // Standard Error stack should still exist
        } finally {
            Error.captureStackTrace = originalCaptureStackTrace;
        }
    });
});

