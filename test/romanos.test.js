const { romanToArabic, arabicToRoman } = require('../romanos'); 
// Por ej: './index' si tu código está en index.js

describe('romanToArabic', () => {
  test('convierte romanos simples correctamente', () => {
    expect(romanToArabic('I')).toBe(1);
    expect(romanToArabic('V')).toBe(5);
    expect(romanToArabic('X')).toBe(10);
    expect(romanToArabic('L')).toBe(50);
    expect(romanToArabic('C')).toBe(100);
    expect(romanToArabic('D')).toBe(500);
    expect(romanToArabic('M')).toBe(1000);
  });

  test('convierte romanos compuestos correctamente', () => {
    expect(romanToArabic('II')).toBe(2);
    expect(romanToArabic('IV')).toBe(4);
    expect(romanToArabic('IX')).toBe(9);
    expect(romanToArabic('XIII')).toBe(13);
    expect(romanToArabic('XL')).toBe(40);
    expect(romanToArabic('XLII')).toBe(42);
    expect(romanToArabic('XCIX')).toBe(99);
    expect(romanToArabic('MMXXIV')).toBe(2024);
    expect(romanToArabic('MMMCMXCIX')).toBe(3999);
  });

  test('rechaza romanos inválidos', () => {
    expect(romanToArabic('')).toBeNull();
    expect(romanToArabic('A')).toBeNull();
    expect(romanToArabic('IIII')).toBeNull();
    expect(romanToArabic('VV')).toBeNull();
    expect(romanToArabic('IC')).toBeNull();
    expect(romanToArabic('XM')).toBeNull();
  });

  test('maneja minúsculas y espacios', () => {
    expect(romanToArabic('  xlII  ')).toBe(42);
  });
});

describe('arabicToRoman', () => {
  test('convierte arábigos simples correctamente', () => {
    expect(arabicToRoman(1)).toBe('I');
    expect(arabicToRoman(5)).toBe('V');
    expect(arabicToRoman(10)).toBe('X');
    expect(arabicToRoman(50)).toBe('L');
    expect(arabicToRoman(100)).toBe('C');
    expect(arabicToRoman(500)).toBe('D');
    expect(arabicToRoman(1000)).toBe('M');
  });

  test('convierte arábigos compuestos correctamente', () => {
    expect(arabicToRoman(2)).toBe('II');
    expect(arabicToRoman(4)).toBe('IV');
    expect(arabicToRoman(9)).toBe('IX');
    expect(arabicToRoman(13)).toBe('XIII');
    expect(arabicToRoman(40)).toBe('XL');
    expect(arabicToRoman(42)).toBe('XLII');
    expect(arabicToRoman(99)).toBe('XCIX');
    expect(arabicToRoman(2024)).toBe('MMXXIV');
    expect(arabicToRoman(3999)).toBe('MMMCMXCIX');
  });

  test('rechaza números fuera de rango o no enteros', () => {
    expect(arabicToRoman(0)).toBeNull();
    expect(arabicToRoman(-1)).toBeNull();
    expect(arabicToRoman(4000)).toBeNull();
    expect(arabicToRoman(3.14)).toBeNull();
    expect(arabicToRoman('10')).toBeNull();
  });
});

