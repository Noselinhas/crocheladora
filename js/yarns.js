/* Crochêladora | Nós&Linhas — Yarn Registry Module */
const Yarns = {

  // Module-level state for picker (fixes timing/cloning bug)
  _pickerCallback: null,
  _pickerSelected: null,

  render() {
    const yarns = Storage.getYarns();
    const listEl  = document.getElementById('yarns-list');
    const emptyEl = document.getElementById('yarns-empty');
    if (!yarns.length) { listEl.innerHTML = ''; emptyEl.classList.remove('hidden'); return; }
    emptyEl.classList.add('hidden');
    listEl.innerHTML = yarns.map(y => this.cardHTML(y)).join('');
    listEl.querySelectorAll('[data-yact]').forEach(btn => {
      if (btn.dataset.yact === 'edit')   btn.addEventListener('click', () => this.openForm(Storage.getYarns().find(y => y.id === btn.dataset.id)));
      if (btn.dataset.yact === 'delete') btn.addEventListener('click', () => this.deleteYarn(btn.dataset.id));
    });
  },

  cardHTML(y) {
    const ppg = y.weightG > 0 ? y.price / y.weightG : 0;
    return `<div class="yarn-card">
      <div class="yarn-card-info">
        <div class="yarn-name">${App.esc(y.name)}${y.brand ? `<span class="yarn-brand"> · ${App.esc(y.brand)}</span>` : ''}</div>
        <div class="yarn-meta">
          <span>⚖️ ${y.weightG}g</span>
          <span>💰 ${Calculator.fmt(y.price)}</span>
          <span class="ppg-badge">${Calculator.fmt(ppg)}/g</span>
        </div>
      </div>
      <div class="yarn-card-actions">
        <button class="btn-sm btn-sm-outline" data-yact="edit"   data-id="${y.id}">Editar</button>
        <button class="btn-sm btn-sm-danger"  data-yact="delete" data-id="${y.id}">Excluir</button>
      </div>
    </div>`;
  },

  openForm(data = {}) {
    document.getElementById('yarn-form-title').textContent = data.id ? 'Editar Fio' : 'Novo Fio';
    document.getElementById('yarn-id-inp').value           = data.id      || '';
    document.getElementById('yarn-name-inp').value         = data.name    || '';
    document.getElementById('yarn-brand-inp').value        = data.brand   || '';
    document.getElementById('yarn-weight-inp').value       = data.weightG || '';
    document.getElementById('yarn-price-inp').value        = data.price   || '';
    this.calcPPG();
    document.getElementById('yarn-form-overlay').classList.remove('hidden');
    setTimeout(() => document.getElementById('yarn-name-inp').focus(), 100);
  },

  closeForm() { document.getElementById('yarn-form-overlay').classList.add('hidden'); },

  calcPPG() {
    const w = parseFloat(document.getElementById('yarn-weight-inp').value) || 0;
    const p = parseFloat(document.getElementById('yarn-price-inp').value)  || 0;
    document.getElementById('yarn-ppg-val').textContent = w > 0 ? `= ${Calculator.fmt(p / w)}/g` : '';
  },

  saveForm() {
    const name   = document.getElementById('yarn-name-inp').value.trim();
    const weight = parseFloat(document.getElementById('yarn-weight-inp').value) || 0;
    const price  = parseFloat(document.getElementById('yarn-price-inp').value)  || 0;
    if (!name)   { App.toast('Informe o nome do fio!', 'error'); return; }
    if (!weight) { App.toast('Informe o peso (g)!',    'error'); return; }
    if (!price)  { App.toast('Informe o preço!',       'error'); return; }
    Storage.saveYarn({
      id: document.getElementById('yarn-id-inp').value || `yarn-${Date.now()}`,
      name, brand: document.getElementById('yarn-brand-inp').value.trim(),
      weightG: weight, price
    });
    this.closeForm();
    this.render();
    App.toast('Fio salvo! 🧶', 'success');
  },

  deleteYarn(id) {
    const y = Storage.getYarns().find(y => y.id === id);
    if (!y) return;
    App.showModal('Excluir Fio', `Excluir "<strong>${App.esc(y.name)}</strong>"?`,
      () => { Storage.deleteYarn(id); this.render(); App.toast('Fio excluído.'); });
  },

  // ── Picker ────────────────────────────────────────────────
  openPicker(callback) {
    const yarns = Storage.getYarns();
    if (!yarns.length) { App.toast('Cadastre fios primeiro na aba 🧶 Fios!', 'error'); return; }

    this._pickerCallback = callback;
    this._pickerSelected = null;

    const overlay   = document.getElementById('yarn-picker-overlay');
    const listEl    = document.getElementById('yarn-picker-list');
    const gramsWrap = document.getElementById('yarn-picker-grams-wrap');
    const gramsInp  = document.getElementById('yarn-picker-grams');

    gramsWrap.classList.add('hidden');
    gramsInp.value = '';

    listEl.innerHTML = yarns.map(y => {
      const ppg = y.weightG > 0 ? y.price / y.weightG : 0;
      return `<div class="yp-item" data-id="${y.id}" data-ppg="${ppg}"
        data-pkg-price="${y.price}" data-pkg-weight="${y.weightG}"
        data-name="${App.esc(y.name)}">
        <div class="yp-name">${App.esc(y.name)}${y.brand ? `<span class="yarn-brand"> · ${App.esc(y.brand)}</span>` : ''}</div>
        <div class="yp-meta">${y.weightG}g · ${Calculator.fmt(y.price)} · <strong>${Calculator.fmt(ppg)}/g</strong></div>
      </div>`;
    }).join('');

    listEl.querySelectorAll('.yp-item').forEach(item => {
      item.addEventListener('click', () => {
        listEl.querySelectorAll('.yp-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        this._pickerSelected = {
          name:      item.dataset.name,
          pkgPrice:  parseFloat(item.dataset.pkgPrice)  || 0,
          pkgWeight: parseFloat(item.dataset.pkgWeight) || 1
        };
        gramsWrap.classList.remove('hidden');
        gramsInp.focus();
      });
    });

    overlay.classList.remove('hidden');
  },

  confirmPicker() {
    if (!this._pickerSelected) { App.toast('Selecione um fio!', 'error'); return; }
    const grams = parseFloat(document.getElementById('yarn-picker-grams').value) || 0;
    if (!grams) { App.toast('Informe as gramas!', 'error'); return; }

    document.getElementById('yarn-picker-overlay').classList.add('hidden');

    if (this._pickerCallback) {
      const cb = this._pickerCallback;
      this._pickerCallback = null;
      // Pass pkgPrice and pkgWeight so addMaterialItem can display correctly
      cb({
        name:      this._pickerSelected.name,
        quantity:  grams,
        unit:      'grama',
        pkgPrice:  this._pickerSelected.pkgPrice,
        pkgWeight: this._pickerSelected.pkgWeight,
        fromYarn:  true
      });
    }
    this._pickerSelected = null;
  },

  // ── Autocomplete on name input ────────────────────────────
  setupAutocomplete(input, onSelect) {
    let dropdown = input.parentElement.querySelector('.yarn-autocomplete');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'yarn-autocomplete';
      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(dropdown);
    }

    const close = () => { dropdown.innerHTML = ''; dropdown.classList.remove('open'); };

    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      if (!query) { close(); return; }
      const yarns = Storage.getYarns().filter(y => y.name.toLowerCase().includes(query));
      if (!yarns.length) { close(); return; }
      dropdown.innerHTML = yarns.slice(0, 6).map(y => {
        const ppg = y.weightG > 0 ? y.price / y.weightG : 0;
        return `<div class="ya-item" data-pkg-price="${y.price}" data-pkg-weight="${y.weightG}" data-name="${App.esc(y.name)}">
          <span class="ya-name">${App.esc(y.name)}</span>
          ${y.brand ? `<span class="ya-brand">${App.esc(y.brand)}</span>` : ''}
          <span class="ya-ppg">${Calculator.fmt(ppg)}/g</span>
        </div>`;
      }).join('');
      dropdown.classList.add('open');
      dropdown.querySelectorAll('.ya-item').forEach(item => {
        item.addEventListener('mousedown', e => {
          e.preventDefault();
          input.value = item.dataset.name;
          onSelect(parseFloat(item.dataset.pkgPrice) || 0, parseFloat(item.dataset.pkgWeight) || 1);
          close();
        });
      });
    });

    input.addEventListener('blur', () => setTimeout(close, 150));
  },

  bindEvents() {
    document.getElementById('btn-add-yarn').addEventListener('click', () => this.openForm());
    document.getElementById('btn-yarn-form-save').addEventListener('click', () => this.saveForm());
    document.getElementById('btn-yarn-form-cancel').addEventListener('click', () => this.closeForm());
    ['yarn-weight-inp','yarn-price-inp'].forEach(id =>
      document.getElementById(id).addEventListener('input', () => this.calcPPG()));
    document.getElementById('yarn-form-overlay').addEventListener('click', e => {
      if (e.target === document.getElementById('yarn-form-overlay')) this.closeForm();
    });

    // Picker confirm/cancel — bound ONCE here, use stored callback
    document.getElementById('btn-yarn-picker-confirm').addEventListener('click', () => this.confirmPicker());
    document.getElementById('btn-yarn-picker-cancel').addEventListener('click', () => {
      document.getElementById('yarn-picker-overlay').classList.add('hidden');
      this._pickerCallback = null;
      this._pickerSelected = null;
    });
    document.getElementById('yarn-picker-overlay').addEventListener('click', e => {
      if (e.target === document.getElementById('yarn-picker-overlay')) {
        document.getElementById('yarn-picker-overlay').classList.add('hidden');
        this._pickerCallback = null;
        this._pickerSelected = null;
      }
    });
  }
};
