# Xbox Cloud Gaming for Steam Deck

An easier way to set up Xbox Cloud Gaming on your Steam Deck via Decky Loader.

## Features

- ✅ Automatically checks if Microsoft Edge is installed
- ✅ Installs Microsoft Edge via Flatpak if needed
- ✅ Creates a shortcut for Xbox Cloud Gaming
- ✅ Launches with proper permissions and optimized settings
- ✅ Follows the official Microsoft guide for Steam Deck

## Requirements

- Steam Deck (or SteamOS)
- [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) installed
- Internet connection

## Installation

1. Install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) if you haven't already
2. Install this plugin from the Decky store or manually:
   - Download the latest release
   - Extract to `~/homebrew/plugins/decky-xcloud/`
   - Restart Decky Loader

## Usage

1. Open the Decky menu (QAM button)
2. Navigate to the Xbox Cloud Gaming plugin
3. Follow the on-screen instructions:
   - Install Microsoft Edge (if not already installed)
   - Create the Xbox Cloud Gaming shortcut
   - Launch Xbox Cloud Gaming directly from the plugin or via the created shortcut

## How It Works

This plugin:
1. Checks if Microsoft Edge is installed via Flatpak
2. Installs Edge from Flathub if needed
3. Creates a desktop shortcut with optimized launch parameters
4. Launches Edge in kiosk mode with proper permissions for gamepad and audio

The launch command includes:
- Filesystem access for PipeWire (audio)
- Device access for gamepad support
- Optimized scaling for Steam Deck display
- Kiosk mode for distraction-free gaming

## Building from Source

```bash
# Install dependencies
npm install

# Build the plugin
npm run build
```

## License

GPL-3.0

## Credits

Based on the official [Microsoft guide for Xbox Cloud Gaming on Steam Deck](https://support.microsoft.com/en-us/topic/xbox-cloud-gaming-in-microsoft-edge-with-steam-deck-43dd011b-0ce8-4810-8302-965be6d53296)
