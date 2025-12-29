# Architecture

**Purpose**: High-level overview of the internal design of `unplayable`.

## Module Structure

The project is organized into distinct logical modules:

*   **`src/unplayable.ts`**: The main entry point and facade class `Unplayable`. Exposes high-level methods and factory functions.
*   **`src/processor.ts`**: Core logic for handling audio workflows. Orchestrates recording, file validation, and metadata extraction.
*   **`src/devices.ts`**: Device management logic. Handles parsing FFmpeg output to list devices, detecting best available inputs, and validating device access.
*   **`src/configuration.ts`**: Configuration management. Loads settings from JSON files and environment variables.
*   **`src/validation.ts`**: input validation logic for audio files and processing options.
*   **`src/util/`**:
    *   **`child.ts`**: Wrapper around `child_process` (`spawn`, `exec`) for running FFmpeg commands.
    *   **`storage.ts`**: File system abstraction for managing recordings and temp files.
*   **`src/error/`**: Custom error hierarchy (`UnplayableError`, `AudioDeviceError`, `AudioRecordingError`, etc.).

## Data Flow

1.  **Initialization**: User calls `createUnplayable()`. configuration is loaded, logger is initialized, and `AudioProcessor` is instantiated.
2.  **Device Selection**:
    *   Explicit device index provided in options.
    *   Or `detectBestAudioDevice()` queries system devices via FFmpeg and selects a default.
3.  **Recording Process** (`processAudio()` -> `record()`):
    *   Temp directory created.
    *   `devices.ts` validates the selected device.
    *   `processor.ts` constructs FFmpeg arguments (format, codec, duration).
    *   `child.ts` spawns FFmpeg process.
    *   On completion, audio file is verified and moved to output directory.
4.  **Result**: `AudioProcessingResult` returned with file path and metadata.

## Design Decisions

*   **FFmpeg Dependency**: The library relies heavily on FFmpeg being installed on the system. It does not ship a binary, keeping the package size small but requiring external setup.
*   **Facade Pattern**: The `Unplayable` class acts as a facade, delegating to specialized modules (`AudioProcessor`, `ConfigurationManager`) to keep the API surface clean.
*   **Platform Specifics**: Currently heavily optimized for macOS (`avfoundation`). Future architecture should abstract the input format (`dshow` vs `alsa` vs `avfoundation`) into a strategy pattern.
*   **Async/Await**: All I/O operations (FS, Child Process) are asynchronous.

## Key Dependencies

*   **`winston`**: Logging.
*   **`zod`**: Schema validation (for configuration).
*   **`glob`**: File matching.

