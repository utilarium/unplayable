/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**'],
            exclude: [
                'node_modules/',
                'dist/',
                'tests/',
                '**/*.d.ts',
                '**/*.test.ts',
                'docs/',
                'src/error/index.ts'
            ],
            thresholds: {
                statements: 84,
                branches: 78,
                functions: 88,
                lines: 84,
            },
        },
    },
});
