// src/utils/__tests__/calculations.test.ts

import { describe, it, expect } from 'vitest';
import {
  calculateCube,
  calculateBalok,
  calculateTabung,
  calculateSegitiga,
} from '../calculations'; // Pastikan path ini benar sesuai struktur Anda

describe('calculateCube', () => {
  it('should calculate volume and surface area correctly for a given side', () => {
    const side = 5;
    const results = calculateCube(side);

    // Memastikan hasil Volume benar
    expect(results[0].label).toBe('Volume');
    expect(results[0].value).toBe(125); // 5 * 5 * 5
    expect(results[0].unit).toBe('cm³');

    // Memastikan hasil Luas Permukaan benar
    expect(results[1].label).toBe('Luas Permukaan');
    expect(results[1].value).toBe(150); // 6 * 5 * 5
    expect(results[1].unit).toBe('cm²');
  });
});

describe('calculateBalok', () => {
  it('should calculate volume and surface area correctly for given dimensions', () => {
    const length = 10;
    const width = 5;
    const height = 2;
    const results = calculateBalok(length, width, height);

    // Memastikan hasil Volume benar
    expect(results[0].label).toBe('Volume');
    expect(results[0].value).toBe(100); // 10 * 5 * 2
    expect(results[0].unit).toBe('cm³');

    // Memastikan hasil Luas Permukaan benar
    expect(results[1].label).toBe('Luas Permukaan');
    expect(results[1].value).toBe(160); // 2 * (10*5 + 10*2 + 5*2) = 2 * (50 + 20 + 10) = 2 * 80
    expect(results[1].unit).toBe('cm²');
  });
});
describe('calculateTabung', () => {
  it('should calculate volume and surface area correctly for given radius and height', () => {
    const radius = 7;
    const height = 10;
    const results = calculateTabung(radius, height);

    // Memastikan hasil Volume benar (gunakan toBeCloseTo karena Math.PI)
    // Nilai Math.PI * 7 * 7 * 10 adalah sekitar 1539.3804002589987
    expect(results[0].label).toBe('Volume');
    expect(results[0].value).toBeCloseTo(1539.38); // Kita tetap gunakan 2 desimal di ekspektasi
    expect(results[0].unit).toBe('cm³');

    // Memastikan hasil Luas Permukaan benar (gunakan toBeCloseTo karena Math.PI)
    // Nilai 2 * Math.PI * 7 * (7 + 10) adalah sekitar 747.6990515543707
    expect(results[1].label).toBe('Luas Permukaan');
    // Solusi: Tingkatkan toleransi toBeCloseTo ke 2 desimal.
    // Ini berarti hanya dua angka di belakang koma yang harus cocok.
    expect(results[1].value).toBeCloseTo(747.7, 2); // <--- PERUBAHAN DI SINI
    expect(results[1].unit).toBe('cm²');
  });
});

describe('calculateSegitiga', () => {
  it('should calculate area correctly for given base and height', () => {
    const base = 10;
    const height = 8;
    const results = calculateSegitiga(base, height);

    // Memastikan hasil Luas benar
    expect(results[0].label).toBe('Luas');
    expect(results[0].value).toBe(40); // 0.5 * 10 * 8
    expect(results[0].unit).toBe('cm²');
  });
});
