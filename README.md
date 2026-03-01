# 🎮 Voxel Builder

**A Minecraft-like 3D voxel editor with export capabilities**

Build 3D models in a 40×40×40 grid, customize dimensions, angles, and colors, then export your creation as **TypeScript**, **Python**, **C#**, or **JSON** code.

![Voxel Builder](https://img.shields.io/badge/voxel-editor-blue?style=for-the-badge)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-eee?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

- ✅ **40×40×40 Grid** - Unlimited voxel placement
- ✅ **No spacing/flick** - Perfectly aligned cubes
- ✅ **Color picker** - 12 presets + custom colors
- ✅ **Transformer controls** - Scale (X, Y, Z) and rotation (deg)
- ✅ **Multi-select** - Click multiple voxels with Ctrl
- ✅ **Drag & drop** - Rotate view smoothly
- ✅ **Undo/Redo** - Full history support
- ✅ **Export to code**:
  - 📋 JSON
  - 🔷 TypeScript (ready to import)
  - 🐍 Python (with Pygame/Panda3D support)
  - 🎮 C# (Unity-ready)

## 🚀 Quick Start

### Install dependencies

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

## 🎮 Usage

### Basic Controls

| Action | Control |
|--------|----------|
| **Add voxel** | Click on the grid |
| **Rotate view** | Drag with mouse |
| **Zoom** | Scroll wheel |
| **Select voxel** | Click (single) or Ctrl+Click (multi) |
| **Delete selected** | Press Delete |
| **Undo** | Ctrl+Z |
| **Redo** | Ctrl+Shift+Z |

### Toolbar

**Color Panel**: Choose a color before placing voxels

**Scale Controls**: Adjust X, Y, Z dimensions (0.1 - 3.0)

**Rotation Controls**: Set rotation angles in degrees (0° - 360°)

**Export**: Download your model as:
- `voxel-model.json` - Portable voxel data
- `voxel-model.ts` - TypeScript module
- `voxel_model.py` - Python script
- `VoxelModel.cs` - Unity C# script

## 💻 Code Export Examples

### TypeScript

```typescript
interface Voxel {
  position: [number, number, number];
  color: string;
  scale: [number, number, number];
  rotation: [number, number, number];
}

const voxels: Voxel[] = [
  { position: [0, 0, 0], color: '#FF0000', scale: [1, 1, 1], rotation: [0, 0, 0] },
  // ...
];
```

### Python

```python
voxels = [
    {
        'position': (0, 0, 0),
        'color': '#FF0000',
        'scale': (1, 1, 1),
        'rotation': (0, 0, 0),
    },
    # ...
]

def create_voxel_model(voxels):
    for voxel in voxels:
        x, y, z = voxel['position']
        color = voxel['color']
        # Your logic here
```

### C# (Unity)

```csharp
public class VoxelModel : MonoBehaviour
{
    [System.Serializable]
    public class Voxel
    {
        public Vector3 position;
        public string color;
        public Vector3 scale;
        public Vector3 rotation;
    }

    public List<Voxel> voxels = new List<Voxel> { /* ... */ };

    public void BuildModel()
    {
        foreach (var voxel in voxels)
        {
            GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            cube.transform.position = voxel.position;
            cube.transform.localScale = voxel.scale;
            cube.transform.eulerAngles = voxel.rotation;
            
            Renderer renderer = cube.GetComponent<Renderer>();
            renderer.material.color = ParseHexColor(voxel.color);
        }
    }
}
```

### JSON

```json
{
  "version": "1.0",
  "format": "voxel-grid",
  "grid_size": 40,
  "voxels": [
    {
      "position": [0, 0, 0],
      "color": "#FF0000",
      "scale": [1, 1, 1],
      "rotation": [0, 0, 0]
    }
  ]
}
```

## 🏗️ Architecture

### State Management
- **Zustand** for global state (voxels, selection, colors)
- Automatic history/undo tracking

### 3D Rendering
- **React Three Fiber** for 3D scene
- **Three.js** geometry and materials
- **Raycaster** for voxel placement detection

### UI
- **Tailwind CSS** for styling
- **Vite** for fast bundling

## 📁 Project Structure

```
src/
├── components/
│   ├── Scene3D.tsx       # 3D canvas with raycaster
│   ├── VoxelBox.tsx      # Individual voxel mesh
│   └── Toolbar.tsx       # Color, scale, rotation controls
├── store/
│   └── voxelStore.ts     # Zustand state management
├── utils/
│   └── exporters.ts      # Export functions (TS, Python, C#, JSON)
├── App.tsx               # Main layout component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **React Three Fiber** - 3D with React
- **Three.js** - 3D graphics library
- **Zustand** - State management
- **Tailwind CSS** - Styling

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-three-fiber": "^8.15.0",
  "three": "^r128",
  "zustand": "^4.4.0"
}
```

## 🤝 Contributing

Feel free to fork, modify, and submit PRs!

## 📝 License

MIT - Use freely for personal and commercial projects.

## 🎯 Future Roadmap

- [ ] Physics-based voxel stacking
- [ ] Texture support
- [ ] Import from JSON/3D models
- [ ] Collaborative editing
- [ ] Performance optimization for 1000+ voxels
- [ ] Mobile touch controls
- [ ] Save/load to cloud

---

**Made with ❤️ by Otavio**

Questions? Open an issue! 🚀
