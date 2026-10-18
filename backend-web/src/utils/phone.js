exports.normalizePhone = (value = '') => {
  const s = String(value).replace(/[\s()-]/g, '');

  if (/^\+265\d{9}$/.test(s)) return s;            // +265999123456
  if (/^00265\d{9}$/.test(s)) return `+${s.slice(2)}`; // 00265999123456
  if (/^265\d{9}$/.test(s)) return `+${s}`;        // 265999123456
  if (/^0\d{9}$/.test(s)) return `+265${s.slice(1)}`;  // 0999123456
  if (/^\d{9}$/.test(s)) return `+265${s}`;        // 999123456

  return s; 
};