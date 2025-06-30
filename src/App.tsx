// src/App.tsx

import { useState } from 'react';
import type { ShapeType } from './types';
import ShapeList from './components/ShapeList';
import ShapeCalculator from './components/ShapeCalculator'; // Import komponen ShapeCalculator

function App() {
  const [selectedShape, setSelectedShape] = useState<ShapeType>(null);

  const handleSelectShape = (shapeType: ShapeType) => {
    setSelectedShape(shapeType);
  };

  const handleBackToList = () => {
    setSelectedShape(null);
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8'>
      {/* Container utama dengan background yang sama dengan ShapeList, untuk konsistensi */}
      <div
        className='
        w-full max-w-4xl p-8 rounded-2xl shadow-2xl
        bg-gradient-to-br from-blue-500 to-purple-600
        relative overflow-hidden flex flex-col items-center justify-center
      '
      >
        {/* Efek visual latar belakang (opsional, untuk sentuhan modern) */}
        <div
          className='absolute top-0 left-0 w-full h-full opacity-10'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 0h3v3H0V0zm3 3h3v3H3V3z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
          }}
        ></div>

        {/* Tampilkan ShapeList jika belum ada bangun ruang yang dipilih */}
        {!selectedShape && <ShapeList onSelectShape={handleSelectShape} />}

        {/* Tampilkan ShapeCalculator jika ada bangun ruang yang dipilih */}
        {selectedShape && (
          <ShapeCalculator
            shapeType={selectedShape}
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
