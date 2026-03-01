import React from 'react';
import { Scene3D } from './components/Scene3D';
import { Toolbar } from './components/Toolbar';

function App() {
  return (
    <div className="w-full h-screen bg-black flex">
      <Toolbar />
      <div className="flex-1 ml-80">
        <Scene3D />
      </div>
    </div>
  );
}

export default App;
