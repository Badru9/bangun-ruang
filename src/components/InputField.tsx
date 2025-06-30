// src/components/InputField.tsx

import React from 'react';
import { type InputFieldProps } from '../types'; // Import interface yang sudah kita buat

/**
 * Komponen InputField yang generik dan dapat digunakan kembali.
 * Menerima props id, label, value, dan onChange.
 */
const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  min = 0, // Default nilai minimum adalah 0
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mengubah nilai input menjadi angka. Jika tidak valid, kembalikan 0 atau biarkan kosong.
    // Kita biarkan string kosong agar input field bisa dikosongkan oleh user.
    const numValue = parseFloat(e.target.value);
    onChange(isNaN(numValue) ? 0 : numValue);
  };

  return (
    <div className='mb-4'>
      <label
        htmlFor={id}
        className='block text-gray-700 text-sm font-bold mb-2'
      >
        {label}:
      </label>
      <input
        type='number'
        id={id}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        value={
          value === 0 &&
          (isNaN(parseFloat(String(value))) || String(value) === '')
            ? ''
            : value
        } // Tampilkan kosong jika nilai 0 dan belum ada input
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
      />
    </div>
  );
};

export default InputField;
