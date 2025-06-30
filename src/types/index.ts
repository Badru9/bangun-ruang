// src/types/index.ts

/**
 * Tipe untuk mengidentifikasi bangun ruang yang berbeda.
 * Digunakan untuk navigasi dan pemilihan.
 */
export type ShapeType = 'kubus' | 'balok' | 'tabung' | 'segitiga' | null;

/**
 * Interface dasar untuk input dimensi.
 * Semua input dimensi akan memiliki 'value' (nilai angka) dan 'label' (nama yang ditampilkan).
 */
export interface DimensionInput {
  value: number;
  label: string;
}

/**
 * Interface untuk hasil perhitungan.
 * Setiap hasil akan memiliki 'label' (misal: "Volume", "Luas Permukaan")
 * dan 'value' (hasil angka).
 */
export interface CalculationResult {
  label: string;
  value: number;
  unit?: string; // Satuan, opsional (misal: "cm³", "cm²")
}

/**
 * Interface untuk mendefinisikan sebuah bangun ruang.
 * Ini akan digunakan untuk menampilkan daftar bangun ruang di UI.
 */
export interface ShapeDefinition {
  type: ShapeType;
  name: string; // Nama yang akan ditampilkan di UI (misal: "Kubus")
  description: string; // Deskripsi singkat
  icon?: string; // Opsional: untuk ikon jika kita ingin menambahkannya nanti
}

/**
 * Interface untuk properti dari komponen input yang dapat digunakan kembali.
 */
export interface InputFieldProps {
  id: string;
  label: string;
  value: number | ''; // Nilai bisa angka atau string kosong
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
}
