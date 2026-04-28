/* Crochêladora | Nós&Linhas — Timer / Taxímetro Module */
const TimerModule = {
  timers: [],
  _interval: null,

  init() {
    this.timers = Storage.getTimers().map(t => ({ ...t, running: false, startedAt: null, _base: t.elapsed || 0 }));
    const s = Storage.getSettings();
    document.getElementById('timer-hourly-rate').value = s.timerHourlyRate || '';
    this.render();
    this._interval = setInterval(() => this._tick(), 1000);
  },

  _tick() {
    this.timers.forEach(t => {
      if (!t.running) return;
      t.elapsed = t._base + Math.floor((Date.now() - t.startedAt) / 1000);
      this._updateDisplay(t);
    });
  },

  _rate() { return parseFloat(document.getElementById('timer-hourly-rate').value) || 0; },

  saveRate() {
    const s = Storage.getSettings();
    s.timerHourlyRate = this._rate();
    Storage.saveSettings(s);
    this.timers.forEach(t => this._updateDisplay(t));
    App.toast('Valor/hora salvo! ✅', 'success');
  },

  add() {
    const t = { id: `tmr-${Date.now()}`, name: `Sessão ${this.timers.length + 1}`, elapsed: 0, _base: 0, running: false, startedAt: null };
    this.timers.unshift(t);
    this._persist();
    this.render();
  },

  start(id) {
    const t = this.timers.find(t => t.id === id);
    if (!t || t.running) return;
    t._base = t.elapsed; t.startedAt = Date.now(); t.running = true;
    this._persist(); this._refreshCard(t);
  },

  pause(id) {
    const t = this.timers.find(t => t.id === id);
    if (!t || !t.running) return;
    t.elapsed = t._base + Math.floor((Date.now() - t.startedAt) / 1000);
    t._base = t.elapsed; t.startedAt = null; t.running = false;
    this._persist(); this._refreshCard(t);
  },

  reset(id) {
    const t = this.timers.find(t => t.id === id);
    if (!t) return;
    if (t.running) this.pause(id);
    t.elapsed = 0; t._base = 0;
    this._persist(); this._refreshCard(t); this._updateDisplay(t);
  },

  remove(id) {
    App.showModal('Excluir Cronômetro', 'Deseja excluir este cronômetro?', () => {
      const t = this.timers.find(t => t.id === id);
      if (t?.running) this.pause(id);
      this.timers = this.timers.filter(t => t.id !== id);
      this._persist(); this.render();
    });
  },

  useInCalc(id) {
    const t = this.timers.find(t => t.id === id);
    if (!t) return;
    if (t.running) this.pause(id);
    const h = Math.floor(t.elapsed / 3600);
    const m = Math.floor((t.elapsed % 3600) / 60);
    App.startCalculator(null, { hoursSpent: h, minutesSpent: m, hourlyRate: this._rate() });
  },

  updateName(id, name) {
    const t = this.timers.find(t => t.id === id);
    if (t) { t.name = name; this._persist(); }
  },

  _fmt(s) {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  },

  _cost(t) { return (t.elapsed / 3600) * this._rate(); },

  _updateDisplay(t) {
    const el = document.getElementById(`tc-${t.id}`);
    if (!el) return;
    el.querySelector('.tmr-time').textContent = this._fmt(t.elapsed);
    el.querySelector('.tmr-cost').textContent = Calculator.fmt(this._cost(t));
  },

  _btns(t) {
    return `${t.running
      ? `<button class="btn-tmr-pause" data-tpause="${t.id}">⏸️ Pausar</button>`
      : `<button class="btn-tmr-start" data-tstart="${t.id}">▶️ Iniciar</button>`}
      <button class="btn-tmr-reset" data-treset="${t.id}" title="Resetar">🔄</button>
      <button class="btn-tmr-use"   data-tuse="${t.id}">📋 Usar na Peça</button>
      <button class="btn-tmr-del"   data-tdel="${t.id}"  title="Excluir">🗑️</button>`;
  },

  _bindCard(el, id) {
    el.querySelector(`[data-tstart="${id}"]`)?.addEventListener('click', () => this.start(id));
    el.querySelector(`[data-tpause="${id}"]`)?.addEventListener('click', () => this.pause(id));
    el.querySelector(`[data-treset="${id}"]`)?.addEventListener('click', () => this.reset(id));
    el.querySelector(`[data-tdel="${id}"]`)?.addEventListener('click',   () => this.remove(id));
    el.querySelector(`[data-tuse="${id}"]`)?.addEventListener('click',   () => this.useInCalc(id));
    el.querySelector(`[data-tname="${id}"]`)?.addEventListener('change', e => this.updateName(id, e.target.value));
  },

  _refreshCard(t) {
    const el = document.getElementById(`tc-${t.id}`);
    if (!el) return;
    el.classList.toggle('running', t.running);
    el.querySelector('.tmr-actions').innerHTML = this._btns(t);
    this._bindCard(el, t.id);
  },

  render() {
    const container = document.getElementById('timers-container');
    const emptyEl   = document.getElementById('timers-empty');
    if (!this.timers.length) { container.innerHTML = ''; emptyEl.classList.remove('hidden'); return; }
    emptyEl.classList.add('hidden');
    container.innerHTML = this.timers.map(t => `
      <div class="timer-card ${t.running ? 'running' : ''}" id="tc-${t.id}">
        <div class="tmr-header">
          <input class="tmr-name-inp" data-tname="${t.id}" value="${App.esc(t.name)}" placeholder="Nome da sessão">
        </div>
        <div class="tmr-display">
          <div class="tmr-time">${this._fmt(t.elapsed)}</div>
          <div class="tmr-cost-wrap">
            <span class="tmr-cost-label">💰 Custo acumulado</span>
            <span class="tmr-cost">${Calculator.fmt(this._cost(t))}</span>
          </div>
        </div>
        <div class="tmr-actions">${this._btns(t)}</div>
      </div>`).join('');
    this.timers.forEach(t => this._bindCard(document.getElementById(`tc-${t.id}`), t.id));
  },

  _persist() {
    Storage.saveTimers(this.timers.map(t => ({ id: t.id, name: t.name, elapsed: t.elapsed, running: false, startedAt: null, _base: t.elapsed })));
  }
};
