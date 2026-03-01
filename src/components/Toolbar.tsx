import React, { useState } from 'react';
import { useVoxelStore } from '../store/voxelStore';
import {
  exportAsJSON,
  exportAsTypeScript,
  exportAsPython,
  exportAsCSharp,
  downloadFile,
} from '../utils/exporters';

const PRESET_COLORS = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#808080', '#FFFFFF', '#000000',
];

export const Toolbar: React.FC = () => {
  const store = useVoxelStore();
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [scaleZ, setScaleZ] = useState(1);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);

  const handleExport = (format: 'json' | 'typescript' | 'python' | 'csharp') => {
    const voxels = store.exportVoxels();
    let content: string;
    let filename: string;
    let type: string;

    switch (format) {
      case 'json':
        content = exportAsJSON(voxels);
        filename = 'voxel-model.json';
        type = 'application/json';
        break;
      case 'typescript':
        content = exportAsTypeScript(voxels);
        filename = 'voxel-model.ts';
        type = 'text/typescript';
        break;
      case 'python':
        content = exportAsPython(voxels);
        filename = 'voxel_model.py';
        type = 'text/python';
        break;
      case 'csharp':
        content = exportAsCSharp(voxels);
        filename = 'VoxelModel.cs';
        type = 'text/csharp';
        break;
    }

    downloadFile(content, filename, type);
  };

  const handleScaleChange = () => {
    store.setCurrentScale([scaleX, scaleY, scaleZ]);
  };

  const handleRotationChange = () => {
    store.setCurrentRotation([rotX, rotY, rotZ]);
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-80 bg-dark-surface border-r border-dark-border overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="border-b border-dark-border pb-4">
          <h1 className="text-xl font-bold text-white mb-2">Voxel Builder</h1>
          <p className="text-xs text-gray-400">Grid: 40×40×40 | Voxels: {store.voxels.size}</p>
        </div>

        {/* Color Picker */}
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-2">Color</h2>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={store.currentColor}
              onChange={(e) => store.setCurrentColor(e.target.value)}
              className="w-12 h-12 cursor-pointer"
            />
            <span className="text-xs text-gray-400">{store.currentColor}</span>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                className="w-full aspect-square rounded border border-dark-border hover:border-gray-400 transition"
                style={{ backgroundColor: color }}
                onClick={() => store.setCurrentColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Scale Control */}
        <div className="border-t border-dark-border pt-4">
          <h2 className="text-sm font-semibold text-gray-300 mb-2">Scale (X, Y, Z)</h2>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-400">X: {scaleX.toFixed(2)}</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scaleX}
                onChange={(e) => {
                  setScaleX(parseFloat(e.target.value));
                  handleScaleChange();
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Y: {scaleY.toFixed(2)}</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scaleY}
                onChange={(e) => {
                  setScaleY(parseFloat(e.target.value));
                  handleScaleChange();
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Z: {scaleZ.toFixed(2)}</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scaleZ}
                onChange={(e) => {
                  setScaleZ(parseFloat(e.target.value));
                  handleScaleChange();
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Rotation Control */}
        <div className="border-t border-dark-border pt-4">
          <h2 className="text-sm font-semibold text-gray-300 mb-2">Rotation (deg)</h2>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-400">X: {rotX.toFixed(0)}°</label>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={rotX}
                onChange={(e) => {
                  setRotX(parseFloat(e.target.value));
                  handleRotationChange();
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Y: {rotY.toFixed(0)}°</label>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={rotY}
                onChange={(e) => {
                  setRotY(parseFloat(e.target.value));
                  handleRotationChange();
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Z: {rotZ.toFixed(0)}°</label>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={rotZ}
                onChange={(e) => {
                  setRotZ(parseFloat(e.target.value));
                  handleRotationChange();
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-dark-border pt-4 space-y-2">
          <button
            onClick={() => store.undo()}
            className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white transition"
          >
            ↶ Undo
          </button>
          <button
            onClick={() => store.redo()}
            className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white transition"
          >
            ↷ Redo
          </button>
          <button
            onClick={() => store.clear()}
            className="w-full px-3 py-2 bg-red-900 hover:bg-red-800 rounded text-sm text-white transition"
          >
            Clear All
          </button>
        </div>

        {/* Export */}
        <div className="border-t border-dark-border pt-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-300">Export</h2>
          <button
            onClick={() => handleExport('json')}
            className="w-full px-3 py-2 bg-blue-900 hover:bg-blue-800 rounded text-sm text-white transition"
          >
            📄 JSON
          </button>
          <button
            onClick={() => handleExport('typescript')}
            className="w-full px-3 py-2 bg-blue-900 hover:bg-blue-800 rounded text-sm text-white transition"
          >
            🔷 TypeScript
          </button>
          <button
            onClick={() => handleExport('python')}
            className="w-full px-3 py-2 bg-blue-900 hover:bg-blue-800 rounded text-sm text-white transition"
          >
            🐍 Python
          </button>
          <button
            onClick={() => handleExport('csharp')}
            className="w-full px-3 py-2 bg-blue-900 hover:bg-blue-800 rounded text-sm text-white transition"
          >
            ⚙️ C# (Unity)
          </button>
        </div>

        {/* Info */}
        <div className="border-t border-dark-border pt-4 text-xs text-gray-400 space-y-1">
          <p>💡 <strong>Click</strong> canvas to add voxels</p>
          <p>🖱️ <strong>Drag</strong> to rotate view</p>
          <p>🔍 <strong>Scroll</strong> to zoom</p>
          <p>✏️ <strong>Selected:</strong> {store.selectedVoxelIds.size}</p>
        </div>
      </div>
    </div>
  );
};
