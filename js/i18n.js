/* Crochêladora | Nós&Linhas — Internationalization Module */
const I18n = {

  current: 'pt',

  langs: {
    pt: 'Português',
    en: 'English',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
    ru: 'Русский',
    ja: '日本語',
    zh: '中文'
  },

  t: {
    // ── App general
    appSubtitle:       { pt:'Nós & Linhas', en:'Knots & Lines', es:'Nudos & Líneas', fr:'Nœuds & Fils', it:'Nodi & Fili', ru:'Узлы и Нити', ja:'結び目と糸', zh:'结与线' },
    themeTip:          { pt:'Modo claro/escuro', en:'Light/dark mode', es:'Modo claro/oscuro', fr:'Mode clair/sombre', it:'Modalità chiaro/scuro', ru:'Светлая/тёмная тема', ja:'ライト/ダークモード', zh:'明亮/黑暗模式' },

    // ── Home
    heroTitle:         { pt:'Olá, artesãos! 😊', en:'Hello, artisans! 😊', es:'¡Hola, artesanos! 😊', fr:'Bonjour, artisans ! 😊', it:'Ciao, artigiani! 😊', ru:'Привет, мастера! 😊', ja:'こんにちは、職人さん！ 😊', zh:'你好，工匠们！😊' },
    heroSub:           { pt:'Calcule o preço justo das suas criações!', en:'Calculate the fair price of your creations!', es:'¡Calcula el precio justo de tus creaciones!', fr:'Calculez le juste prix de vos créations !', it:'Calcola il prezzo giusto delle tue creazioni!', ru:'Рассчитайте справедливую цену ваших изделий!', ja:'あなたの作品の適正価格を計算しましょう！', zh:'计算您的作品的合理价格！' },
    statPieces:        { pt:'Peças calculadas', en:'Pieces calculated', es:'Piezas calculadas', fr:'Pièces calculées', it:'Pezzi calcolati', ru:'Рассчитано изделий', ja:'計算済みアイテム', zh:'已计算作品' },
    statAvg:           { pt:'Preço médio', en:'Average price', es:'Precio medio', fr:'Prix moyen', it:'Prezzo medio', ru:'Средняя цена', ja:'平均価格', zh:'平均价格' },
    myPieces:          { pt:'Minhas Peças', en:'My Pieces', es:'Mis Piezas', fr:'Mes Pièces', it:'I Miei Lavori', ru:'Мои Изделия', ja:'マイピース', zh:'我的作品' },
    recentTitle:       { pt:'Calculadas Recentemente', en:'Recently Calculated', es:'Calculadas Recientemente', fr:'Calculées Récemment', it:'Calcolate di Recente', ru:'Недавно рассчитанные', ja:'最近の計算', zh:'最近计算' },

    // ── Bottom nav
    navHome:           { pt:'Início', en:'Home', es:'Inicio', fr:'Accueil', it:'Home', ru:'Главная', ja:'ホーム', zh:'首页' },
    navYarns:          { pt:'Fios', en:'Yarns', es:'Hilos', fr:'Fils', it:'Filati', ru:'Нити', ja:'糸', zh:'线材' },
    navNewPiece:       { pt:'Nova Peça', en:'New Piece', es:'Nueva Pieza', fr:'Nouvelle Pièce', it:'Nuovo Lavoro', ru:'Новое изделие', ja:'新しいアイテム', zh:'新作品' },
    navTimer:          { pt:'Cronômetro', en:'Timer', es:'Cronómetro', fr:'Chronomètre', it:'Cronometro', ru:'Таймер', ja:'タイマー', zh:'计时器' },
    navHistory:        { pt:'Peças', en:'Pieces', es:'Piezas', fr:'Pièces', it:'Lavori', ru:'Изделия', ja:'ピース', zh:'作品' },

    // ── Step bar
    stepPiece:         { pt:'Peça', en:'Piece', es:'Pieza', fr:'Pièce', it:'Lavoro', ru:'Изделие', ja:'アイテム', zh:'作品' },
    stepMaterials:     { pt:'Materiais', en:'Materials', es:'Materiales', fr:'Matériaux', it:'Materiali', ru:'Материалы', ja:'材料', zh:'材料' },
    stepWork:          { pt:'Trabalho', en:'Work', es:'Trabajo', fr:'Travail', it:'Lavoro', ru:'Работа', ja:'作業', zh:'工作' },
    stepProfit:        { pt:'Lucro', en:'Profit', es:'Lucro', fr:'Bénéfice', it:'Profitto', ru:'Прибыль', ja:'利益', zh:'利润' },

    // ── Step 1
    step1Title:        { pt:'Sobre a Peça', en:'About the Piece', es:'Sobre la Pieza', fr:'À propos de la Pièce', it:'Sul Lavoro', ru:'Об изделии', ja:'アイテムについて', zh:'关于作品' },
    step1Sub:          { pt:'Dê um nome à sua criação ✨', en:'Give your creation a name ✨', es:'Dale un nombre a tu creación ✨', fr:'Donnez un nom à votre création ✨', it:'Dai un nome alla tua creazione ✨', ru:'Дайте имя своему изделию ✨', ja:'作品に名前をつけましょう ✨', zh:'给您的作品起个名字 ✨' },
    pieceName:         { pt:'Nome da Peça *', en:'Piece Name *', es:'Nombre de la Pieza *', fr:'Nom de la Pièce *', it:'Nome del Lavoro *', ru:'Название изделия *', ja:'アイテム名 *', zh:'作品名称 *' },
    pieceNamePH:       { pt:'Ex: Tapete Oval de Crochê', en:'E.g.: Oval Crochet Rug', es:'Ej: Tapete Oval de Crochet', fr:'Ex : Tapis Ovale au Crochet', it:'Es: Tappeto Ovale all\'Uncinetto', ru:'Напр.: Овальный коврик крючком', ja:'例：かぎ針編みの楕円形マット', zh:'例：椭圆形钩编地毯' },
    category:          { pt:'Categoria', en:'Category', es:'Categoría', fr:'Catégorie', it:'Categoria', ru:'Категория', ja:'カテゴリー', zh:'类别' },
    catSelect:         { pt:'Selecione...', en:'Select...', es:'Seleccione...', fr:'Sélectionnez...', it:'Seleziona...', ru:'Выберите...', ja:'選択...', zh:'选择...' },
    catDecor:          { pt:'🏠 Decoração', en:'🏠 Decoration', es:'🏠 Decoración', fr:'🏠 Décoration', it:'🏠 Decorazione', ru:'🏠 Декор', ja:'🏠 デコレーション', zh:'🏠 装饰' },
    catClothing:       { pt:'👗 Vestuário', en:'👗 Clothing', es:'👗 Vestimenta', fr:'👗 Vêtements', it:'👗 Abbigliamento', ru:'👗 Одежда', ja:'👗 衣類', zh:'👗 服装' },
    catAmigurumi:      { pt:'🧸 Amigurumis', en:'🧸 Amigurumis', es:'🧸 Amigurumis', fr:'🧸 Amigurumis', it:'🧸 Amigurumi', ru:'🧸 Амигуруми', ja:'🧸 あみぐるみ', zh:'🧸 玩具' },
    catAccessories:    { pt:'👜 Acessórios', en:'👜 Accessories', es:'👜 Accesorios', fr:'👜 Accessoires', it:'👜 Accessori', ru:'👜 Аксессуары', ja:'👜 アクセサリー', zh:'👜 配件' },
    catUtilities:      { pt:'🧺 Utilidades', en:'🧺 Utilities', es:'🧺 Utilidades', fr:'🧺 Utilitaires', it:'🧺 Utilitari', ru:'🧺 Утилиты', ja:'🧺 日用品', zh:'🧺 实用品' },
    catOther:          { pt:'✨ Outro', en:'✨ Other', es:'✨ Otro', fr:'✨ Autre', it:'✨ Altro', ru:'✨ Другое', ja:'✨ その他', zh:'✨ 其他' },
    notes:             { pt:'Observações (opcional)', en:'Notes (optional)', es:'Observaciones (opcional)', fr:'Remarques (facultatif)', it:'Note (facoltativo)', ru:'Примечания (необязательно)', ja:'メモ（任意）', zh:'备注（可选）' },
    notesPH:           { pt:'Tamanho, cores, detalhes...', en:'Size, colors, details...', es:'Tamaño, colores, detalles...', fr:'Taille, couleurs, détails...', it:'Dimensioni, colori, dettagli...', ru:'Размер, цвета, детали...', ja:'サイズ、色、詳細...', zh:'尺寸、颜色、细节...' },

    // ── Step 2
    step2Title:        { pt:'Materiais Utilizados', en:'Materials Used', es:'Materiales Utilizados', fr:'Matériaux Utilisés', it:'Materiali Utilizzati', ru:'Использованные материалы', ja:'使用材料', zh:'使用材料' },
    step2Sub:          { pt:'Adicione os fios, linhas e acessórios 🧶', en:'Add yarns, threads and accessories 🧶', es:'Añade hilos, hebras y accesorios 🧶', fr:'Ajoutez fils, lignes et accessoires 🧶', it:'Aggiungi filati, fili e accessori 🧶', ru:'Добавьте нити, пряжу и аксессуары 🧶', ja:'糸、ライン、アクセサリーを追加 🧶', zh:'添加纱线、线材和配件 🧶' },
    btnManual:         { pt:'Digitar Manualmente', en:'Enter Manually', es:'Escribir Manualmente', fr:'Saisir Manuellement', it:'Inserisci Manualmente', ru:'Ввести вручную', ja:'手動入力', zh:'手动输入' },
    btnYarnPick:       { pt:'🧶 Fio Cadastrado', en:'🧶 Saved Yarn', es:'🧶 Hilo Guardado', fr:'🧶 Fil Enregistré', it:'🧶 Filato Salvato', ru:'🧶 Сохранённая нить', ja:'🧶 登録済み糸', zh:'🧶 已保存纱线' },
    accessories:       { pt:'Acessórios', en:'Accessories', es:'Accesorios', fr:'Accessoires', it:'Accessori', ru:'Аксессуары', ja:'アクセサリー', zh:'配件' },
    btnAddAccessory:   { pt:'Adicionar Acessório', en:'Add Accessory', es:'Añadir Accesorio', fr:'Ajouter Accessoire', it:'Aggiungi Accessorio', ru:'Добавить аксессуар', ja:'アクセサリーを追加', zh:'添加配件' },
    otherCosts:        { pt:'Outros Gastos', en:'Other Costs', es:'Otros Gastos', fr:'Autres Coûts', it:'Altri Costi', ru:'Другие расходы', ja:'その他の費用', zh:'其他费用' },
    packaging:         { pt:'Embalagem', en:'Packaging', es:'Embalaje', fr:'Emballage', it:'Imballaggio', ru:'Упаковка', ja:'梱包', zh:'包装' },
    shipping:          { pt:'Envio', en:'Shipping', es:'Envío', fr:'Livraison', it:'Spedizione', ru:'Доставка', ja:'送料', zh:'运费' },
    otherExpenses:     { pt:'Outros', en:'Others', es:'Otros', fr:'Autres', it:'Altro', ru:'Другое', ja:'その他', zh:'其他' },
    matSubtotal:       { pt:'Subtotal de materiais:', en:'Materials subtotal:', es:'Subtotal de materiales:', fr:'Sous-total matériaux :', it:'Subtotale materiali:', ru:'Итого материалы:', ja:'材料小計：', zh:'材料小计：' },
    matNamePH:         { pt:'Ex: Fio de algodão', en:'E.g.: Cotton yarn', es:'Ej: Hilo de algodón', fr:'Ex : Fil de coton', it:'Es: Filato di cotone', ru:'Напр.: Хлопковая пряжа', ja:'例：コットン糸', zh:'例：棉线' },
    accNamePH:         { pt:'Ex: Botão decorativo', en:'E.g.: Decorative button', es:'Ej: Botón decorativo', fr:'Ex : Bouton décoratif', it:'Es: Bottone decorativo', ru:'Напр.: Декоративная пуговица', ja:'例：装飾ボタン', zh:'例：装饰按钮' },
    gramsUsed:         { pt:'gramas utilizadas', en:'grams used', es:'gramos utilizados', fr:'grammes utilisés', it:'grammi usati', ru:'граммов использовано', ja:'使用グラム', zh:'使用克数' },

    // ── Step 3
    step3Title:        { pt:'Tempo & Mão de Obra', en:'Time & Labor', es:'Tiempo & Mano de Obra', fr:'Temps & Main-d\'œuvre', it:'Tempo & Manodopera', ru:'Время и труд', ja:'時間と労働', zh:'时间与劳动' },
    step3Sub:          { pt:'Seu tempo tem valor! ⏱️', en:'Your time has value! ⏱️', es:'¡Tu tiempo tiene valor! ⏱️', fr:'Votre temps a de la valeur ! ⏱️', it:'Il tuo tempo ha valore! ⏱️', ru:'Ваше время имеет ценность! ⏱️', ja:'あなたの時間には価値があります！⏱️', zh:'您的时间很有价值！⏱️' },
    hoursWorked:       { pt:'Horas trabalhadas', en:'Hours worked', es:'Horas trabajadas', fr:'Heures travaillées', it:'Ore lavorate', ru:'Часов отработано', ja:'作業時間', zh:'工作小时数' },
    additionalMins:    { pt:'Minutos adicionais', en:'Additional minutes', es:'Minutos adicionales', fr:'Minutes supplémentaires', it:'Minuti aggiuntivi', ru:'Дополнительные минуты', ja:'追加分数', zh:'额外分钟数' },
    hourlyRate:        { pt:'Valor por hora *', en:'Rate per hour *', es:'Valor por hora *', fr:'Valeur par heure *', it:'Tariffa oraria *', ru:'Ставка в час *', ja:'時給 *', zh:'每小时价值 *' },
    hourlyRateHint:    { pt:'Quanto você quer ganhar por hora de trabalho?', en:'How much do you want to earn per hour?', es:'¿Cuánto quieres ganar por hora?', fr:'Combien voulez-vous gagner à l\'heure ?', it:'Quanto vuoi guadagnare all\'ora?', ru:'Сколько вы хотите зарабатывать в час?', ja:'1時間あたりいくら稼ぎたいですか？', zh:'您希望每小时赚多少？' },
    laborTip:          { pt:'O valor médio de mercado para artesãs é entre <strong>R$ 15,00</strong> e <strong>R$ 40,00</strong> por hora.', en:'The average market rate for artisans is between <strong>$5</strong> and <strong>$15</strong> per hour.', es:'El valor de mercado para artesanas está entre <strong>$5</strong> y <strong>$15</strong> por hora.', fr:'Le tarif moyen du marché est entre <strong>5 €</strong> et <strong>15 €</strong> de l\'heure.', it:'La tariffa media di mercato è tra <strong>€5</strong> e <strong>€15</strong> all\'ora.', ru:'Средняя рыночная ставка для мастериц — от <strong>500</strong> до <strong>1500 руб.</strong> в час.', ja:'職人の平均市場レートは1時間あたり<strong>500円</strong>〜<strong>1500円</strong>です。', zh:'工匠的平均市场价格是每小时<strong>30元</strong>至<strong>100元</strong>。' },
    laborCost:         { pt:'Custo de mão de obra:', en:'Labor cost:', es:'Coste de mano de obra:', fr:'Coût de main-d\'œuvre :', it:'Costo manodopera:', ru:'Стоимость труда:', ja:'労働コスト：', zh:'劳动成本：' },

    // ── Step 4
    step4Title:        { pt:'Custos Fixos & Lucro', en:'Fixed Costs & Profit', es:'Costos Fijos & Lucro', fr:'Coûts Fixes & Bénéfice', it:'Costi Fissi & Profitto', ru:'Постоянные расходы и прибыль', ja:'固定費と利益', zh:'固定成本和利润' },
    step4Sub:          { pt:'Último passo para o preço final! 💰', en:'Last step to the final price! 💰', es:'¡Último paso para el precio final! 💰', fr:'Dernière étape pour le prix final ! 💰', it:'Ultimo passo per il prezzo finale! 💰', ru:'Последний шаг к финальной цене! 💰', ja:'最終価格への最後のステップ！💰', zh:'最终价格的最后一步！💰' },
    monthlyFixed:      { pt:'Custo fixo mensal', en:'Monthly fixed cost', es:'Costo fijo mensual', fr:'Coût fixe mensuel', it:'Costo fisso mensile', ru:'Ежемесячные постоянные расходы', ja:'月次固定費', zh:'每月固定成本' },
    monthlyFixedHint:  { pt:'Aluguel, energia, internet, etc.', en:'Rent, utilities, internet, etc.', es:'Alquiler, servicios, internet, etc.', fr:'Loyer, charges, internet, etc.', it:'Affitto, utenze, internet, ecc.', ru:'Аренда, коммунальные услуги, интернет и т.д.', ja:'家賃、光熱費、インターネットなど', zh:'租金、水电费、互联网等' },
    piecesPerMonth:    { pt:'Peças produzidas por mês', en:'Pieces produced per month', es:'Piezas producidas por mes', fr:'Pièces produites par mois', it:'Pezzi prodotti al mese', ru:'Изделий в месяц', ja:'月間生産数', zh:'每月生产数量' },
    piecesPerMonthHint:{ pt:'Quantas peças você consegue fazer por mês?', en:'How many pieces can you make per month?', es:'¿Cuántas piezas puedes hacer por mes?', fr:'Combien de pièces pouvez-vous faire par mois ?', it:'Quante pezzi riesci a fare al mese?', ru:'Сколько изделий вы можете сделать в месяц?', ja:'月に何個作れますか？', zh:'您每个月能做几件？' },
    fixedCostPiece:    { pt:'Custo fixo desta peça', en:'Fixed cost for this piece', es:'Costo fijo de esta pieza', fr:'Coût fixe de cette pièce', it:'Costo fisso per questo lavoro', ru:'Постоянные расходы на это изделие', ja:'この作品の固定費', zh:'本作品固定成本' },
    fixedCostHint:     { pt:'Calculado automaticamente ÷ número de peças (ou informe manualmente)', en:'Auto-calculated ÷ number of pieces (or enter manually)', es:'Calculado automáticamente ÷ número de piezas (o ingrese manualmente)', fr:'Calculé automatiquement ÷ nombre de pièces (ou saisir manuellement)', it:'Calcolato automaticamente ÷ numero di pezzi (o inserisci manualmente)', ru:'Рассчитывается автоматически ÷ количество изделий (или вводите вручную)', ja:'自動計算 ÷ 作品数（または手動入力）', zh:'自动计算 ÷ 作品数量（或手动输入）' },
    profitMargin:      { pt:'Margem de lucro', en:'Profit margin', es:'Margen de lucro', fr:'Marge bénéficiaire', it:'Margine di profitto', ru:'Норма прибыли', ja:'利益率', zh:'利润率' },
    profitHint:        { pt:'Percentual de lucro sobre o custo total', en:'Profit percentage over total cost', es:'Porcentaje de lucro sobre el costo total', fr:'Pourcentage de bénéfice sur le coût total', it:'Percentuale di profitto sul costo totale', ru:'Процент прибыли от общей стоимости', ja:'総コストに対する利益率', zh:'总成本的利润百分比' },
    profitTip:         { pt:'Para artesanato, recomenda-se uma margem de <strong>30% a 100%</strong> sobre o custo total.', en:'For handcrafts, a margin of <strong>30% to 100%</strong> is recommended.', es:'Para artesanía, se recomienda un margen de <strong>30% a 100%</strong>.', fr:'Pour l\'artisanat, une marge de <strong>30 % à 100 %</strong> est recommandée.', it:'Per l\'artigianato si consiglia un margine dal <strong>30% al 100%</strong>.', ru:'Для ручной работы рекомендуется маржа от <strong>30% до 100%</strong>.', ja:'手工芸品には<strong>30%〜100%</strong>のマージンを推奨します。', zh:'手工艺品建议利润率为<strong>30%至100%</strong>。' },

    // ── Nav buttons
    btnPrev:           { pt:'← Anterior', en:'← Previous', es:'← Anterior', fr:'← Précédent', it:'← Precedente', ru:'← Назад', ja:'← 前へ', zh:'← 上一步' },
    btnNext:           { pt:'Próximo →', en:'Next →', es:'Siguiente →', fr:'Suivant →', it:'Avanti →', ru:'Далее →', ja:'次へ →', zh:'下一步 →' },
    btnCalc:           { pt:'Calcular 🎯', en:'Calculate 🎯', es:'Calcular 🎯', fr:'Calculer 🎯', it:'Calcola 🎯', ru:'Рассчитать 🎯', ja:'計算する 🎯', zh:'计算 🎯' },

    // ── Result
    suggestedPrice:    { pt:'Preço sugerido de venda', en:'Suggested selling price', es:'Precio sugerido de venta', fr:'Prix de vente suggéré', it:'Prezzo di vendita suggerito', ru:'Рекомендуемая цена продажи', ja:'推奨販売価格', zh:'建议销售价格' },
    breakdown:         { pt:'Detalhamento', en:'Breakdown', es:'Desglose', fr:'Détail', it:'Dettaglio', ru:'Разбивка', ja:'内訳', zh:'明细' },
    resMaterials:      { pt:'Materiais', en:'Materials', es:'Materiales', fr:'Matériaux', it:'Materiali', ru:'Материалы', ja:'材料', zh:'材料' },
    resLabor:          { pt:'Mão de Obra', en:'Labor', es:'Mano de Obra', fr:'Main-d\'œuvre', it:'Manodopera', ru:'Труд', ja:'労働', zh:'劳动' },
    resFixed:          { pt:'Custos Fixos', en:'Fixed Costs', es:'Costos Fijos', fr:'Coûts Fixes', it:'Costi Fissi', ru:'Постоянные расходы', ja:'固定費', zh:'固定成本' },
    resTotalCost:      { pt:'Custo Total', en:'Total Cost', es:'Costo Total', fr:'Coût Total', it:'Costo Totale', ru:'Общая стоимость', ja:'合計コスト', zh:'总成本' },
    resProfit:         { pt:'Lucro', en:'Profit', es:'Lucro', fr:'Bénéfice', it:'Profitto', ru:'Прибыль', ja:'利益', zh:'利润' },
    resFinal:          { pt:'💰 Preço Final', en:'💰 Final Price', es:'💰 Precio Final', fr:'💰 Prix Final', it:'💰 Prezzo Finale', ru:'💰 Итоговая цена', ja:'💰 最終価格', zh:'💰 最终价格' },
    btnSavePiece:      { pt:'Salvar Peça', en:'Save Piece', es:'Guardar Pieza', fr:'Sauvegarder', it:'Salva Lavoro', ru:'Сохранить', ja:'保存', zh:'保存作品' },
    btnShare:          { pt:'Compartilhar Orçamento', en:'Share Quote', es:'Compartir Presupuesto', fr:'Partager le Devis', it:'Condividi Preventivo', ru:'Поделиться расчётом', ja:'見積もりを共有', zh:'分享报价' },
    btnNewPiece:       { pt:'Nova Peça', en:'New Piece', es:'Nueva Pieza', fr:'Nouvelle Pièce', it:'Nuovo Lavoro', ru:'Новое изделие', ja:'新しいアイテム', zh:'新作品' },

    // ── History
    historyTitle:      { pt:'Minhas Peças', en:'My Pieces', es:'Mis Piezas', fr:'Mes Pièces', it:'I Miei Lavori', ru:'Мои Изделия', ja:'マイピース', zh:'我的作品' },
    historySub:        { pt:'Todas as suas criações calculadas', en:'All your calculated creations', es:'Todas tus creaciones calculadas', fr:'Toutes vos créations calculées', it:'Tutte le tue creazioni calcolate', ru:'Все ваши рассчитанные изделия', ja:'計算した全作品', zh:'所有计算过的作品' },
    filterAll:         { pt:'Todas', en:'All', es:'Todas', fr:'Toutes', it:'Tutti', ru:'Все', ja:'全て', zh:'全部' },
    btnDetail:         { pt:'Ver detalhes', en:'View details', es:'Ver detalles', fr:'Voir détails', it:'Vedi dettagli', ru:'Подробнее', ja:'詳細', zh:'查看详情' },
    btnBudget:         { pt:'🔗 Orçamento', en:'🔗 Quote', es:'🔗 Presupuesto', fr:'🔗 Devis', it:'🔗 Preventivo', ru:'🔗 Расчёт', ja:'🔗 見積もり', zh:'🔗 报价' },
    btnRecalc:         { pt:'Recalcular', en:'Recalculate', es:'Recalcular', fr:'Recalculer', it:'Ricalcola', ru:'Пересчитать', ja:'再計算', zh:'重新计算' },
    btnDelete:         { pt:'Excluir', en:'Delete', es:'Eliminar', fr:'Supprimer', it:'Elimina', ru:'Удалить', ja:'削除', zh:'删除' },
    emptyHistory:      { pt:'Nenhuma peça salva ainda', en:'No pieces saved yet', es:'Ninguna pieza guardada aún', fr:'Aucune pièce sauvegardée', it:'Nessun lavoro salvato', ru:'Нет сохранённых изделий', ja:'保存されたアイテムなし', zh:'尚未保存作品' },
    emptyHistorySub:   { pt:'Calcule o preço de uma peça e salve aqui!', en:'Calculate the price of a piece and save it here!', es:'¡Calcula el precio de una pieza y guárdala aquí!', fr:'Calculez le prix d\'une pièce et sauvegardez-la ici !', it:'Calcola il prezzo di un lavoro e salvalo qui!', ru:'Рассчитайте цену изделия и сохраните его здесь!', ja:'アイテムの価格を計算してここに保存！', zh:'计算一件作品的价格并保存到这里！' },
    btnNewPieceEmpty:  { pt:'Nova Peça', en:'New Piece', es:'Nueva Pieza', fr:'Nouvelle Pièce', it:'Nuovo Lavoro', ru:'Новое изделие', ja:'新しいアイテム', zh:'新作品' },

    // ── Yarns
    yarnsTitle:        { pt:'Meus Fios', en:'My Yarns', es:'Mis Hilos', fr:'Mes Fils', it:'I Miei Filati', ru:'Мои нити', ja:'マイ糸', zh:'我的纱线' },
    yarnsSub:          { pt:'Cadastre para usar nos cálculos por grama', en:'Register to use in gram-based calculations', es:'Registra para usar en cálculos por gramo', fr:'Enregistrez pour utiliser dans les calculs par gramme', it:'Registra per usare nei calcoli al grammo', ru:'Зарегистрируйте для расчётов по граммам', ja:'グラム計算で使用するために登録', zh:'注册以用于克重计算' },
    btnNewYarn:        { pt:'+ Novo Fio', en:'+ New Yarn', es:'+ Nuevo Hilo', fr:'+ Nouveau Fil', it:'+ Nuovo Filato', ru:'+ Новая нить', ja:'+ 新しい糸', zh:'+ 新纱线' },
    emptyYarns:        { pt:'Nenhum fio cadastrado', en:'No yarns registered', es:'Ningún hilo registrado', fr:'Aucun fil enregistré', it:'Nessun filato registrato', ru:'Нет зарегистрированных нитей', ja:'登録された糸なし', zh:'未注册纱线' },
    emptyYarnsSub:     { pt:'Cadastre seus fios e use-os nos cálculos informando apenas as gramas utilizadas!', en:'Register your yarns and use them in calculations by entering only the grams used!', es:'¡Registra tus hilos y úsalos ingresando solo los gramos utilizados!', fr:'Enregistrez vos fils et utilisez-les en saisissant uniquement les grammes utilisés !', it:'Registra i tuoi filati e usali nei calcoli inserendo solo i grammi usati!', ru:'Зарегистрируйте нити и используйте их в расчётах, указывая только граммы!', ja:'糸を登録して使用グラム数を入力するだけで計算に使えます！', zh:'注册您的纱线，只需输入使用的克数即可用于计算！' },
    btnFirstYarn:      { pt:'+ Cadastrar Primeiro Fio', en:'+ Register First Yarn', es:'+ Registrar Primer Hilo', fr:'+ Enregistrer Premier Fil', it:'+ Registra Primo Filato', ru:'+ Зарегистрировать первую нить', ja:'+ 最初の糸を登録', zh:'+ 注册第一条纱线' },

    // ── Yarn form
    yarnFormNew:       { pt:'Novo Fio', en:'New Yarn', es:'Nuevo Hilo', fr:'Nouveau Fil', it:'Nuovo Filato', ru:'Новая нить', ja:'新しい糸', zh:'新纱线' },
    yarnFormEdit:      { pt:'Editar Fio', en:'Edit Yarn', es:'Editar Hilo', fr:'Modifier Fil', it:'Modifica Filato', ru:'Редактировать нить', ja:'糸を編集', zh:'编辑纱线' },
    yarnName:          { pt:'Nome do Fio *', en:'Yarn Name *', es:'Nombre del Hilo *', fr:'Nom du Fil *', it:'Nome del Filato *', ru:'Название нити *', ja:'糸の名前 *', zh:'纱线名称 *' },
    yarnNamePH:        { pt:'Ex: Fio de Algodão Cru', en:'E.g.: Raw Cotton Yarn', es:'Ej: Hilo de Algodón Crudo', fr:'Ex : Fil de Coton Brut', it:'Es: Filato di Cotone Grezzo', ru:'Напр.: Хлопковая пряжа', ja:'例：生成りコットン糸', zh:'例：原色棉线' },
    yarnBrand:         { pt:'Marca (opcional)', en:'Brand (optional)', es:'Marca (opcional)', fr:'Marque (facultatif)', it:'Marca (facoltativo)', ru:'Марка (необязательно)', ja:'ブランド（任意）', zh:'品牌（可选）' },
    yarnBrandPH:       { pt:'Ex: Círculo, Pingouin...', en:'E.g.: Paintbox, Lion Brand...', es:'Ej: Círculo, DMC...', fr:'Ex : Phildar, DMC...', it:'Es: Filati Italiani...', ru:'Напр.: Alize, Drops...', ja:'例：Hamanaka...', zh:'例：彩虹牌...' },
    yarnWeight:        { pt:'Peso da embalagem (g) *', en:'Package weight (g) *', es:'Peso del paquete (g) *', fr:'Poids de l\'emballage (g) *', it:'Peso della confezione (g) *', ru:'Вес упаковки (г) *', ja:'パッケージ重量 (g) *', zh:'包装重量 (g) *' },
    yarnPrice:         { pt:'Preço da embalagem *', en:'Package price *', es:'Precio del paquete *', fr:'Prix de l\'emballage *', it:'Prezzo della confezione *', ru:'Цена упаковки *', ja:'パッケージ価格 *', zh:'包装价格 *' },
    btnCancel:         { pt:'Cancelar', en:'Cancel', es:'Cancelar', fr:'Annuler', it:'Annulla', ru:'Отмена', ja:'キャンセル', zh:'取消' },
    btnSaveYarn:       { pt:'Salvar Fio', en:'Save Yarn', es:'Guardar Hilo', fr:'Sauvegarder', it:'Salva Filato', ru:'Сохранить', ja:'保存', zh:'保存纱线' },
    btnEdit:           { pt:'Editar', en:'Edit', es:'Editar', fr:'Modifier', it:'Modifica', ru:'Редактировать', ja:'編集', zh:'编辑' },

    // ── Yarn picker
    pickerTitle:       { pt:'🧶 Selecionar Fio Cadastrado', en:'🧶 Select Saved Yarn', es:'🧶 Seleccionar Hilo Guardado', fr:'🧶 Sélectionner Fil Enregistré', it:'🧶 Seleziona Filato Salvato', ru:'🧶 Выбрать сохранённую нить', ja:'🧶 登録済み糸を選択', zh:'🧶 选择已保存纱线' },
    gramsQuestion:     { pt:'Quantas gramas utilizou?', en:'How many grams did you use?', es:'¿Cuántos gramos usó?', fr:'Combien de grammes avez-vous utilisé ?', it:'Quanti grammi hai usato?', ru:'Сколько граммов использовали?', ja:'何グラム使いましたか？', zh:'您使用了多少克？' },
    btnAdd:            { pt:'Adicionar', en:'Add', es:'Agregar', fr:'Ajouter', it:'Aggiungi', ru:'Добавить', ja:'追加', zh:'添加' },

    // ── Timer
    timerTitle:        { pt:'⏱️ Cronômetro', en:'⏱️ Timer', es:'⏱️ Cronómetro', fr:'⏱️ Chronomètre', it:'⏱️ Cronometro', ru:'⏱️ Таймер', ja:'⏱️ タイマー', zh:'⏱️ 计时器' },
    timerSub:          { pt:'Meça o tempo e calcule o custo em tempo real', en:'Measure time and calculate cost in real time', es:'Mide el tiempo y calcula el costo en tiempo real', fr:'Mesurez le temps et calculez le coût en temps réel', it:'Misura il tempo e calcola il costo in tempo reale', ru:'Измеряйте время и рассчитывайте стоимость в реальном времени', ja:'リアルタイムで時間と費用を計測', zh:'实时测量时间并计算成本' },
    timerRate:         { pt:'Valor/hora:', en:'Rate/hour:', es:'Valor/hora:', fr:'Valeur/heure :', it:'Tariffa/ora:', ru:'Ставка/час:', ja:'時給：', zh:'时薪：' },
    btnSaveRate:       { pt:'Salvar', en:'Save', es:'Guardar', fr:'Enregistrer', it:'Salva', ru:'Сохранить', ja:'保存', zh:'保存' },
    btnNewTimer:       { pt:'+ Novo Cronômetro', en:'+ New Timer', es:'+ Nuevo Cronómetro', fr:'+ Nouveau Chronomètre', it:'+ Nuovo Cronometro', ru:'+ Новый таймер', ja:'+ 新しいタイマー', zh:'+ 新计时器' },
    emptyTimer:        { pt:'Nenhum cronômetro ativo', en:'No active timer', es:'Ningún cronómetro activo', fr:'Aucun chronomètre actif', it:'Nessun cronometro attivo', ru:'Нет активных таймеров', ja:'アクティブなタイマーなし', zh:'无活动计时器' },
    emptyTimerSub:     { pt:'Adicione um cronômetro para medir o tempo de confecção e calcular o custo automaticamente!', en:'Add a timer to measure production time and calculate cost automatically!', es:'¡Añade un cronómetro para medir el tiempo de confección y calcular el costo automáticamente!', fr:'Ajoutez un chronomètre pour mesurer le temps et calculer le coût automatiquement !', it:'Aggiungi un cronometro per misurare il tempo e calcolare il costo automaticamente!', ru:'Добавьте таймер для измерения времени и автоматического расчёта стоимости!', ja:'タイマーを追加して製作時間を計測し、コストを自動計算！', zh:'添加计时器以测量生产时间并自动计算成本！' },

    // ── Settings
    settingsTitle:     { pt:'Configurações', en:'Settings', es:'Configuración', fr:'Paramètres', it:'Impostazioni', ru:'Настройки', ja:'設定', zh:'设置' },
    settingsSub:       { pt:'Preferências do app', en:'App preferences', es:'Preferencias de la app', fr:'Préférences de l\'app', it:'Preferenze app', ru:'Настройки приложения', ja:'アプリ設定', zh:'应用偏好设置' },
    langSection:       { pt:'Idioma', en:'Language', es:'Idioma', fr:'Langue', it:'Lingua', ru:'Язык', ja:'言語', zh:'语言' },
    fontSection:       { pt:'Tamanho da Fonte', en:'Font Size', es:'Tamaño de Fuente', fr:'Taille de Police', it:'Dimensione Carattere', ru:'Размер шрифта', ja:'フォントサイズ', zh:'字体大小' },
    fontSmall:         { pt:'A−', en:'A−', es:'A−', fr:'A−', it:'A−', ru:'A−', ja:'A−', zh:'A−' },
    fontLarge:         { pt:'A+', en:'A+', es:'A+', fr:'A+', it:'A+', ru:'A+', ja:'A+', zh:'A+' },
    fontReset:         { pt:'Padrão', en:'Default', es:'Defecto', fr:'Défaut', it:'Default', ru:'По умолч.', ja:'デフォルト', zh:'默认' },

    // ── Modals / Toast
    confirm:           { pt:'Confirmar', en:'Confirm', es:'Confirmar', fr:'Confirmer', it:'Conferma', ru:'Подтвердить', ja:'確認', zh:'确认' },
    cancel:            { pt:'Cancelar', en:'Cancel', es:'Cancelar', fr:'Annuler', it:'Annulla', ru:'Отмена', ja:'キャンセル', zh:'取消' },
    close:             { pt:'Fechar', en:'Close', es:'Cerrar', fr:'Fermer', it:'Chiudi', ru:'Закрыть', ja:'閉じる', zh:'关闭' },

    // ── Budget view
    budget:            { pt:'Orçamento', en:'Quote', es:'Presupuesto', fr:'Devis', it:'Preventivo', ru:'Расчёт', ja:'見積もり', zh:'报价' },
    pieceValue:        { pt:'Valor da peça', en:'Piece value', es:'Valor de la pieza', fr:'Valeur de la pièce', it:'Valore del lavoro', ru:'Стоимость изделия', ja:'アイテムの価格', zh:'作品价值' },
    obs:               { pt:'Observações', en:'Notes', es:'Observaciones', fr:'Remarques', it:'Note', ru:'Примечания', ja:'メモ', zh:'备注' },
    budgetGenerated:   { pt:'Orçamento gerado em', en:'Quote generated on', es:'Presupuesto generado el', fr:'Devis généré le', it:'Preventivo generato il', ru:'Расчёт создан', ja:'作成日：', zh:'生成于' },
    budgetFooterSub:   { pt:'Calculadora de precificação para artesãos', en:'Pricing calculator for artisans', es:'Calculadora de precios para artesanos', fr:'Calculateur de prix pour artisans', it:'Calcolatore prezzi per artigiani', ru:'Калькулятор ценообразования для мастеров', ja:'職人のための価格計算機', zh:'工匠定价计算器' },
  },

  // Get translation for a key
  get(key) {
    const entry = this.t[key];
    if (!entry) return key;
    return entry[this.current] || entry['pt'] || key;
  },

  // Apply language to the entire DOM
  apply(lang) {
    if (!this.langs[lang]) return;
    this.current = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;

    const set = (id, key, attr = 'textContent') => {
      const el = document.getElementById(id);
      if (el) el[attr] = this.get(key);
    };
    const setHTML = (id, key) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = this.get(key);
    };
    const setAttr = (id, key, attr) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute(attr, this.get(key));
    };
    const setQ = (selector, key, attr = 'textContent') => {
      document.querySelectorAll(selector).forEach(el => { el[attr] = this.get(key); });
    };

    // Home
    set('hero-title', 'heroTitle');
    set('hero-sub', 'heroSub');
    set('btn-view-history', 'myPieces');
    const recentH = document.querySelector('#recent-section .section-title');
    if (recentH) recentH.textContent = this.get('recentTitle');

    // Bottom nav
    const navLabels = { 'nav-home':'navHome', 'nav-yarns':'navYarns', 'nav-timer':'navTimer', 'nav-history':'navHistory' };
    Object.entries(navLabels).forEach(([id, key]) => {
      const btn = document.getElementById(id);
      if (btn) { const span = btn.querySelector('span') || btn; span.textContent = this.get(key); }
    });
    const navNewPieceSpan = document.querySelector('#nav-new-piece span');
    if (navNewPieceSpan) navNewPieceSpan.textContent = this.get('navNewPiece');

    // Steps bar
    const stepKeys = ['stepPiece','stepMaterials','stepWork','stepProfit'];
    document.querySelectorAll('.step-item span').forEach((el, i) => { if (stepKeys[i]) el.textContent = this.get(stepKeys[i]); });

    // Step 1
    const s1h = document.querySelector('#cstep-1 .step-header h2');
    const s1p = document.querySelector('#cstep-1 .step-header p');
    if (s1h) s1h.textContent = this.get('step1Title');
    if (s1p) s1p.textContent = this.get('step1Sub');
    const pieceNameLabel = document.querySelector('label[for="piece-name"]');
    if (pieceNameLabel) pieceNameLabel.textContent = this.get('pieceName');
    setAttr('piece-name', 'pieceNamePH', 'placeholder');
    const catLabel = document.querySelector('label[for="piece-category"]');
    if (catLabel) catLabel.textContent = this.get('category');
    // Category options
    const catSel = document.getElementById('piece-category');
    if (catSel) {
      const opts = catSel.options;
      const catMap = ['catSelect','catDecor','catClothing','catAmigurumi','catAccessories','catUtilities','catOther'];
      [...opts].forEach((opt, i) => { if (catMap[i]) opt.text = this.get(catMap[i]); });
    }
    const notesLabel = document.querySelector('label[for="piece-notes"]');
    if (notesLabel) notesLabel.textContent = this.get('notes');
    setAttr('piece-notes', 'notesPH', 'placeholder');

    // Step 2
    const s2h = document.querySelector('#cstep-2 .step-header h2');
    const s2p = document.querySelector('#cstep-2 .step-header p');
    if (s2h) s2h.textContent = this.get('step2Title');
    if (s2p) s2p.textContent = this.get('step2Sub');
    set('btn-add-material', 'btnManual');
    set('btn-add-yarn-pick', 'btnYarnPick');
    const accDivider = document.querySelector('.divider-label span');
    if (accDivider) accDivider.textContent = this.get('accessories');
    set('btn-add-accessory', 'btnAddAccessory');
    const otherCostsLabel = document.querySelector('.divider-label.other-costs-divider span');
    if (otherCostsLabel) otherCostsLabel.textContent = this.get('otherCosts');
    const pkgLabel = document.querySelector('label[for="inp-packaging"]');
    if (pkgLabel) pkgLabel.textContent = this.get('packaging');
    const shipLabel = document.querySelector('label[for="inp-shipping"]');
    if (shipLabel) shipLabel.textContent = this.get('shipping');
    const otherLabel = document.querySelector('label[for="inp-other-cost"]');
    if (otherLabel) otherLabel.textContent = this.get('otherExpenses');
    const matSubEl = document.querySelector('.subtotal-bar span');
    if (matSubEl) matSubEl.textContent = this.get('matSubtotal');

    // Step 3
    const s3h = document.querySelector('#cstep-3 .step-header h2');
    const s3p = document.querySelector('#cstep-3 .step-header p');
    if (s3h) s3h.textContent = this.get('step3Title');
    if (s3p) s3p.textContent = this.get('step3Sub');
    const hoursLabel = document.querySelector('label[for="inp-hours"]');
    if (hoursLabel) hoursLabel.textContent = this.get('hoursWorked');
    const minsLabel = document.querySelector('label[for="inp-minutes"]');
    if (minsLabel) minsLabel.textContent = this.get('additionalMins');
    const rateLabel = document.querySelector('label[for="inp-hourly-rate"]');
    if (rateLabel) rateLabel.textContent = this.get('hourlyRate');
    const rateHint = document.querySelector('#cstep-3 .hint');
    if (rateHint) rateHint.textContent = this.get('hourlyRateHint');
    const laborTipEl = document.querySelector('#cstep-3 .info-tip p');
    if (laborTipEl) laborTipEl.innerHTML = this.get('laborTip');
    const laborBar = document.querySelector('.labor-bar span');
    if (laborBar) laborBar.textContent = this.get('laborCost');

    // Step 4
    const s4h = document.querySelector('#cstep-4 .step-header h2');
    const s4p = document.querySelector('#cstep-4 .step-header p');
    if (s4h) s4h.textContent = this.get('step4Title');
    if (s4p) s4p.textContent = this.get('step4Sub');
    const monthLabel = document.querySelector('label[for="inp-monthly-fixed"]');
    if (monthLabel) monthLabel.textContent = this.get('monthlyFixed');
    const monthHint = document.querySelector('#inp-monthly-fixed')?.closest('.form-group')?.querySelector('.hint');
    if (monthHint) monthHint.textContent = this.get('monthlyFixedHint');
    const piecesLabel = document.querySelector('label[for="inp-pieces-month"]');
    if (piecesLabel) piecesLabel.textContent = this.get('piecesPerMonth');
    const piecesHint = document.querySelector('#inp-pieces-month')?.closest('.form-group')?.querySelector('.hint');
    if (piecesHint) piecesHint.textContent = this.get('piecesPerMonthHint');
    const fixedLabel = document.querySelector('label[for="inp-fixed-cost"]');
    if (fixedLabel) fixedLabel.textContent = this.get('fixedCostPiece');
    const fixedHint = document.querySelector('#inp-fixed-cost')?.closest('.form-group')?.querySelector('.hint');
    if (fixedHint) fixedHint.textContent = this.get('fixedCostHint');
    const profitLabel = document.querySelector('label[for="inp-profit"]');
    if (profitLabel) profitLabel.textContent = this.get('profitMargin');
    const profitHint = document.querySelector('#inp-profit')?.closest('.form-group')?.querySelector('.hint');
    if (profitHint) profitHint.textContent = this.get('profitHint');
    const profitTipEl = document.querySelector('#cstep-4 .info-tip p');
    if (profitTipEl) profitTipEl.innerHTML = this.get('profitTip');

    // Nav buttons
    document.getElementById('btn-prev').textContent = this.get('btnPrev');
    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.textContent = btnNext.dataset.isLast === 'true' ? this.get('btnCalc') : this.get('btnNext');

    // Result
    const suggestedEl = document.querySelector('.result-price-label');
    if (suggestedEl) suggestedEl.textContent = this.get('suggestedPrice');
    const bdH = document.querySelector('.result-breakdown h3');
    if (bdH) bdH.textContent = this.get('breakdown');

    // History
    const histH = document.querySelector('#screen-history .screen-title-bar h2');
    const histP = document.querySelector('#screen-history .screen-title-bar p');
    if (histH) histH.textContent = this.get('historyTitle');
    if (histP) histP.textContent = this.get('historySub');
    const filterAll = document.querySelector('.filter-btn[data-filter="all"]');
    if (filterAll) filterAll.textContent = this.get('filterAll');

    // Yarns screen
    const yarnsH = document.querySelector('.yarns-topbar-text h2');
    const yarnsP = document.querySelector('.yarns-topbar-text p');
    if (yarnsH) yarnsH.textContent = this.get('yarnsTitle');
    if (yarnsP) yarnsP.textContent = this.get('yarnsSub');
    set('btn-add-yarn', 'btnNewYarn');
    set('btn-add-yarn-empty', 'btnFirstYarn');

    // Timer screen
    const timerH = document.querySelector('.timer-topbar h2');
    const timerP = document.querySelector('.timer-topbar p');
    if (timerH) timerH.textContent = this.get('timerTitle');
    if (timerP) timerP.textContent = this.get('timerSub');
    const timerRateEl = document.querySelector('.timer-rate-row label');
    if (timerRateEl) timerRateEl.textContent = this.get('timerRate');
    set('btn-save-timer-rate', 'btnSaveRate');
    set('btn-add-timer', 'btnNewTimer');

    // Settings screen
    const settH = document.querySelector('#screen-settings .screen-title-bar h2');
    const settP = document.querySelector('#screen-settings .screen-title-bar p');
    if (settH) settH.textContent = this.get('settingsTitle');
    if (settP) settP.textContent = this.get('settingsSub');
    const langH = document.querySelector('.settings-lang-title');
    if (langH) langH.textContent = this.get('langSection');
    const fontH = document.querySelector('.settings-font-title');
    if (fontH) fontH.textContent = this.get('fontSection');
    set('btn-font-minus', 'fontSmall');
    set('btn-font-plus', 'fontLarge');
    set('btn-font-reset', 'fontReset');

    // Yarn form
    const yarnFormTitle = document.getElementById('yarn-form-title');
    if (yarnFormTitle && !yarnFormTitle.dataset.editing) yarnFormTitle.textContent = this.get('yarnFormNew');
    const yn = document.querySelector('label[for="yarn-name-inp"]');
    if (yn) yn.textContent = this.get('yarnName');
    setAttr('yarn-name-inp', 'yarnNamePH', 'placeholder');
    const yb = document.querySelector('label[for="yarn-brand-inp"]');
    if (yb) yb.textContent = this.get('yarnBrand');
    setAttr('yarn-brand-inp', 'yarnBrandPH', 'placeholder');
    const yw = document.querySelector('label[for="yarn-weight-inp"]');
    if (yw) yw.textContent = this.get('yarnWeight');
    const yp = document.querySelector('label[for="yarn-price-inp"]');
    if (yp) yp.textContent = this.get('yarnPrice');
    set('btn-yarn-form-cancel', 'btnCancel');
    set('btn-yarn-form-save', 'btnSaveYarn');

    // Picker
    const pickerH = document.querySelector('#yarn-picker-overlay h3');
    if (pickerH) pickerH.textContent = this.get('pickerTitle');
    const gramsQ = document.querySelector('label[for="yarn-picker-grams"]');
    if (gramsQ) gramsQ.textContent = this.get('gramsQuestion');
    set('btn-yarn-picker-cancel', 'btnCancel');
    set('btn-yarn-picker-confirm', 'btnAdd');

    // Modal buttons
    set('modal-cancel', 'cancel');
    set('modal-confirm', 'confirm');

    // Budget view
    const budgetLabel = document.querySelector('.budget-piece-label');
    if (budgetLabel) budgetLabel.textContent = this.get('budget');
    const pieceValLabel = document.querySelector('.budget-price-label');
    if (pieceValLabel) pieceValLabel.textContent = this.get('pieceValue');
    const obsLabel = document.querySelector('.budget-notes-label');
    if (obsLabel) obsLabel.textContent = this.get('obs');
    const budgetFooterSub = document.querySelector('.budget-footer-sub');
    if (budgetFooterSub) budgetFooterSub.textContent = this.get('budgetFooterSub');
  }
};
