import React, { useRef } from 'react';
import { useVoxelStore } from '../store/voxelStore';
import * as THREE from 'three';

interface VoxelBoxProps {
  voxel: {
    id: string;
    x: number;
    y: number;
    z: number;
    color: string;
    scale?: [number, number, number];
    rotation?: [number, number, number];
  };
  isSelected: boolean;
}

export const VoxelBox: React.FC<VoxelBoxProps> = ({ voxel, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const store = useVoxelStore();

  const scale = voxel.scale || [1, 1, 1];
  const rotation = voxel.rotation || [0, 0, 0];

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    store.selectVoxel(voxel.id, (e as any).ctrlKey || (e as any).metaKey);
  };

  return (
    <mesh
      ref={meshRef}
      position={[voxel.x, voxel.y, voxel.z]}
      rotation={rotation as [number, number, number]}
      scale={scale as [number, number, number]}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={voxel.color}
        metalness={0.3}
        roughness={0.7}
        emissive={isSelected ? voxel.color : undefined}
        emissiveIntensity={isSelected ? 0.3 : 0}
      />
      {isSelected && (
        <lineSegments>
          <edgeGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial color="#FFFF00" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  );
};
