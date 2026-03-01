# 🚀 Setup Instructions

## Prerequisites

- **Node.js** 18+ (download from [nodejs.org](https://nodejs.org/))
- **npm** or **yarn** (comes with Node)
- **Git** (optional, for version control)

## Installation

### 1. Clone or download the repository

```bash
git clone https://github.com/Otavioqwert/edit-voxel.git
cd edit-voxel
```

Or download as ZIP and extract.

### 2. Install dependencies

```bash
npm install
```

This will download all required packages listed in `package.json`.

### 3. Start development server

```bash
npm run dev
```

You should see:
```
LOCAL:   http://localhost:5173/
```

Open your browser and go to `http://localhost:5173/`

## 🎮 First Build

1. **Click on the grid** to place a voxel
2. **Change color** using the color picker on the left
3. **Adjust scale** with the X/Y/Z sliders
4. **Rotate** using the rotation sliders
5. **Export** your model using the export buttons

## 💾 Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

To preview:

```bash
npm run preview
```

## 📄 Environment Setup (Optional)

If you want to contribute or modify the code:

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **Three.js Extension Pack** (if available)

### TypeScript Support

All code is written in TypeScript. The IDE should provide auto-completion and type hints.

## 🔧 Troubleshooting

### Port 5173 already in use?

```bash
npm run dev -- --port 3000
```

### Dependencies installation fails?

```bash
rm -rf node_modules
npm install
```

### Build errors?

Ensure TypeScript version matches:

```bash
npm ls typescript
```

Should be `^5.2.0`.

## 👥 Need Help?

Open an issue on GitHub: [edit-voxel/issues](https://github.com/Otavioqwert/edit-voxel/issues)

Happy building! 🎲
