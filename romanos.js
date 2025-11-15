const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS
app.use(cors());

// Romanos a Arábigos
app.get('/r2a', (req, res) => {
  const romanNumeral = req.query.roman;
  if (!romanNumeral) {
    return res.status(400).json({ error: 'Parametro roman requerido.' });
  }

  const arabicNumber = romanToArabic(romanNumeral);
  if (arabicNumber === null) {
    return res.status(400).json({ error: 'Numero romano invalido.' });
  }

  return res.json({ arabic: arabicNumber });
});


// Arábigos a Romanos
app.get('/a2r', (req, res) => {
  const arabic = req.query.arabic;

  // 1) Validar que el parámetro exista
  if (!arabic) {
    return res.status(400).json({ error: 'Parametro arabic requerido.' });
  }

  // 2) Validar que sea SOLO dígitos (nada de letras ni símbolos)
  if (!/^\d+$/.test(arabic)) {
    return res.status(400).json({ error: 'Numero arabico invalido.' });
  }

  // 3) Convertir a número entero
  const arabicNumber = Number(arabic);

  const romanNumeral = arabicToRoman(arabicNumber);
  if (romanNumeral === null) {
    return res.status(400).json({ error: 'Numero arabico invalido.' });
  }

  return res.json({ roman: romanNumeral });
});

function romanToArabic(roman) {
  if (!roman || typeof roman !== 'string') return null;

  roman = roman.toUpperCase().trim();

  const validRomanRegex =
    /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  if (!validRomanRegex.test(roman)) {
    return null;
  }

  const values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  let total = 0;

  for (let i = 0; i < roman.length; i++) {
    const curr = values[roman[i]];
    const next = values[roman[i + 1]];

    if (next && next > curr) {
      total += next - curr;
      i++;
    } else {
      total += curr;
    }
  }

  return total;
}

function arabicToRoman(arabic) {
  if (!Number.isInteger(arabic) || arabic < 1 || arabic > 3999) {
    return null;
  }

  const mapa = [
    { valor: 1000, simbolo: 'M' },
    { valor: 900, simbolo: 'CM' },
    { valor: 500, simbolo: 'D' },
    { valor: 400, simbolo: 'CD' },
    { valor: 100, simbolo: 'C' },
    { valor: 90, simbolo: 'XC' },
    { valor: 50, simbolo: 'L' },
    { valor: 40, simbolo: 'XL' },
    { valor: 10, simbolo: 'X' },
    { valor: 9, simbolo: 'IX' },
    { valor: 5, simbolo: 'V' },
    { valor: 4, simbolo: 'IV' },
    { valor: 1, simbolo: 'I' }
  ];

  let resultado = '';
  let restante = arabic;

  for (const { valor, simbolo } of mapa) {
    while (restante >= valor) {
      resultado += simbolo;
      restante -= valor;
    }
  }

  return resultado;
}



// Export para Vercel (handler por defecto)
module.exports = app;

// Export extra para tests (propiedades del handler)
module.exports.romanToArabic = romanToArabic;
module.exports.arabicToRoman = arabicToRoman;


