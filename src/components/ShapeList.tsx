// src/components/ShapeList.tsx

import React from 'react';
import type { ShapeDefinition, ShapeType } from '../types';

// Data definisi bangun ruang yang akan ditampilkan
const SHAPES: ShapeDefinition[] = [
  {
    type: 'kubus',
    name: 'Kubus',
    description: 'Hitung volume dan luas permukaan kubus.',
  },
  {
    type: 'balok',
    name: 'Balok',
    description: 'Hitung volume dan luas permukaan balok.',
  },
  {
    type: 'tabung',
    name: 'Tabung',
    description: 'Hitung volume dan luas permukaan tabung.',
  },
  { type: 'segitiga', name: 'Segitiga', description: 'Hitung luas segitiga.' },
];

/**
 * Props untuk komponen ShapeList.
 * @param onSelectShape Fungsi callback yang dipanggil ketika sebuah bangun ruang dipilih.
 */
interface ShapeListProps {
  onSelectShape: (shape: ShapeType) => void;
}

/**
 * Komponen ShapeList menampilkan daftar bangun ruang yang tersedia.
 * Pengguna dapat mengklik salah satu bangun ruang untuk memilihnya.
 */
const ShapeList: React.FC<ShapeListProps> = ({ onSelectShape }) => {
  return (
    // Background gradasi modern untuk keseluruhan area daftar bangun ruang
    <div
      className='
      w-full max-w-4xl p-8 rounded-2xl shadow-2xl
      bg-gradient-to-br from-blue-500 to-purple-600
      relative overflow-hidden
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

      <h2
        className='
        text-4xl font-extrabold text-center text-white mb-10
        relative z-10 drop-shadow-lg tracking-tight
      '
      >
        Pilih Bentuk Geometri
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10'>
        {SHAPES.map((shape) => (
          <div
            key={shape.type}
            className='
              bg-white bg-opacity-90 rounded-xl shadow-xl p-6
              cursor-pointer transform transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-2xl hover:bg-opacity-100
              flex flex-col items-center text-center border border-transparent hover:border-blue-300
            '
            onClick={() => onSelectShape(shape.type)}
            role='button'
            tabIndex={0}
            aria-label={`Pilih ${shape.name}`}
          >
            <h3 className='text-2xl font-bold text-gray-800 mb-2'>
              {shape.name}
            </h3>
            <p className='text-gray-600 text-base'>{shape.description}</p>
            {/* Arrow icon on hover - sedikit dimodifikasi agar sesuai dengan tema terang card */}
            <div
              className='
              absolute bottom-4 right-4 text-blue-600 opacity-0
              group-hover:opacity-100 transition-opacity duration-300 ease-in-out
              text-lg
            '
            >
              →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapeList;
