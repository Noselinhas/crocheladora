/* ====================================================
   Crochêladora | Nós&Linhas — Main App Logic v4
   ==================================================== */

const App = {
  currentScreen: 'home',
  currentStep: 1,
  currentCalc: null,
  lastResult: null,
  currentFilter: 'all',
  deferredInstallPrompt: null,

  CATEGORY_LABELS: {
    decoracao:'🏠 Decoração', vestuario:'👗 Vestuário',
    brinquedos:'🧸 Amigurumi', acessorios:'👜 Acessório',
    utilidades:'🧺 Utilidade', outro:'✨ Outro'
  },

  // ── Init ──────────────────────────────────────────
  init() {
    if (this.checkShareURL()) return;
    if (!License.isActivated()) { this.showActivationScreen(); return; }
    this._completeInit();
  },

  _completeInit() {
    this.registerSW();
    this.applyTheme(Storage.getTheme());
    this.applyFontSize(Storage.getFontSize());
    this.applyLanguage(Storage.getLanguage());
    this.bindEvents();
    Yarns.bindEvents();
    TimerModule.init();
    this.renderHome();
    this.handlePWAInstall();
  },

  // ── Activation Screen ─────────────────────────────
  showActivationScreen() {
    const screen = document.getElementById('activation-screen');
    if (screen) screen.classList.remove('hidden');

    const input   = document.getElementById('act-key-input');
    const btn     = document.getElementById('act-btn');
    const errorEl = document.getElementById('act-error');

    // Auto-format: uppercase, strip non-alphanum, insert dashes every 4
    input.addEventListener('input', () => {
      const pos = input.selectionStart;
      let raw = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
      let fmt = '';
      for (let i = 0; i < raw.length; i++) {
        if (i === 4 || i === 8 || i === 12) fmt += '-';
        fmt += raw[i];
      }
      input.value = fmt;
      errorEl.classList.add('hidden');
      input.classList.remove('valid','invalid');
      if (raw.length === 16) {
        const ok = License.validate(fmt);
        input.classList.add(ok ? 'valid' : 'invalid');
      }
    });

    // Enter key
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') btn.click();
    });

    btn.addEventListener('click', async () => {
      const key = input.value.trim();

      // Loading state
      btn.disabled = true;
      btn.textContent = '⏳ Verificando...';
      errorEl.classList.add('hidden');
      input.classList.remove('valid', 'invalid');

      const result = await License.activate(key);

      if (result.success) {
        btn.textContent = '✅ Ativado com sucesso!';
        btn.classList.add('success');
        input.classList.add('valid');
        setTimeout(() => {
          screen.classList.add('hidden');
          this._completeInit();
        }, 900);
      } else {
        btn.disabled = false;
        btn.textContent = '🔓 Ativar';

        if (result.reason === 'already_used') {
          errorEl.textContent = '⛔ Esta chave já foi ativada em outro dispositivo.';
        } else {
          errorEl.textContent = '❌ Chave inválida. Verifique e tente novamente.';
        }
        errorEl.classList.remove('hidden');
        input.classList.add('invalid');
        setTimeout(() => input.classList.remove('invalid'), 500);
        btn.classList.add('invalid');
        setTimeout(() => btn.classList.remove('invalid'), 500);
      }
    });
  },

  registerSW() {
    if ('serviceWorker' in navigator)
      navigator.serviceWorker.register('sw.js').catch(() => {});
  },

  // ── Theme ─────────────────────────────────────────
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    Storage.saveTheme(theme);
    document.getElementById('icon-moon').classList.toggle('hidden', theme === 'dark');
    document.getElementById('icon-sun').classList.toggle('hidden', theme === 'light');
  },

  toggleTheme() {
    const current = Storage.getTheme();
    this.applyTheme(current === 'light' ? 'dark' : 'light');
  },

  // ── Font Size ─────────────────────────────────────
  applyFontSize(size) {
    const clamped = Math.min(Math.max(size, 12), 24);
    document.documentElement.style.fontSize = `${clamped}px`;
    Storage.saveFontSize(clamped);
    const display = document.getElementById('font-size-display');
    if (display) display.textContent = `${clamped}px`;
  },

  changeFontSize(delta) {
    this.applyFontSize(Storage.getFontSize() + delta);
  },

  // ── Language ──────────────────────────────────────
  applyLanguage(lang) {
    I18n.current = lang;
    Storage.saveLanguage(lang);
    I18n.apply(lang);
    const sel = document.getElementById('lang-selector');
    if (sel) sel.value = lang;
  },

  // ── Share URL ─────────────────────────────────────
  checkShareURL() {
    const hash = window.location.hash;
    if (!hash.startsWith('#share=')) return false;
    try {
      const data = JSON.parse(decodeURIComponent(atob(hash.slice(7))));
      this.showBudgetView(data);
      return true;
    } catch { return false; }
  },

  showBudgetView(data) {
    document.getElementById('app').style.display = 'none';
    const view = document.getElementById('budget-view');
    const biz  = Storage.getBusinessInfo();

    // Business branding (user's own brand, not Crochêladora)
    const bizNameEl = document.getElementById('budget-biz-name');
    const bizInfoEl = document.getElementById('budget-biz-info');
    const bizLogoEl = document.getElementById('budget-biz-logo');
    const bizBrandSection = document.getElementById('budget-biz-section');

    if (biz.name || biz.info || biz.logo) {
      bizBrandSection.classList.remove('hidden');
      bizNameEl.textContent = biz.name || '';
      bizInfoEl.textContent = biz.info || '';
      bizInfoEl.style.display = biz.info ? '' : 'none';
      if (biz.logo) {
        bizLogoEl.src = biz.logo;
        bizLogoEl.classList.remove('hidden');
      } else {
        bizLogoEl.classList.add('hidden');
      }
    } else {
      bizBrandSection.classList.add('hidden');
    }

    document.getElementById('budget-piece-name').textContent = data.n || '—';
    document.getElementById('budget-price').textContent = Calculator.fmt(data.p || 0);
    const catEl = document.getElementById('budget-category');
    catEl.textContent = this.CATEGORY_LABELS[data.c] || '';
    catEl.style.display = data.c ? '' : 'none';
    const notesWrap = document.getElementById('budget-notes-wrap');
    if (data.o) {
      document.getElementById('budget-notes').textContent = data.o;
      notesWrap.classList.remove('hidden');
    } else {
      notesWrap.classList.add('hidden');
    }
    document.getElementById('budget-date').textContent = data.d || '';
    view.classList.remove('hidden');
  },

  shareResult() {
    if (!this.currentCalc || !this.lastResult) return;
    const data = {
      n: this.currentCalc.name,
      c: this.currentCalc.category,
      p: this.lastResult.finalPrice,
      o: this.currentCalc.notes || '',
      d: new Date().toLocaleDateString('pt-BR')
    };
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${location.origin}${location.pathname}#share=${encoded}`;
    const biz = Storage.getBusinessInfo();
    const from = biz.name ? `de ${biz.name}` : '';
    if (navigator.share) {
      navigator.share({
        title: `Orçamento ${from}: ${data.n}`,
        text: `Olá! Segue o orçamento para "${data.n}": ${Calculator.fmt(data.p)}`,
        url
      }).catch(() => this.copyLink(url));
    } else {
      this.copyLink(url);
    }
  },

  copyLink(url) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => this.toast('🔗 Link copiado! Compartilhe como quiser.', 'success'))
        .catch(() => this.fallbackCopy(url));
    } else {
      this.fallbackCopy(url);
    }
  },

  fallbackCopy(url) {
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    this.toast('🔗 Link copiado!', 'success');
  },

  shareFromHistory(id) {
    const piece = Storage.getPieces().find(p => p.id === id);
    if (!piece || !piece.result) return;
    this.currentCalc = piece;
    this.lastResult = piece.result;
    this.shareResult();
  },

  // ── Navigation ────────────────────────────────────
  navigate(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screenEl = document.getElementById(`screen-${screen}`);
    if (!screenEl) return;
    screenEl.classList.add('active');
    this.currentScreen = screen;

    const backBtn     = document.getElementById('btn-back');
    const settingsBtn = document.getElementById('btn-settings');
    const bottomNav   = document.getElementById('bottom-nav');

    const mainScreens = ['home','yarns','timer','history'];
    const isMain = mainScreens.includes(screen);

    backBtn.classList.toggle('hidden', isMain);
    settingsBtn.classList.toggle('hidden', screen === 'settings');
    bottomNav.classList.toggle('hidden', !isMain);

    document.querySelectorAll('.nav-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.nav === screen));

    if (screen === 'home')     this.renderHome();
    if (screen === 'yarns')    Yarns.render();
    if (screen === 'settings') this.renderSettings();
    document.getElementById('main-content').scrollTop = 0;
  },

  goBack() {
    const map = {
      calculator:'home', result:'home', history:'home',
      settings:'home', yarns:'home', timer:'home'
    };
    this.navigate(map[this.currentScreen] || 'home');
  },

  // ── Home ─────────────────────────────────────────
  renderHome() {
    const pieces   = Storage.getPieces();
    const total    = pieces.length;
    const avgPrice = total ? pieces.reduce((s,p) => s + (p.result?.finalPrice||0), 0) / total : 0;
    document.getElementById('home-stats').innerHTML = `
      <div class="stat-card">
        <span class="stat-value">${total}</span>
        <span class="stat-label">${I18n.get('statPieces')}</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${Calculator.fmt(avgPrice)}</span>
        <span class="stat-label">${I18n.get('statAvg')}</span>
      </div>`;

    const recentEl = document.getElementById('recent-list');
    const section  = document.getElementById('recent-section');
    if (!pieces.length) { section.style.display = 'none'; return; }
    section.style.display = 'block';
    recentEl.innerHTML = pieces.slice(0,3).map(p => this.renderPieceCard(p)).join('');
    recentEl.querySelectorAll('.piece-card').forEach(card =>
      card.addEventListener('click', () => this.showPieceDetail(card.dataset.id)));
  },

  renderPieceCard(p) {
    const cat  = this.CATEGORY_LABELS[p.category] || '';
    const date = p.savedAt ? new Date(p.savedAt).toLocaleDateString('pt-BR') : '';
    return `<div class="piece-card" data-id="${p.id}">
      <div class="piece-card-left">
        <div class="piece-card-name">${this.esc(p.name)}</div>
        ${cat ? `<span class="category-badge">${cat}</span>` : ''}
        <div class="piece-card-meta" style="margin-top:4px">${date}</div>
      </div>
      <div class="piece-card-price">${Calculator.fmt(p.result?.finalPrice)}</div>
    </div>`;
  },

  // ── Settings ──────────────────────────────────────
  renderSettings() {
    const fontSize = Storage.getFontSize();
    const display  = document.getElementById('font-size-display');
    if (display) display.textContent = `${fontSize}px`;
    const langSel = document.getElementById('lang-selector');
    if (langSel) langSel.value = Storage.getLanguage();

    // Load business info
    const biz = Storage.getBusinessInfo();
    const bizNameInp = document.getElementById('biz-name');
    const bizInfoInp = document.getElementById('biz-info');
    const bizLogoPreview = document.getElementById('biz-logo-preview');
    if (bizNameInp) bizNameInp.value = biz.name || '';
    if (bizInfoInp) bizInfoInp.value = biz.info || '';
    if (bizLogoPreview && biz.logo) {
      bizLogoPreview.innerHTML = `<img src="${biz.logo}" style="max-width:120px;max-height:80px;border-radius:8px;margin-top:8px;">`;
    }
  },

  saveBusinessInfo() {
    const name = (document.getElementById('biz-name')?.value || '').trim();
    const info = (document.getElementById('biz-info')?.value || '').trim();
    const current = Storage.getBusinessInfo();
    Storage.saveBusinessInfo({ name, info, logo: current.logo });
    this.toast('Informações salvas! ✅', 'success');
  },

  handleLogoUpload(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      const logo = e.target.result;
      const current = Storage.getBusinessInfo();
      Storage.saveBusinessInfo({ ...current, logo });
      const preview = document.getElementById('biz-logo-preview');
      if (preview) preview.innerHTML = `<img src="${logo}" style="max-width:120px;max-height:80px;border-radius:8px;margin-top:8px;">`;
      this.toast('Logo carregada! ✅', 'success');
    };
    reader.readAsDataURL(file);
  },

  // ── Calculator ────────────────────────────────────
  startCalculator(prefill = null, timerData = null) {
    const s = Storage.getSettings();
    this.currentCalc = prefill ? { ...prefill } : {
      id: null, name: '', category: '', notes: '',
      materials: [], accessories: [],
      hoursSpent:        timerData?.hoursSpent      || 0,
      minutesSpent:      timerData?.minutesSpent     || 0,
      hourlyRate:        timerData?.hourlyRate       || s.lastHourlyRate  || '',
      fixedCostPerPiece: s.lastFixedCost  || '',
      profitMargin:      s.lastProfitMargin || '',
      monthlyFixed:      s.lastMonthlyFixed || '',
      piecesPerMonth:    s.lastPiecesPerMonth || '',
      packagingCost:     '',
      shippingCost:      '',
      otherCost:         ''
    };

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('piece-name',       this.currentCalc.name);
    setVal('piece-category',   this.currentCalc.category);
    setVal('inp-hours',        this.currentCalc.hoursSpent);
    setVal('inp-minutes',      this.currentCalc.minutesSpent);
    setVal('inp-hourly-rate',  this.currentCalc.hourlyRate);
    setVal('inp-monthly-fixed',this.currentCalc.monthlyFixed);
    setVal('inp-pieces-month', this.currentCalc.piecesPerMonth);
    setVal('inp-fixed-cost',   this.currentCalc.fixedCostPerPiece);
    setVal('inp-profit',       this.currentCalc.profitMargin);
    setVal('inp-packaging',    this.currentCalc.packagingCost);
    setVal('inp-shipping',     this.currentCalc.shippingCost);
    setVal('inp-other-cost',   this.currentCalc.otherCost);

    const notesEl = document.getElementById('piece-notes');
    if (notesEl) notesEl.value = this.currentCalc.notes || '';

    // Reset fixed cost readonly state
    const fixedEl = document.getElementById('inp-fixed-cost');
    if (fixedEl) { fixedEl.readOnly = false; fixedEl.style.opacity = '1'; }

    document.getElementById('materials-list').innerHTML   = '';
    document.getElementById('accessories-list').innerHTML = '';
    (this.currentCalc.materials   || []).forEach(m => this.addMaterialItem('materials',   m));
    (this.currentCalc.accessories || []).forEach(a => this.addMaterialItem('accessories', a));

    this.showStep(1);
    this.navigate('calculator');
  },

  showStep(n) {
    this.currentStep = n;
    document.querySelectorAll('.calc-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`cstep-${n}`).classList.add('active');
    for (let i = 1; i <= 4; i++) {
      const dot = document.getElementById(`sdot-${i}`);
      dot.classList.remove('active','done');
      if (i < n) dot.classList.add('done');
      else if (i === n) dot.classList.add('active');
    }
    for (let i = 1; i <= 3; i++)
      document.getElementById(`sline-${i}`).classList.toggle('done', i < n);
    document.getElementById('btn-prev').disabled = n === 1;
    const btnNext = document.getElementById('btn-next');
    btnNext.textContent = n === 4 ? I18n.get('btnCalc') : I18n.get('btnNext');
    btnNext.dataset.isLast = n === 4 ? 'true' : 'false';
    this.updateLiveCalc();
  },

  nextStep() {
    if (this.currentStep === 1) {
      const name = document.getElementById('piece-name').value.trim();
      if (!name) { this.toast('Por favor, dê um nome à peça!', 'error'); return; }
      this.currentCalc.name     = name;
      this.currentCalc.category = document.getElementById('piece-category').value;
      this.currentCalc.notes    = document.getElementById('piece-notes').value;
    }
    if (this.currentStep === 2) this.collectMaterials();
    if (this.currentStep === 3) {
      this.currentCalc.hoursSpent   = parseFloat(document.getElementById('inp-hours').value)        || 0;
      this.currentCalc.minutesSpent = parseFloat(document.getElementById('inp-minutes').value)      || 0;
      this.currentCalc.hourlyRate   = parseFloat(document.getElementById('inp-hourly-rate').value)  || 0;
      if (!this.currentCalc.hourlyRate) { this.toast('Informe o valor por hora!', 'error'); return; }
    }
    if (this.currentStep === 4) {
      this.currentCalc.fixedCostPerPiece = parseFloat(document.getElementById('inp-fixed-cost').value) || 0;
      this.currentCalc.profitMargin      = parseFloat(document.getElementById('inp-profit').value)      || 0;
      this.finishCalc(); return;
    }
    this.showStep(this.currentStep + 1);
  },

  prevStep() { if (this.currentStep > 1) this.showStep(this.currentStep - 1); },

  // ── Materials ─────────────────────────────────────
  // For yarns (isMat=true):
  //   qty = grams used  |  pkgPrice = skein price  |  pkgWeight = skein weight
  //   cost = qty × (pkgPrice / pkgWeight)
  // For accessories (isMat=false):
  //   qty = quantity  |  pricePerUnit = unit price
  //   cost = qty × pricePerUnit
  addMaterialItem(listId, data = {}) {
    const id    = `mat-${Date.now()}-${Math.random().toString(36).substr(2,5)}`;
    const isMat = listId === 'materials';
    const item  = document.createElement('div');
    item.className  = 'material-item';
    item.dataset.id = id;

    if (isMat) {
      // ── Yarn/material item: grams + skein info ──────────
      // Backward compat: if old data has pricePerUnit but not pkgPrice/pkgWeight,
      // we can't recover pkgWeight, so we'll show pricePerUnit as pkgPrice with pkgWeight=1
      const pkgPrice  = data.pkgPrice  !== undefined ? data.pkgPrice  : (data.pricePerUnit ? data.pricePerUnit * 100 : '');
      const pkgWeight = data.pkgWeight !== undefined ? data.pkgWeight : (data.pricePerUnit ? 100 : '');

      item.innerHTML = `
        <div class="mat-header">
          <div class="mat-name-wrap">
            <input type="text" class="mat-name" placeholder="${I18n.get('matNamePH')}"
              value="${this.esc(data.name||'')}" aria-label="Nome" autocomplete="off">
          </div>
          <button class="btn-rm" aria-label="Remover">×</button>
        </div>
        <div class="mat-yarn-row">
          <div class="mat-yarn-field">
            <span class="mat-field-label">Gramas usadas</span>
            <div class="mat-inp-wrap">
              <input type="number" class="mat-qty" placeholder="0" min="0" step="any"
                value="${data.quantity||''}" aria-label="Gramas">
              <span class="mat-unit-badge">g</span>
            </div>
          </div>
          <div class="mat-yarn-field">
            <span class="mat-field-label">Preço do novelo</span>
            <div class="mat-inp-wrap">
              <span class="mat-pfx-s">R$</span>
              <input type="number" class="mat-pkg-price" placeholder="10,00" min="0" step="0.01"
                value="${pkgPrice}" aria-label="Preço novelo">
            </div>
          </div>
          <div class="mat-yarn-field">
            <span class="mat-field-label">Peso novelo</span>
            <div class="mat-inp-wrap">
              <input type="number" class="mat-pkg-weight" placeholder="100" min="1" step="1"
                value="${pkgWeight}" aria-label="Peso novelo">
              <span class="mat-unit-badge">g</span>
            </div>
          </div>
        </div>
        <div class="mat-cost-bar">
          Custo: <strong id="mtot-${id}">= R$ 0,00</strong>
        </div>`;

      item.querySelector('.btn-rm').addEventListener('click', () => { item.remove(); this.updateMaterialsTotal(); });
      ['mat-qty','mat-pkg-price','mat-pkg-weight'].forEach(cls =>
        item.querySelector(`.${cls}`).addEventListener('input', () => { this.updateItemTotal(item, id); this.updateMaterialsTotal(); }));

      // Autocomplete: fills name, pkgPrice, pkgWeight
      Yarns.setupAutocomplete(item.querySelector('.mat-name'), (pkgP, pkgW) => {
        item.querySelector('.mat-pkg-price').value  = pkgP;
        item.querySelector('.mat-pkg-weight').value = pkgW;
        this.updateItemTotal(item, id);
        this.updateMaterialsTotal();
      });

    } else {
      // ── Accessory item: qty × unit price ────────────────
      item.innerHTML = `
        <div class="mat-header">
          <div class="mat-name-wrap">
            <input type="text" class="mat-name" placeholder="${I18n.get('accNamePH')}"
              value="${this.esc(data.name||'')}" aria-label="Nome" autocomplete="off">
          </div>
          <button class="btn-rm" aria-label="Remover">×</button>
        </div>
        <div class="mat-row">
          <input type="number" class="mat-qty" placeholder="Qtd" min="0" step="any"
            value="${data.quantity||''}" aria-label="Quantidade">
          <input type="text" class="mat-unit-text" placeholder="unid." maxlength="12"
            value="${this.esc(data.unit||'unid.')}"
            style="width:68px;font-size:.8rem;border:1.5px solid var(--border);border-radius:8px;padding:7px 8px;background:var(--bg);color:var(--text);">
        </div>
        <div class="mat-row" style="margin-top:8px">
          <span class="mat-pfx">R$</span>
          <input type="number" class="mat-price mat-price-inp" placeholder="Preço unitário"
            min="0" step="0.01" value="${data.pricePerUnit||''}" aria-label="Preço">
          <span class="mat-total" id="mtot-${id}">= R$ 0,00</span>
        </div>`;

      item.querySelector('.btn-rm').addEventListener('click', () => { item.remove(); this.updateMaterialsTotal(); });
      ['mat-qty','mat-price-inp'].forEach(cls =>
        item.querySelector(`.${cls}`).addEventListener('input', () => { this.updateItemTotal(item, id); this.updateMaterialsTotal(); }));
    }

    // Append to DOM FIRST so getElementById can find mtot-{id}
    document.getElementById(`${listId}-list`).appendChild(item);
    if (data.quantity) this.updateItemTotal(item, id);
    this.updateMaterialsTotal();
  },

  updateItemTotal(item, id) {
    const qty = parseFloat(item.querySelector('.mat-qty')?.value) || 0;
    let cost = 0;

    if (item.querySelector('.mat-pkg-price')) {
      // Yarn mode: cost = qty × (pkgPrice / pkgWeight)
      const pkgPrice  = parseFloat(item.querySelector('.mat-pkg-price')?.value)  || 0;
      const pkgWeight = parseFloat(item.querySelector('.mat-pkg-weight')?.value) || 1;
      cost = qty * (pkgPrice / pkgWeight);
    } else {
      // Accessory mode: cost = qty × unitPrice
      cost = qty * (parseFloat(item.querySelector('.mat-price-inp')?.value) || 0);
    }

    const el = document.getElementById(`mtot-${id}`);
    if (el) el.textContent = `= ${Calculator.fmt(cost)}`;
  },

  updateMaterialsTotal() {
    let total = 0;
    // Yarn materials
    document.querySelectorAll('#materials-list .material-item').forEach(item => {
      const qty       = parseFloat(item.querySelector('.mat-qty')?.value)        || 0;
      const pkgPrice  = parseFloat(item.querySelector('.mat-pkg-price')?.value)  || 0;
      const pkgWeight = parseFloat(item.querySelector('.mat-pkg-weight')?.value) || 1;
      total += qty * (pkgPrice / pkgWeight);
    });
    // Accessories
    document.querySelectorAll('#accessories-list .material-item').forEach(item => {
      total += (parseFloat(item.querySelector('.mat-qty')?.value)||0)
             * (parseFloat(item.querySelector('.mat-price-inp')?.value)||0);
    });
    // Other costs
    total += parseFloat(document.getElementById('inp-packaging')?.value)  || 0;
    total += parseFloat(document.getElementById('inp-shipping')?.value)   || 0;
    total += parseFloat(document.getElementById('inp-other-cost')?.value) || 0;
    document.getElementById('mat-total').textContent = Calculator.fmt(total);
    this.updateLiveCalc();
  },

  collectMaterials() {
    const collectYarns = () => {
      const items = [];
      document.querySelectorAll('#materials-list .material-item').forEach(item => {
        const qty       = parseFloat(item.querySelector('.mat-qty')?.value)        || 0;
        const pkgPrice  = parseFloat(item.querySelector('.mat-pkg-price')?.value)  || 0;
        const pkgWeight = parseFloat(item.querySelector('.mat-pkg-weight')?.value) || 1;
        items.push({
          name:         item.querySelector('.mat-name')?.value.trim() || 'Material',
          quantity:     qty,
          unit:         'grama',
          pkgPrice,
          pkgWeight,
          pricePerUnit: pkgWeight > 0 ? pkgPrice / pkgWeight : 0  // for calculator.js
        });
      });
      return items;
    };

    const collectAccessories = () => {
      const items = [];
      document.querySelectorAll('#accessories-list .material-item').forEach(item => {
        const unitEl = item.querySelector('.mat-unit-text');
        items.push({
          name:        item.querySelector('.mat-name')?.value.trim() || 'Acessório',
          quantity:    parseFloat(item.querySelector('.mat-qty')?.value)        || 0,
          unit:        unitEl ? unitEl.value.trim() || 'unid.' : 'unid.',
          pricePerUnit:parseFloat(item.querySelector('.mat-price-inp')?.value) || 0
        });
      });
      return items;
    };

    this.currentCalc.materials    = collectYarns();
    this.currentCalc.accessories  = collectAccessories();
    this.currentCalc.packagingCost = parseFloat(document.getElementById('inp-packaging')?.value)  || 0;
    this.currentCalc.shippingCost  = parseFloat(document.getElementById('inp-shipping')?.value)   || 0;
    this.currentCalc.otherCost     = parseFloat(document.getElementById('inp-other-cost')?.value) || 0;
  },

  // ── Auto-calculate fixed cost ──────────────────────
  autoCalcFixedCost() {
    const monthly = parseFloat(document.getElementById('inp-monthly-fixed')?.value) || 0;
    const pieces  = parseFloat(document.getElementById('inp-pieces-month')?.value)  || 0;
    const fixedEl = document.getElementById('inp-fixed-cost');
    if (!fixedEl) return;
    if (monthly > 0 && pieces > 0) {
      fixedEl.value    = (monthly / pieces).toFixed(2);
      fixedEl.readOnly = true;
      fixedEl.style.opacity = '0.7';
    } else {
      fixedEl.readOnly = false;
      fixedEl.style.opacity = '1';
    }
    this.updateLiveCalc();
  },

  updateLiveCalc() {
    if (this.currentStep === 3) {
      const hrs  = parseFloat(document.getElementById('inp-hours')?.value)       || 0;
      const mins = parseFloat(document.getElementById('inp-minutes')?.value)     || 0;
      const rate = parseFloat(document.getElementById('inp-hourly-rate')?.value) || 0;
      const el   = document.getElementById('labor-cost-val');
      if (el) el.textContent = Calculator.fmt((hrs + mins/60) * rate);
    }
    if (this.currentStep === 4) {
      const tmp = {
        ...this.currentCalc,
        fixedCostPerPiece: parseFloat(document.getElementById('inp-fixed-cost')?.value) || 0,
        profitMargin:      parseFloat(document.getElementById('inp-profit')?.value)      || 0,
        hoursSpent:        parseFloat(document.getElementById('inp-hours')?.value)       || 0,
        minutesSpent:      parseFloat(document.getElementById('inp-minutes')?.value)     || 0,
        hourlyRate:        parseFloat(document.getElementById('inp-hourly-rate')?.value) || 0,
        packagingCost:     parseFloat(document.getElementById('inp-packaging')?.value)   || 0,
        shippingCost:      parseFloat(document.getElementById('inp-shipping')?.value)    || 0,
        otherCost:         parseFloat(document.getElementById('inp-other-cost')?.value)  || 0
      };
      this.collectMaterials();
      tmp.materials   = this.currentCalc.materials;
      tmp.accessories = this.currentCalc.accessories;
      const r = Calculator.calculate(tmp);
      const preview = document.getElementById('cost-preview');
      if (preview) preview.innerHTML = `
        <div class="cp-row"><span class="cp-label">🧶 Materiais</span><span>${Calculator.fmt(r.materialsCost)}</span></div>
        <div class="cp-row"><span class="cp-label">⏱️ Mão de Obra</span><span>${Calculator.fmt(r.laborCost)}</span></div>
        <div class="cp-row"><span class="cp-label">🏠 Custos Fixos</span><span>${Calculator.fmt(r.fixedCost)}</span></div>
        <div class="cp-row"><span class="cp-label">📈 Lucro (${r.profitMargin}%)</span><span>${Calculator.fmt(r.profitAmount)}</span></div>
        <div class="cp-row total"><span>💰 Preço Final</span><span>${Calculator.fmt(r.finalPrice)}</span></div>`;
    }
  },

  // ── Result ────────────────────────────────────────
  finishCalc() {
    this.collectMaterials();
    this.currentCalc.fixedCostPerPiece = parseFloat(document.getElementById('inp-fixed-cost')?.value) || 0;
    this.currentCalc.profitMargin      = parseFloat(document.getElementById('inp-profit')?.value)      || 0;
    this.currentCalc.hoursSpent        = parseFloat(document.getElementById('inp-hours')?.value)       || 0;
    this.currentCalc.minutesSpent      = parseFloat(document.getElementById('inp-minutes')?.value)     || 0;
    this.currentCalc.hourlyRate        = parseFloat(document.getElementById('inp-hourly-rate')?.value) || 0;
    this.currentCalc.monthlyFixed      = parseFloat(document.getElementById('inp-monthly-fixed')?.value) || 0;
    this.currentCalc.piecesPerMonth    = parseFloat(document.getElementById('inp-pieces-month')?.value)  || 0;

    const s = Storage.getSettings();
    s.lastHourlyRate     = this.currentCalc.hourlyRate;
    s.lastFixedCost      = this.currentCalc.fixedCostPerPiece;
    s.lastProfitMargin   = this.currentCalc.profitMargin;
    s.lastMonthlyFixed   = this.currentCalc.monthlyFixed;
    s.lastPiecesPerMonth = this.currentCalc.piecesPerMonth;
    Storage.saveSettings(s);

    const result = Calculator.calculate(this.currentCalc);
    this.lastResult = result;
    this.currentCalc.result = result;

    document.getElementById('res-name').textContent         = this.currentCalc.name;
    document.getElementById('res-price').textContent        = Calculator.fmt(result.finalPrice);
    document.getElementById('res-badge').textContent        = this.CATEGORY_LABELS[this.currentCalc.category] || '';
    document.getElementById('res-mat').textContent          = Calculator.fmt(result.materialsCost);
    document.getElementById('res-labor').textContent        = Calculator.fmt(result.laborCost);
    document.getElementById('res-fixed').textContent        = Calculator.fmt(result.fixedCost);
    document.getElementById('res-cost').textContent         = Calculator.fmt(result.totalCost);
    document.getElementById('res-profit-label').textContent = `Lucro (${result.profitMargin}%)`;
    document.getElementById('res-profit').textContent       = Calculator.fmt(result.profitAmount);
    document.getElementById('res-final').textContent        = Calculator.fmt(result.finalPrice);

    document.getElementById('btn-save-piece').textContent = '💾 Salvar Peça';
    document.getElementById('btn-save-piece').disabled    = false;
    this.navigate('result');
  },

  savePiece() {
    if (!this.currentCalc) return;
    if (!this.currentCalc.id) this.currentCalc.id = `piece-${Date.now()}`;
    this.currentCalc.savedAt = new Date().toISOString();
    Storage.savePiece({ ...this.currentCalc });
    document.getElementById('btn-save-piece').textContent = '✅ Salvo!';
    document.getElementById('btn-save-piece').disabled    = true;
    this.toast('Peça salva com sucesso! 🎉', 'success');
  },

  // ── History ───────────────────────────────────────
  renderHistory(filter = 'all') {
    this.currentFilter = filter;
    let pieces = Storage.getPieces();
    if (filter !== 'all') pieces = pieces.filter(p => p.category === filter);

    document.querySelectorAll('.filter-btn').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.filter === filter));

    const listEl  = document.getElementById('history-list');
    const emptyEl = document.getElementById('history-empty');

    if (!pieces.length) { listEl.innerHTML = ''; emptyEl.classList.remove('hidden'); return; }
    emptyEl.classList.add('hidden');
    listEl.innerHTML = pieces.map(p => {
      const cat  = this.CATEGORY_LABELS[p.category] || '';
      const date = p.savedAt ? new Date(p.savedAt).toLocaleDateString('pt-BR') : '';
      return `<div class="history-piece-card">
        <div class="hpc-top">
          <div>
            <div class="hpc-name">${this.esc(p.name)}</div>
            <div class="hpc-meta">${cat ? `<span>${cat}</span><span>·</span>` : ''}<span>${date}</span></div>
          </div>
          <div class="hpc-price">${Calculator.fmt(p.result?.finalPrice)}</div>
        </div>
        <div class="hpc-actions">
          <button class="btn-sm btn-sm-outline"  data-action="detail" data-id="${p.id}">Ver detalhes</button>
          <button class="btn-sm btn-sm-share"    data-action="share"  data-id="${p.id}">🔗 Orçamento</button>
          <button class="btn-sm btn-sm-outline"  data-action="recalc" data-id="${p.id}">Recalcular</button>
          <button class="btn-sm btn-sm-danger"   data-action="delete" data-id="${p.id}">Excluir</button>
        </div>
      </div>`;
    }).join('');

    listEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = btn.dataset.id;
        if (btn.dataset.action === 'detail') this.showPieceDetail(id);
        if (btn.dataset.action === 'share')  this.shareFromHistory(id);
        if (btn.dataset.action === 'recalc') this.recalcPiece(id);
        if (btn.dataset.action === 'delete') this.deletePiece(id);
      });
    });
  },

  showPieceDetail(id) {
    const piece = Storage.getPieces().find(p => p.id === id);
    if (!piece) return;
    const r    = piece.result || {};
    const cat  = this.CATEGORY_LABELS[piece.category] || '';
    const date = piece.savedAt ? new Date(piece.savedAt).toLocaleDateString('pt-BR') : '';
    this.showModal(
      `🧶 ${this.esc(piece.name)}`,
      `<div style="text-align:center;margin-bottom:8px">
        ${cat ? `<span class="category-badge">${cat}</span>` : ''}
        <div class="dm-price">${Calculator.fmt(r.finalPrice)}</div>
        <small style="color:var(--text-3)">Calculado em ${date}</small>
      </div>
      <div class="dm-section">
        <h4>Custos</h4>
        <div class="dm-row"><span>🧶 Materiais</span><span>${Calculator.fmt(r.materialsCost)}</span></div>
        <div class="dm-row"><span>⏱️ Mão de Obra</span><span>${Calculator.fmt(r.laborCost)}</span></div>
        <div class="dm-row"><span>🏠 Custos Fixos</span><span>${Calculator.fmt(r.fixedCost)}</span></div>
        <div class="dm-row"><span>📈 Lucro (${r.profitMargin||0}%)</span><span>${Calculator.fmt(r.profitAmount)}</span></div>
        <div class="dm-grand"><span>💰 Preço Final</span><span>${Calculator.fmt(r.finalPrice)}</span></div>
      </div>
      ${piece.notes ? `<div class="dm-section"><h4>Observações</h4><p style="font-size:.85rem;color:var(--text-2);line-height:1.5">${this.esc(piece.notes)}</p></div>` : ''}`,
      null, 'Fechar'
    );
  },

  recalcPiece(id) {
    const piece = Storage.getPieces().find(p => p.id === id);
    if (!piece) { this.toast('Peça não encontrada.', 'error'); return; }
    this.startCalculator({ ...piece });
  },

  deletePiece(id) {
    const piece = Storage.getPieces().find(p => p.id === id);
    if (!piece) return;
    this.showModal('Excluir Peça',
      `Excluir "<strong>${this.esc(piece.name)}</strong>"? Não pode ser desfeito.`,
      () => { Storage.deletePiece(id); this.renderHistory(this.currentFilter); this.toast('Peça excluída.'); }
    );
  },

  // ── PWA Install ───────────────────────────────────
  handlePWAInstall() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      this.showInstallBanner();
    });
  },

  showInstallBanner() {
    const wrap = document.getElementById('install-banner-wrap');
    if (!wrap || wrap.innerHTML) return;
    wrap.innerHTML = `
      <div class="install-banner" style="margin-top:12px">
        <p>📱 <strong>Instale o app!</strong> Use offline e acesse pela tela inicial.</p>
        <button class="btn-install" id="btn-install">Instalar</button>
        <button class="btn-dismiss" id="btn-dismiss-install" aria-label="Fechar">×</button>
      </div>`;
    document.getElementById('btn-install').onclick         = () => this.promptInstall();
    document.getElementById('btn-dismiss-install').onclick = () => { wrap.innerHTML = ''; };
  },

  async promptInstall() {
    if (!this.deferredInstallPrompt) return;
    this.deferredInstallPrompt.prompt();
    const { outcome } = await this.deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      document.getElementById('install-banner-wrap').innerHTML = '';
      this.toast('App instalado! 🎉', 'success');
    }
    this.deferredInstallPrompt = null;
  },

  // ── UI Helpers ────────────────────────────────────
  toast(msg, type = '') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className   = `toast ${type} show`;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
  },

  showModal(title, message, onConfirm = null, confirmLabel = 'Confirmar') {
    const overlay    = document.getElementById('modal-overlay');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn  = document.getElementById('modal-cancel');
    document.getElementById('modal-title').textContent   = title;
    document.getElementById('modal-message').innerHTML   = message;
    document.getElementById('modal-box').className       = onConfirm ? 'modal' : 'modal detail-modal';
    if (onConfirm) {
      confirmBtn.textContent   = confirmLabel;
      confirmBtn.style.display = '';
      cancelBtn.style.display  = '';
    } else {
      confirmBtn.style.display = 'none';
      cancelBtn.textContent    = confirmLabel;
    }
    overlay.classList.remove('hidden');
    confirmBtn.onclick = () => { overlay.classList.add('hidden'); onConfirm?.(); };
    cancelBtn.onclick  = () => overlay.classList.add('hidden');
    overlay.onclick    = e => { if (e.target === overlay) overlay.classList.add('hidden'); };
  },

  esc(str) {
    return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  },

  // ── Events ────────────────────────────────────────
  bindEvents() {
    // Header
    document.getElementById('btn-back').addEventListener('click',     () => this.goBack());
    document.getElementById('btn-settings').addEventListener('click', () => this.navigate('settings'));
    document.getElementById('btn-theme').addEventListener('click',    () => this.toggleTheme());

    // Bottom nav
    document.querySelectorAll('.nav-tab[data-nav]').forEach(btn =>
      btn.addEventListener('click', () => {
        if (btn.dataset.nav === 'history') { this.navigate('history'); this.renderHistory('all'); }
        else this.navigate(btn.dataset.nav);
      }));
    document.getElementById('nav-new-piece').addEventListener('click', () => this.startCalculator());

    // Home
    document.getElementById('btn-view-history').addEventListener('click', () => {
      this.navigate('history'); this.renderHistory('all');
    });

    // Calculator nav
    document.getElementById('btn-next').addEventListener('click', () => this.nextStep());
    document.getElementById('btn-prev').addEventListener('click', () => this.prevStep());

    // Materials
    document.getElementById('btn-add-material').addEventListener('click',  () => this.addMaterialItem('materials'));
    document.getElementById('btn-add-accessory').addEventListener('click', () => this.addMaterialItem('accessories'));
    document.getElementById('btn-add-yarn-pick').addEventListener('click', () =>
      Yarns.openPicker(data => this.addMaterialItem('materials', data)));

    // Other costs (step 2)
    ['inp-packaging','inp-shipping','inp-other-cost'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.updateMaterialsTotal());
    });

    // Live calc — step 3
    ['inp-hours','inp-minutes','inp-hourly-rate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.updateLiveCalc());
    });

    // Fixed cost auto-calc — step 4
    ['inp-monthly-fixed','inp-pieces-month'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.autoCalcFixedCost());
    });
    ['inp-fixed-cost','inp-profit'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.updateLiveCalc());
    });

    // Result
    document.getElementById('btn-save-piece').addEventListener('click',     () => this.savePiece());
    document.getElementById('btn-new-from-result').addEventListener('click', () => this.startCalculator());
    document.getElementById('btn-share-result').addEventListener('click',   () => this.shareResult());

    // History filters
    document.getElementById('filter-bar').addEventListener('click', e => {
      if (e.target.classList.contains('filter-btn'))
        this.renderHistory(e.target.dataset.filter);
    });
    document.getElementById('btn-calc-from-history').addEventListener('click', () => this.startCalculator());

    // Yarns screen empty state
    document.getElementById('btn-add-yarn-empty').addEventListener('click', () => Yarns.openForm());

    // Timer
    document.getElementById('btn-add-timer').addEventListener('click',       () => TimerModule.add());
    document.getElementById('btn-save-timer-rate').addEventListener('click', () => TimerModule.saveRate());

    // Settings — Language
    document.getElementById('lang-selector').addEventListener('change', e => this.applyLanguage(e.target.value));

    // Settings — Font size
    document.getElementById('btn-font-minus').addEventListener('click', () => this.changeFontSize(-1));
    document.getElementById('btn-font-plus').addEventListener('click',  () => this.changeFontSize(+1));
    document.getElementById('btn-font-reset').addEventListener('click', () => this.applyFontSize(16));

    // Settings — Business info
    document.getElementById('btn-save-biz').addEventListener('click', () => this.saveBusinessInfo());
    document.getElementById('biz-logo-inp').addEventListener('change', e => {
      if (e.target.files && e.target.files[0]) this.handleLogoUpload(e.target.files[0]);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
