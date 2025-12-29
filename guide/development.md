# Development Guide

**Purpose**: Instructions for contributing to and developing `unplayable`.

## Setup

1.  **Install Dependencies**: `npm install`
2.  **Build**: `npm run build`
3.  **Prerequisites**: Ensure FFmpeg is installed and accessible in your path (`brew install ffmpeg`).

## Testing

We use **Vitest** for testing.

*   **Run Tests**: `npm test`
*   **Coverage**: `npm run test` (configured to run with coverage by default)

### Testing Strategy

*   **Unit Tests**: Located in `tests/`. We aim for reasonable coverage (~80%+).
*   **Mocking**:
    *   **Child Process**: We mock `child_process.spawn` and `exec` to avoid actually running FFmpeg during unit tests. This ensures tests are fast and environment-independent.
    *   **File System**: We mock `fs/promises` to avoid disk I/O.
*   **Integration Tests**: True integration tests requiring actual audio hardware are generally avoided in CI but can be run locally if `child_process` mocks are bypassed (not default behavior).

## Linting & Formatting

*   **Lint**: `npm run lint`
*   **Fix**: `npm run lint:fix`

We use ESLint with strict TypeScript rules. Note that `eslint.config.mjs` is used for configuration (Flat Config).

## Release Process

1.  Update version in `package.json`.
2.  Run `npm run build`.
3.  Ensure tests pass (`npm run precommit`).
4.  Commit and push.
5.  CI/CD pipeline handles publishing to NPM.

## Adding Features

1.  **Platform Support**: When adding support for Windows/Linux recording, modify `src/devices.ts` parsing logic and `src/processor.ts` FFmpeg arguments.
2.  **Types**: Update `src/types.ts` if public interfaces change.
3.  **Tests**: Write tests in `tests/` ensuring you mock external system calls.

