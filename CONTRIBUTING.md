# Contributing to Xbox Cloud Gaming for Steam Deck

Thank you for your interest in contributing to this Decky Loader plugin!

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- Steam Deck or SteamOS (for testing)
- Decky Loader installed

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/elemarin/decky-xcloud.git
cd decky-xcloud
```

2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

## Project Structure

```
decky-xcloud/
├── main.py           # Python backend (handles Edge installation, shortcuts)
├── src/
│   └── index.tsx     # React frontend UI
├── plugin.json       # Plugin manifest
├── package.json      # NPM dependencies
├── tsconfig.json     # TypeScript configuration
├── rollup.config.js  # Build configuration
├── defaults.json     # Plugin default settings
└── dist/             # Built files (generated)
    └── index.js      # Compiled frontend
```

## Making Changes

### Backend (Python)

The backend code in `main.py` handles:
- Checking if Edge is installed via Flatpak
- Installing Edge from Flathub
- Creating desktop shortcuts
- Launching Xbox Cloud Gaming with proper permissions

After making changes to `main.py`, verify Python syntax:
```bash
python3 -m py_compile main.py
```

### Frontend (TypeScript/React)

The frontend code in `src/index.tsx` provides:
- UI for displaying installation status
- Buttons for triggering backend actions
- User feedback and error messages

After making changes to TypeScript files, rebuild:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Testing

### Local Testing

1. Build the plugin:
```bash
npm run build
```

2. Copy the plugin to Decky's plugin directory:
```bash
cp -r /path/to/decky-xcloud ~/.local/share/decky/plugins/
```

3. Restart Decky Loader or reload the plugin

### Manual Testing Checklist

- [ ] Plugin loads in Decky menu
- [ ] Status correctly shows Edge installation state
- [ ] Edge installation completes successfully
- [ ] Shortcut is created properly
- [ ] Xbox Cloud Gaming launches with correct permissions
- [ ] Error handling works for edge cases

## Code Style

### Python
- Follow PEP 8 style guide
- Use type hints where appropriate
- Add docstrings for all public methods
- Use async/await for Decky plugin methods

### TypeScript/React
- Use functional components with hooks
- Follow existing code formatting
- Add proper type annotations
- Keep components focused and reusable

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### PR Requirements

- [ ] Code builds without errors
- [ ] No new security vulnerabilities
- [ ] README updated if needed
- [ ] Changes tested on Steam Deck (if possible)

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.
