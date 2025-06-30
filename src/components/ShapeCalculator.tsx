// src/components/ShapeCalculator.tsx

import React, { useState, useEffect } from 'react';
import type { ShapeType, CalculationResult } from '../types';
import InputField from './InputField'; // Import komponen InputField yang sudah kita buat
import {
  calculateCube,
  calculateBalok,
  calculateTabung,
  calculateSegitiga,
} from '../utils/calculations'; // Import fungsi perhitungan

/**
 * Interface untuk menyimpan nilai input dari form secara dinamis.
 * Keys akan disesuaikan dengan nama dimensi (misal: 'side', 'length', 'width', 'height', 'radius', 'base').
 */
interface ShapeInputs {
  [key: string]: number;
}

/**
 * Props untuk komponen ShapeCalculator.
 * @param shapeType Tipe bangun ruang yang akan dihitung.
 * @param onBack Fungsi callback untuk kembali ke daftar bangun ruang.
 */
interface ShapeCalculatorProps {
  shapeType: ShapeType;
  onBack: () => void;
}

/**
 * Komponen ShapeCalculator menampilkan form input dan hasil perhitungan
 * berdasarkan bangun ruang yang dipilih.
 */
const ShapeCalculator: React.FC<ShapeCalculatorProps> = ({
  shapeType,
  onBack,
}) => {
  // State untuk menyimpan nilai-nilai input dari form
  const [inputs, setInputs] = useState<ShapeInputs>({});
  // State untuk menyimpan hasil perhitungan
  const [results, setResults] = useState<CalculationResult[] | null>(null);
  // State untuk validasi input
  const [error, setError] = useState<string | null>(null);

  // Reset input dan hasil setiap kali shapeType berubah (pengguna memilih bangun ruang lain)
  useEffect(() => {
    setInputs({});
    setResults(null);
    setError(null);
  }, [shapeType]);

  /**
   * Mengatur nilai input spesifik.
   * @param key Nama dimensi (misal: 'side', 'length').
   * @param value Nilai numerik dari input.
   */
  const handleInputChange = (key: string, value: number) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  /**
   * Menangani submit form untuk melakukan perhitungan.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah refresh halaman
    setError(null); // Reset error sebelumnya

    let calculatedResults: CalculationResult[] | null = null;
    let isValid = true;

    // Logika perhitungan berdasarkan shapeType
    switch (shapeType) {
      case 'kubus': {
        const side = inputs.side || 0;
        if (side <= 0) {
          setError('Sisi harus lebih besar dari 0.');
          isValid = false;
        } else {
          calculatedResults = calculateCube(side);
        }
        break;
      }
      case 'balok': {
        const { length, width, height } = inputs;
        if ((length || 0) <= 0 || (width || 0) <= 0 || (height || 0) <= 0) {
          setError('Panjang, lebar, dan tinggi harus lebih besar dari 0.');
          isValid = false;
        } else {
          calculatedResults = calculateBalok(length, width, height);
        }
        break;
      }
      case 'tabung': {
        const { radius, height: tabungHeight } = inputs; // Alias 'height' agar tidak bentrok
        if ((radius || 0) <= 0 || (tabungHeight || 0) <= 0) {
          setError('Jari-jari dan tinggi harus lebih besar dari 0.');
          isValid = false;
        } else {
          calculatedResults = calculateTabung(radius, tabungHeight);
        }
        break;
      }
      case 'segitiga': {
        const { base, height: segitigaHeight } = inputs; // Alias 'height'
        if ((base || 0) <= 0 || (segitigaHeight || 0) <= 0) {
          setError('Alas dan tinggi harus lebih besar dari 0.');
          isValid = false;
        } else {
          calculatedResults = calculateSegitiga(base, segitigaHeight);
        }
        break;
      }
      default:
        setError('Bangun ruang tidak dikenal.');
        isValid = false;
        break;
    }

    if (isValid) {
      setResults(calculatedResults);
    } else {
      setResults(null); // Hapus hasil jika ada error
    }
  };

  // Render form input yang berbeda berdasarkan shapeType
  const renderFormInputs = () => {
    switch (shapeType) {
      case 'kubus':
        return (
          <InputField
            id='side'
            label='Panjang Sisi (cm)'
            value={inputs.side || ''} // Tampilkan kosong jika belum ada nilai
            onChange={(value) => handleInputChange('side', value)}
            placeholder='Masukkan panjang sisi'
          />
        );
      case 'balok':
        return (
          <>
            <InputField
              id='length'
              label='Panjang (cm)'
              value={inputs.length || ''}
              onChange={(value) => handleInputChange('length', value)}
              placeholder='Masukkan panjang'
            />
            <InputField
              id='width'
              label='Lebar (cm)'
              value={inputs.width || ''}
              onChange={(value) => handleInputChange('width', value)}
              placeholder='Masukkan lebar'
            />
            <InputField
              id='height'
              label='Tinggi (cm)'
              value={inputs.height || ''}
              onChange={(value) => handleInputChange('height', value)}
              placeholder='Masukkan tinggi'
            />
          </>
        );
      case 'tabung':
        return (
          <>
            <InputField
              id='radius'
              label='Jari-jari (cm)'
              value={inputs.radius || ''}
              onChange={(value) => handleInputChange('radius', value)}
              placeholder='Masukkan jari-jari'
            />
            <InputField
              id='height'
              label='Tinggi (cm)'
              value={inputs.height || ''}
              onChange={(value) => handleInputChange('height', value)}
              placeholder='Masukkan tinggi'
            />
          </>
        );
      case 'segitiga':
        return (
          <>
            <InputField
              id='base'
              label='Alas (cm)'
              value={inputs.base || ''}
              onChange={(value) => handleInputChange('base', value)}
              placeholder='Masukkan panjang alas'
            />
            <InputField
              id='height'
              label='Tinggi (cm)'
              value={inputs.height || ''}
              onChange={(value) => handleInputChange('height', value)}
              placeholder='Masukkan tinggi segitiga'
            />
          </>
        );
      default:
        return (
          <p className='text-gray-600'>
            Pilih bangun ruang untuk melihat form.
          </p>
        );
    }
  };

  return (
    <div className='w-full max-w-md bg-white rounded-xl shadow-xl p-6 relative'>
      <button
        onClick={onBack}
        className='
          absolute top-4 left-4 px-3 py-1 bg-blue-100 text-blue-700
          rounded-full hover:bg-blue-200 transition-colors text-sm
        '
        aria-label='Kembali ke daftar bangun ruang'
      >
        ← Kembali
      </button>

      <h2 className='text-3xl font-bold text-center text-gray-800 mb-6 mt-8'>
        Hitung {shapeType!.charAt(0).toUpperCase() + shapeType!.slice(1)}
      </h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {renderFormInputs()}

        {error && <p className='text-red-500 text-center text-sm'>{error}</p>}

        <button
          type='submit'
          className='
            w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg
            hover:bg-blue-700 focus:outline-none focus:shadow-outline
            transition-colors duration-200
          '
        >
          Hitung
        </button>
      </form>

      {results && results.length > 0 && (
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Hasil Perhitungan:
          </h3>
          <ul className='space-y-2'>
            {results.map((result) => (
              <li
                key={result.label}
                className='flex justify-between items-center text-gray-700'
              >
                <span className='font-medium'>{result.label}:</span>
                <span className='text-lg font-bold text-blue-600'>
                  {result.value.toFixed(2)} {result.unit}{' '}
                  {/* Pembulatan 2 desimal */}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShapeCalculator;
