import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { useVoxelStore } from '../store/voxelStore';
import { VoxelBox } from './VoxelBox';

const GRID_SIZE = 40;
const GRID_OFFSET = GRID_SIZE / 2;

const RaycasterHelper: React.FC = () => {
  const { camera, raycaster, pointer, gl } = useThree();
  const planeRef = useRef<THREE.Mesh>(null);
  const store = useVoxelStore();
  const [hoveredPos, setHoveredPos] = useState<[number, number, number] | null>(null);

  useEffect(() => {
    const handlePointerMove = () => {
      if (!planeRef.current) return;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(planeRef.current);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        const gridX = Math.floor(point.x + GRID_OFFSET);
        const gridY = Math.floor(point.y + GRID_OFFSET);
        const gridZ = Math.floor(point.z + GRID_OFFSET);

        // Clamp to grid bounds
        const x = Math.max(0, Math.min(GRID_SIZE - 1, gridX));
        const y = Math.max(0, Math.min(GRID_SIZE - 1, gridY));
        const z = Math.max(0, Math.min(GRID_SIZE - 1, gridZ));

        setHoveredPos([x, y, z]);
      }
    };

    const handlePointerDown = () => {
      if (hoveredPos) {
        store.addVoxel(hoveredPos[0], hoveredPos[1], hoveredPos[2]);
      }
    };

    gl.domElement.addEventListener('pointermove', handlePointerMove);
    gl.domElement.addEventListener('pointerdown', handlePointerDown);

    return () => {
      gl.domElement.removeEventListener('pointermove', handlePointerMove);
      gl.domElement.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [raycaster, pointer, camera, gl, store, hoveredPos]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') store.undo();
      if (e.ctrlKey && e.shiftKey && e.key === 'z') store.redo();
      if (e.key === 'Delete') {
        store.selectedVoxelIds.forEach((id) => store.removeVoxel(id));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [store]);

  return (
    <mesh
      ref={planeRef}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      visible={false}
    >
      <planeGeometry args={[GRID_SIZE, GRID_SIZE]} />
      <meshBasicMaterial />
    </mesh>
  );
};

const SceneContent: React.FC = () => {
  const store = useVoxelStore();

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-GRID_SIZE}
        shadow-camera-right={GRID_SIZE}
        shadow-camera-top={GRID_SIZE}
        shadow-camera-bottom={-GRID_SIZE}
      />

      {/* Environment */}
      <Environment preset="dawn" />
      <ContactShadows position={[0, -GRID_OFFSET - 0.5, 0]} scale={GRID_SIZE * 1.5} blur={2} />

      {/* Grid plane */}
      <Grid
        args={[GRID_SIZE, GRID_SIZE]}
        cellSize={1}
        cellColor={0x444444}
        sectionSize={5}
        sectionColor={0x888888}
        infiniteGrid
      />

      {/* Voxels */}
      {Array.from(store.voxels.values()).map((voxel) => (
        <VoxelBox
          key={voxel.id}
          voxel={voxel}
          isSelected={store.selectedVoxelIds.has(voxel.id)}
        />
      ))}

      {/* Raycaster */}
      <RaycasterHelper />

      {/* Camera controls */}
      <OrbitControls
        makeDefault
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
};

export const Scene3D: React.FC = () => {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [20, 20, 20], fov: 50 }}
      shadows
      gl={{
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      }}
    >
      <SceneContent />
    </Canvas>
  );
};
