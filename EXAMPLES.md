# 💫 Examples & Advanced Usage

## Example: Building a Simple House

### Step 1: Create the Base
1. Set color to brown (`#8B4513`)
2. Click multiple times in a 10×10 grid on Z=0 (ground level)
3. This creates your foundation

### Step 2: Add Walls
1. Change scale to `[1, 2, 1]` for tall blocks
2. Set color to red brick (`#C0392B`)
3. Click around the edges to create walls

### Step 3: Add Roof
1. Scale to `[1, 0.5, 1]` for thin slabs
2. Set color to dark gray (`#2C3E50`)
3. Place on top layer

### Step 4: Add Door
1. Scale to `[0.8, 1.5, 0.5]`
2. Set color to yellow (`#F39C12`)
3. Place at one wall

### Step 5: Export
- Click **TypeScript** to get code for a game engine
- Click **Python** to use with Pygame
- Click **C#** for Unity integration

## Advanced: Programmatic Import

### From JSON File

```javascript
async function loadModel() {
  const response = await fetch('/models/my-house.json');
  const data = await response.json();
  
  // Convert to voxel format
  const voxels = data.voxels.map((v) => ({
    id: `voxel-${Math.random()}`,
    x: v.position[0],
    y: v.position[1],
    z: v.position[2],
    color: v.color,
    scale: v.scale,
    rotation: v.rotation,
  }));
  
  // Import into editor
  useVoxelStore.getState().importVoxels(voxels);
}
```

## Integration with Game Engines

### Unity (C#)

```csharp
// Export from editor as VoxelModel.cs
using UnityEngine;

public class GameBuilder : MonoBehaviour
{
    private VoxelModel voxelModel;

    void Start()
    {
        voxelModel = gameObject.AddComponent<VoxelModel>();
        voxelModel.BuildModel();
    }
}
```

### Godot (GDScript via Python)

```gdscript
# After exporting to Python and converting to GDScript
extends Node3D

var voxels = [
    {"position": Vector3(0, 0, 0), "color": Color.RED},
    # ...
]

func _ready():
    for voxel in voxels:
        var mesh = BoxMesh.new()
        var material = StandardMaterial3D.new()
        material.albedo_color = voxel["color"]
        # Add to scene
```

### Roblox (TypeScript via lua)

```lua
-- Convert TypeScript export to Roblox Lua
local voxels = {
    {position = Vector3.new(0, 0, 0), color = Color3.fromRGB(255, 0, 0)},
}

for _, voxel in ipairs(voxels) do
    local part = Instance.new("Part")
    part.Position = voxel.position
    part.Color = voxel.color
    part.Parent = workspace
end
```

## Performance Tips

### Optimization

1. **Use Undo/Redo** - Stay under 1000 voxels for smooth performance
2. **Batch Operations** - Group similar colors together before placing
3. **Minimize Rotation** - Rotation calculations are expensive

### Export & Optimize

```python
# Python: Merge adjacent voxels with same color
def merge_voxels(voxels):
    merged = {}
    for v in voxels:
        key = (v['position'], v['color'])
        if key not in merged:
            merged[key] = v
    return list(merged.values())

optimized = merge_voxels(voxels)
print(f"Reduced from {len(voxels)} to {len(optimized)} voxels")
```

## Advanced Workflows

### Create Animated Sequence

1. Build frame 1 of animation
2. Export as TypeScript
3. Clear grid (Ctrl+A, Delete)
4. Build frame 2
5. Export as TypeScript
6. Combine frames in your game engine

### Procedural Generation

Use exported JSON as seed data:

```python
import json
import random

with open('voxel-model.json') as f:
    template = json.load(f)

# Randomly vary colors
for voxel in template['voxels']:
    base_color = voxel['color']
    # Shift hue slightly
    voxel['color'] = vary_color(base_color, amount=10)

with open('voxel-model-varied.json', 'w') as f:
    json.dump(template, f)
```

### Batch Process Models

```bash
#!/bin/bash
# Export multiple models and convert to different formats

for model in models/*.json; do
  python convert_to_obj.py "$model" "${model%.json}.obj"
done
```

## Keyboard Shortcuts (Advanced)

| Key | Action |
|-----|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Delete` | Delete selected |
| `Ctrl+A` | Select all (planned) |
| `Ctrl+D` | Duplicate (planned) |
| `Ctrl+E` | Export menu (planned) |
| `R` | Rotate mode (planned) |
| `S` | Scale mode (planned) |

## Troubleshooting

### Voxels not appearing?
- Check if voxel is within grid bounds (0-39 on each axis)
- Verify color is valid hex format
- Try clearing and rebuilding

### Export shows wrong values?
- Ensure scale values are between 0.1 and 3.0
- Rotation should be 0-360 degrees
- Try exporting to JSON first to verify data

### Performance drops with many voxels?
- Keep under 1000 active voxels
- Reduce polygon complexity in renderer
- Export and optimize in target engine

---

**Have ideas for examples?** Open an issue! 🚀
