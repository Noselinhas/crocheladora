/* ====================================================
   Crochêladora | License System v2
   — Agora com verificação online via Firebase para
     bloquear ativação em múltiplos dispositivos.
   ==================================================== */

const License = (() => {
  // Secret split to make extraction harder
  const _p = ['Croch3','L4dora','_N0s&','L1nhas','#2025'];
  const SECRET = _p.join('');

  // 32 unambiguous chars (no 0/O, no 1/I)
  const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const STORAGE_KEY = 'croc_lic_v1';

  // ── Firebase config ──────────────────────────────────
  // Preencha com a URL do seu Firebase Realtime Database
  // após seguir as instruções no keygen.html.
  // Exemplo: 'https://crocheladora-abc123-default-rtdb.firebaseio.com'
  // Deixe '' para desativar a verificação online.
  const FIREBASE_DB_URL = localStorage.getItem('croc_firebase_url') || '';

  // ── Crypto helpers ───────────────────────────────────
  function _djb2(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h, 33) ^ str.charCodeAt(i);
    }
    return h >>> 0;
  }

  function _toSeg(n) {
    let s = '';
    for (let i = 0; i < 4; i++) {
      s = CHARS[n % 32] + s;
      n = Math.floor(n / 32);
    }
    return s;
  }

  function _normalise(key) {
    return key.toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  // ── Validation ───────────────────────────────────────
  function validate(key) {
    const raw = _normalise(key);
    if (!raw.startsWith('CROC') || raw.length !== 16) return false;
    const a = raw.slice(4, 8);
    const b = raw.slice(8, 12);
    const c = raw.slice(12, 16);
    if (![...a, ...b, ...c].every(ch => CHARS.includes(ch))) return false;
    return c === _toSeg(_djb2(SECRET + a + b));
  }

  // ── Firebase helpers ─────────────────────────────────
  async function _checkFirebase(cleanKey) {
    if (!FIREBASE_DB_URL) return { allowed: true };
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/activations/${cleanKey}.json`, {
        signal: AbortSignal.timeout(6000)
      });
      if (!res.ok) return { allowed: true }; // Fail open on error
      const data = await res.json();
      if (data && data.activatedAt) {
        return { allowed: false, activatedAt: data.activatedAt };
      }
      return { allowed: true };
    } catch {
      // Se Firebase estiver fora do ar → permite ativar (fail-open)
      return { allowed: true };
    }
  }

  async function _registerFirebase(cleanKey) {
    if (!FIREBASE_DB_URL) return;
    try {
      await fetch(`${FIREBASE_DB_URL}/activations/${cleanKey}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activatedAt: new Date().toISOString(),
          platform:    navigator.platform   || 'unknown',
          browser:     navigator.userAgent.slice(0, 80)
        }),
        signal: AbortSignal.timeout(6000)
      });
    } catch { /* ignora falhas de rede */ }
  }

  // ── Public API ───────────────────────────────────────

  // Retorna Promise<{ success: boolean, reason?: string }>
  async function activate(key) {
    if (!validate(key)) {
      return { success: false, reason: 'invalid' };
    }
    const clean = _normalise(key);

    // Verificação online (se Firebase configurado)
    const check = await _checkFirebase(clean);
    if (!check.allowed) {
      return { success: false, reason: 'already_used', since: check.activatedAt };
    }

    // Registra no Firebase e salva localmente
    await _registerFirebase(clean);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        key:       clean,
        activated: new Date().toISOString()
      }));
    } catch { return { success: false, reason: 'storage_error' }; }

    return { success: true };
  }

  function isActivated() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return !!(stored && stored.key && validate(stored.key));
    } catch { return false; }
  }

  // Usado apenas em keygen.html
  function generate() {
    let a = '', b = '';
    for (let i = 0; i < 4; i++) a += CHARS[Math.floor(Math.random() * 32)];
    for (let i = 0; i < 4; i++) b += CHARS[Math.floor(Math.random() * 32)];
    const c = _toSeg(_djb2(SECRET + a + b));
    return `CROC-${a}-${b}-${c}`;
  }

  return { validate, activate, isActivated, generate };
})();
