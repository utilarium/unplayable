# Configuration Reference

**Purpose**: Detailed guide on configuring `unplayable` instances.

## Configuration Sources

`unplayable` loads configuration from multiple sources with the following precedence:

1.  **Runtime Options**: Passed directly to `createUnplayable()` or methods like `processAudio()`.
2.  **Environment Variables**: `UNPLAYABLE_*`, `OPENAI_*`, `FFMPEG_*`.
3.  **Configuration File**: `unplayable.config.json` in project root or `~/.unplayable/config.json`.
4.  **Defaults**: Hardcoded library defaults.

## Configuration Schema

The configuration object follows the `UnplayableConfig` interface:

```typescript
interface UnplayableConfig {
  defaultDevice?: AudioDeviceConfig;
  outputDirectory?: string;
  preferencesDirectory?: string;
  logging?: {
    level?: 'error' | 'warn' | 'info' | 'debug';
    silent?: boolean;
  };
  ffmpeg?: {
    path?: string;
    timeout?: number;
  };
}
```

## Environment Variables

| Variable | Config Field | Description |
| :--- | :--- | :--- |
| `UNPLAYABLE_OUTPUT_DIR` | `outputDirectory` | Default directory for saving recordings. |
| `UNPLAYABLE_PREFS_DIR` | `preferencesDirectory` | Directory for storing device preferences. |
| `UNPLAYABLE_LOG_LEVEL` | `logging.level` | Logging verbosity (default: `info`). |
| `UNPLAYABLE_SILENT` | `logging.silent` | Suppress all logs if `true`. |
| `FFMPEG_PATH` | `ffmpeg.path` | Custom path to FFmpeg binary. |
| `FFMPEG_TIMEOUT` | `ffmpeg.timeout` | Default timeout for operations. |

## Runtime Configuration

You can configure an instance at creation time:

```typescript
const unplayable = await createUnplayable({
    config: {
        outputDirectory: './my-recordings',
        logging: { level: 'debug' }
    }
});
```

Or update it dynamically:

```typescript
unplayable.updateConfig({
    outputDirectory: './new-location'
});
```

## Device Configuration

Device preferences are handled separately via `AudioDeviceConfig`. These are typically managed via `saveDeviceConfig()` and `loadDeviceConfig()` methods, which persist to a JSON file in the `preferencesDirectory`.

```typescript
// Explicit device config
const deviceConfig = {
    audioDevice: '1',
    audioDeviceName: 'External Mic'
};

// Save for future use
await unplayable.saveDeviceConfig(deviceConfig);
```

