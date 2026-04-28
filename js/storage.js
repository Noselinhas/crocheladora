/* Crochêladora | Nós&Linhas — Storage Layer */
const Storage = {
  _get: (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  _set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),

  getPieces()        { return this._get('cro_pieces')   || []; },
  savePiece(p)       { const l = this.getPieces().filter(x => x.id !== p.id); l.unshift(p); this._set('cro_pieces', l); return p; },
  deletePiece(id)    { this._set('cro_pieces', this.getPieces().filter(p => p.id !== id)); },

  getSettings()      { return this._get('cro_settings') || {}; },
  saveSettings(s)    { this._set('cro_settings', s); },

  getYarns()         { return this._get('cro_yarns')    || []; },
  saveYarn(y)        { const l = this.getYarns().filter(x => x.id !== y.id); l.unshift(y); this._set('cro_yarns', l); },
  deleteYarn(id)     { this._set('cro_yarns', this.getYarns().filter(y => y.id !== id)); },

  getTimers()        { return this._get('cro_timers')   || []; },
  saveTimers(l)      { this._set('cro_timers', l); },

  getTheme()         { return localStorage.getItem('cro_theme') || 'light'; },
  saveTheme(t)       { localStorage.setItem('cro_theme', t); },

  getLanguage()      { return localStorage.getItem('cro_lang') || 'pt'; },
  saveLanguage(l)    { localStorage.setItem('cro_lang', l); },

  getFontSize()      { return parseFloat(localStorage.getItem('cro_font')) || 16; },
  saveFontSize(s)    { localStorage.setItem('cro_font', String(s)); },

  getBusinessInfo()  { return this._get('cro_business') || { name: '', info: '', logo: '' }; },
  saveBusinessInfo(b){ this._set('cro_business', b); },

  clearAll()         { ['pieces','settings','yarns','timers'].forEach(k => localStorage.removeItem(`cro_${k}`)); }
};
