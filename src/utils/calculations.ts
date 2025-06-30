// src/utils/calculations.ts

import { type CalculationResult } from '../types/index';

/**
 * Menghitung volume dan luas permukaan kubus.
 * @param side Panjang sisi kubus.
 * @returns Array hasil perhitungan (Volume, Luas Permukaan).
 */
export function calculateCube(side: number): CalculationResult[] {
  const volume = side * side * side;
  const surfaceArea = 6 * side * side;

  return [
    { label: 'Volume', value: volume, unit: 'cm³' },
    { label: 'Luas Permukaan', value: surfaceArea, unit: 'cm²' },
  ];
}

/**
 * Menghitung volume dan luas permukaan balok.
 * @param length Panjang balok.
 * @param width Lebar balok.
 * @param height Tinggi balok.
 * @returns Array hasil perhitungan (Volume, Luas Permukaan).
 */
export function calculateBalok(
  length: number,
  width: number,
  height: number
): CalculationResult[] {
  const volume = length * width * height;
  const surfaceArea = 2 * (length * width + length * height + width * height);

  return [
    { label: 'Volume', value: volume, unit: 'cm³' },
    { label: 'Luas Permukaan', value: surfaceArea, unit: 'cm²' },
  ];
}

/**
 * Menghitung volume dan luas permukaan tabung.
 * Menggunakan Math.PI untuk nilai pi.
 * @param radius Jari-jari alas tabung.
 * @param height Tinggi tabung.
 * @returns Array hasil perhitungan (Volume, Luas Permukaan).
 */
export function calculateTabung(
  radius: number,
  height: number
): CalculationResult[] {
  const volume = Math.PI * radius * radius * height;
  const surfaceArea = 2 * Math.PI * radius * (radius + height);

  return [
    { label: 'Volume', value: volume, unit: 'cm³' },
    { label: 'Luas Permukaan', value: surfaceArea, unit: 'cm²' },
  ];
}

/**
 * Menghitung luas segitiga.
 * @param base Alas segitiga.
 * @param height Tinggi segitiga.
 * @returns Array hasil perhitungan (Luas).
 */
export function calculateSegitiga(
  base: number,
  height: number
): CalculationResult[] {
  const area = 0.5 * base * height;

  return [{ label: 'Luas', value: area, unit: 'cm²' }];
}
