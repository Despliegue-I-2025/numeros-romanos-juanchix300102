const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Romanos a Arabigos
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

// Arabigos a Romanos
app.get('/a2r', (req, res) => {
  const arabicNumber = parseInt(req.query.arabic, 10);
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parametro arabic requerido.' });
  }

  const romanNumeral = arabicToRoman(arabicNumber);
  if (romanNumeral === null) {
    return res.status(400).json({ error: 'Numero arabico invalido.' });
  }

  return res.json({ roman: romanNumeral });
});

function romanToArabic(roman) {
  if (!roman || typeof roman !== 'string') return null;

  // Normalizamos
  roman = roman.toUpperCase().trim();

  // Validamos que sea un número romano estándar entre 1 y 3999
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
      // Caso sustractivo (IV, IX, XL, etc.)
      total += next - curr;
      i++; // Saltamos el siguiente porque ya lo usamos
    } else {
      total += curr;
    }
  }

  return total;
}

function arabicToRoman(arabic) {
  // Solo aceptamos enteros entre 1 y 3999
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

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor de tateti escuchando en el puerto ${PORT}`);
  });
}

module.exports = { app, romanToArabic, arabicToRoman };

