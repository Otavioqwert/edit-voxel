import { create } from 'zustand';

export interface Voxel {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

interface VoxelStore {
  voxels: Map<string, Voxel>;
  selectedVoxelIds: Set<string>;
  currentColor: string;
  currentScale: [number, number, number];
  currentRotation: [number, number, number];
  history: Voxel[][];
  historyIndex: number;

  addVoxel: (x: number, y: number, z: number) => void;
  removeVoxel: (id: string) => void;
  updateVoxel: (id: string, updates: Partial<Voxel>) => void;
  selectVoxel: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  setCurrentColor: (color: string) => void;
  setCurrentScale: (scale: [number, number, number]) => void;
  setCurrentRotation: (rotation: [number, number, number]) => void;
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  importVoxels: (voxels: Voxel[]) => void;
  exportVoxels: () => Voxel[];
}

const generateId = () => `voxel-${Date.now()}-${Math.random()}`;

export const useVoxelStore = create<VoxelStore>((set, get) => ({
  voxels: new Map(),
  selectedVoxelIds: new Set(),
  currentColor: '#ff0000',
  currentScale: [1, 1, 1],
  currentRotation: [0, 0, 0],
  history: [],
  historyIndex: -1,

  addVoxel: (x, y, z) => {
    const state = get();
    const id = generateId();
    const newVoxel: Voxel = {
      id,
      x,
      y,
      z,
      color: state.currentColor,
      scale: state.currentScale,
      rotation: state.currentRotation,
    };

    set((prev) => {
      const newVoxels = new Map(prev.voxels);
      newVoxels.set(id, newVoxel);
      return { voxels: newVoxels };
    });

    state.saveHistory();
  },

  removeVoxel: (id) => {
    set((prev) => {
      const newVoxels = new Map(prev.voxels);
      newVoxels.delete(id);
      const newSelected = new Set(prev.selectedVoxelIds);
      newSelected.delete(id);
      return { voxels: newVoxels, selectedVoxelIds: newSelected };
    });
    get().saveHistory();
  },

  updateVoxel: (id, updates) => {
    set((prev) => {
      const voxel = prev.voxels.get(id);
      if (!voxel) return prev;

      const newVoxels = new Map(prev.voxels);
      newVoxels.set(id, { ...voxel, ...updates });
      return { voxels: newVoxels };
    });
    get().saveHistory();
  },

  selectVoxel: (id, multi) => {
    set((prev) => {
      if (!multi) {
        return { selectedVoxelIds: new Set([id]) };
      }

      const newSelected = new Set(prev.selectedVoxelIds);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return { selectedVoxelIds: newSelected };
    });
  },

  clearSelection: () => set({ selectedVoxelIds: new Set() }),

  setCurrentColor: (color) => set({ currentColor: color }),

  setCurrentScale: (scale) => set({ currentScale: scale }),

  setCurrentRotation: (rotation) => set({ currentRotation: rotation }),

  saveHistory: () => {
    set((prev) => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(Array.from(prev.voxels.values()));
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  undo: () => {
    set((prev) => {
      if (prev.historyIndex <= 0) return prev;

      const newIndex = prev.historyIndex - 1;
      const voxelsData = prev.history[newIndex];
      const newVoxels = new Map(voxelsData.map((v) => [v.id, v]));

      return { voxels: newVoxels, historyIndex: newIndex };
    });
  },

  redo: () => {
    set((prev) => {
      if (prev.historyIndex >= prev.history.length - 1) return prev;

      const newIndex = prev.historyIndex + 1;
      const voxelsData = prev.history[newIndex];
      const newVoxels = new Map(voxelsData.map((v) => [v.id, v]));

      return { voxels: newVoxels, historyIndex: newIndex };
    });
  },

  clear: () => {
    set({ voxels: new Map(), selectedVoxelIds: new Set(), history: [], historyIndex: -1 });
  },

  importVoxels: (voxels) => {
    const newVoxels = new Map(voxels.map((v) => [v.id, v]));
    set({ voxels: newVoxels });
    get().saveHistory();
  },

  exportVoxels: () => {
    return Array.from(get().voxels.values());
  },
}));
