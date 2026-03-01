import { Voxel } from '../store/voxelStore';

export const exportAsJSON = (voxels: Voxel[]): string => {
  return JSON.stringify(
    {
      version: '1.0',
      format: 'voxel-grid',
      grid_size: 40,
      voxels: voxels.map((v) => ({
        position: [v.x, v.y, v.z],
        color: v.color,
        scale: v.scale || [1, 1, 1],
        rotation: v.rotation || [0, 0, 0],
      })),
    },
    null,
    2
  );
};

export const exportAsTypeScript = (voxels: Voxel[]): string => {
  return `// Voxel Model - Auto-generated from EditVoxel
// Grid size: 40x40x40

interface Voxel {
  position: [number, number, number];
  color: string;
  scale: [number, number, number];
  rotation: [number, number, number];
}

const voxels: Voxel[] = [
${voxels
  .map(
    (v) =>
      `  {
    position: [${v.x}, ${v.y}, ${v.z}],
    color: '${v.color}',
    scale: [${v.scale?.[0] || 1}, ${v.scale?.[1] || 1}, ${v.scale?.[2] || 1}],
    rotation: [${v.rotation?.[0] || 0}, ${v.rotation?.[1] || 0}, ${v.rotation?.[2] || 0}],
  }`
  )
  .join(',\n')}
];

export default voxels;
`;
};

export const exportAsPython = (voxels: Voxel[]): string => {
  return `# Voxel Model - Auto-generated from EditVoxel
# Grid size: 40x40x40

voxels = [
${voxels
  .map(
    (v) =>
      `    {\n        'position': (${v.x}, ${v.y}, ${v.z}),\n        'color': '${v.color}',\n        'scale': (${v.scale?.[0] || 1}, ${v.scale?.[1] || 1}, ${v.scale?.[2] || 1}),\n        'rotation': (${v.rotation?.[0] || 0}, ${v.rotation?.[1] || 0}, ${v.rotation?.[2] || 0}),\n    }`
  )
  .join(',\n')}
]

def create_voxel_model(voxels):
    """Create a 3D voxel model from voxel data."""
    for voxel in voxels:
        x, y, z = voxel['position']
        color = voxel['color']
        scale = voxel['scale']
        rotation = voxel['rotation']
        # Implement your voxel placement logic here
        print(f"Voxel at ({x}, {y}, {z}): {color}")

if __name__ == '__main__':
    create_voxel_model(voxels)
`;
};

export const exportAsCSharp = (voxels: Voxel[]): string => {
  return `// Voxel Model - Auto-generated from EditVoxel
// Grid size: 40x40x40

using UnityEngine;
using System.Collections.Generic;

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

    public List<Voxel> voxels = new List<Voxel>
    {
${voxels
  .map(
    (v) =>
      `        new Voxel {
            position = new Vector3(${v.x}, ${v.y}, ${v.z}),
            color = "${v.color}",
            scale = new Vector3(${v.scale?.[0] || 1}f, ${v.scale?.[1] || 1}f, ${v.scale?.[2] || 1}f),
            rotation = new Vector3(${(v.rotation?.[0] || 0) * (180 / Math.PI)}f, ${(v.rotation?.[1] || 0) * (180 / Math.PI)}f, ${(v.rotation?.[2] || 0) * (180 / Math.PI)}f),
        }`
  )
  .join(',\n')}
    };

    public void BuildModel()
    {
        foreach (var voxel in voxels)
        {
            // Create cube at voxel.position
            GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            cube.transform.position = voxel.position;
            cube.transform.localScale = voxel.scale;
            cube.transform.eulerAngles = voxel.rotation;
            
            // Apply color
            Renderer renderer = cube.GetComponent<Renderer>();
            renderer.material.color = ParseHexColor(voxel.color);
        }
    }

    private Color ParseHexColor(string hex)
    {
        hex = hex.Replace("#", "");
        float r = int.Parse(hex.Substring(0, 2), System.Globalization.NumberStyles.HexNumber) / 255f;
        float g = int.Parse(hex.Substring(2, 2), System.Globalization.NumberStyles.HexNumber) / 255f;
        float b = int.Parse(hex.Substring(4, 2), System.Globalization.NumberStyles.HexNumber) / 255f;
        return new Color(r, g, b, 1f);
    }
}
`;
};

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
