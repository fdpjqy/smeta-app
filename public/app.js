const DEFAULT_BASE = [
  { name: 'Бестраншейная прокладка трубопроводов d 140 мм', unit: 'м.п' },
  { name: 'Бестраншейная прокладка трубопроводов d 315 мм', unit: 'компл' },
  { name: 'Устройство трубопровода бестраншейным способом', unit: 'компл' },
  { name: 'Монтаж трубы d90 мм методом ГНБ', unit: 'м.п' },
  { name: 'Прокладка в футляре (прокол)', unit: 'м.п' },
  { name: 'Протяжка трубы d90 в кожух d315', unit: 'м.п' },
  { name: 'Монтаж трубы d 315 мм открытый способ', unit: 'м.п' },
  { name: 'Прокладка водопровода d63', unit: 'м.п' },
  { name: 'Прокладка водопровода (открытый способ)', unit: 'м.п' },
  { name: 'Прокладка траншеи (земляные работы)', unit: 'м.п' },
  { name: 'Раскопки вручную', unit: 'м.п' },
  { name: 'Проливка песка, трамбовка', unit: 'м.п' },
  { name: 'Установка трассоискателя кабелей', unit: 'шт' },
  { name: 'Штробление стен под трубы', unit: 'м.п' },
  { name: 'Изоляция / утепление труб', unit: 'м.п' },
  { name: 'Монтаж трубы d 32', unit: 'м.п' },
  { name: 'Монтаж трубы d 50', unit: 'м.п' },
  { name: 'Монтаж трубы d 90', unit: 'м.п' },
  { name: 'Монтаж трубы d 315', unit: 'м.п' },
  { name: 'Монтаж трубы ПНД (наружный водопровод)', unit: 'м.п' },
  { name: 'Монтаж полипропиленовой трубы (ППР)', unit: 'м.п' },
  { name: 'Монтаж металлопластиковой трубы (PEX/REHAU)', unit: 'м.п' },
  { name: 'Монтаж трубы из сшитого полиэтилена (PEX-A)', unit: 'м.п' },
  { name: 'Монтаж футляра', unit: 'м.п' },
  { name: 'Сварка ПНД-труб d 140 мм', unit: 'стык' },
  { name: 'Сварка труб d 50', unit: 'стык' },
  { name: 'Сварка труб d 90', unit: 'стык' },
  { name: 'Сварка трубы d 315 (встык)', unit: 'стык' },
  { name: 'Сварка труб d 89', unit: 'стык' },
  { name: 'Сварка втулки d63 в колодце', unit: 'шт' },
  { name: 'Сварка втулки под фланец d90', unit: 'шт' },
  { name: 'Экструзионная сварка швов', unit: 'м.п' },
  { name: 'Распил трубы du 89 (участок)', unit: 'м.п' },
  { name: 'Соединение труб d 50', unit: 'шт' },
  { name: 'Соединение тройник 50x50x50', unit: 'шт' },
  { name: 'Соединение 50/32', unit: 'шт' },
  { name: 'Соединение тройник 50x32x50', unit: 'шт' },
  { name: 'Соединение переход', unit: 'шт' },
  { name: 'Пайка полипропилена', unit: 'точка' },
  { name: 'Пайка медных труб (твёрдый припой)', unit: 'точка' },
  { name: 'Пайка медных труб (мягкий припой)', unit: 'точка' },
  { name: 'Врезка в центральный водопровод', unit: 'шт' },
  { name: 'Врезка du 90 в центральный водопровод', unit: 'шт' },
  { name: 'Врезка с одним краном', unit: 'шт' },
  { name: 'Врезка с двумя кранами', unit: 'шт' },
  { name: 'Врезка в существующую систему (стояк)', unit: 'шт' },
  { name: 'Переврезка в жироуловителе', unit: 'шт' },
  { name: 'Монтаж крана du 20', unit: 'шт' },
  { name: 'Монтаж кранов du 20', unit: 'шт' },
  { name: 'Реконструкция крана du 80', unit: 'шт' },
  { name: 'Монтаж; демонтаж задвижки du 80', unit: 'шт' },
  { name: 'Монтаж задвижек (сварочные работы)', unit: 'шт' },
  { name: 'Установка шарового крана', unit: 'шт' },
  { name: 'Монтаж кольца', unit: 'шт' },
  { name: 'Сбросник d 50', unit: 'шт' },
  { name: 'Установка заглушки', unit: 'шт' },
  { name: 'Монтаж коллектора (гребёнки)', unit: 'шт' },
  { name: 'Монтаж редуктора давления', unit: 'шт' },
  { name: 'Монтаж колодца В3, включая стремянку и гидроизоляцию', unit: 'шт' },
  { name: 'Монтаж колодцев В1, В2, включая стремянку и гидроизоляцию', unit: 'шт' },
  { name: 'Монтаж дождеприемных колодцев d 1000 мм', unit: 'компл' },
  { name: 'Монтаж колец/жироуловителя', unit: 'компл' },
  { name: 'Подключение в колодцах В1, В2', unit: 'шт' },
  { name: 'Подключение жироуловителя', unit: 'компл' },
  { name: 'Ремонт колодца', unit: 'шт' },
  { name: 'Изготовление стремянки', unit: 'шт' },
  { name: 'Труба d315 мм SDR 17', unit: 'м.п' },
  { name: 'Труба d90 мм ПЭ 100 SDR 17', unit: 'м.п' },
  { name: 'Труба стальная d89x4,0 мм', unit: 'м.п' },
  { name: 'КС 7.3', unit: 'шт' },
  { name: 'КС 7.6', unit: 'шт' },
  { name: 'КС 15.6', unit: 'шт' },
  { name: 'КС 15.9', unit: 'шт' },
  { name: 'КС 20.6', unit: 'шт' },
  { name: 'КС 20.9', unit: 'шт' },
  { name: 'КО 6', unit: 'шт' },
  { name: 'ПП 15', unit: 'шт' },
  { name: 'ПП 20', unit: 'шт' },
  { name: 'ПН 15', unit: 'шт' },
  { name: 'ПН 20', unit: 'шт' },
  { name: 'Люк чугун тип «Т»', unit: 'шт' },
  { name: 'Люк чугун', unit: 'шт' },
  { name: 'Гильза 426', unit: 'шт' },
  { name: 'Гильза 159', unit: 'метр' },
  { name: 'Гильза 108', unit: 'метр' },
  { name: 'Пескобетон', unit: 'шт' },
  { name: 'Блок 300/300/300', unit: 'шт' },
  { name: 'Песок строительный', unit: 'тонн' },
  { name: 'Щебень', unit: 'тонн' },
  { name: 'Бетон B25', unit: 'куб' },
  { name: 'ЖБИ кольца', unit: 'шт' },
  { name: 'Задвижка фланцевая DN80 PN10', unit: 'шт' },
  { name: 'Задвижка фланцевая DN50 PN10', unit: 'шт' },
  { name: 'Фланец стальной приварной d80', unit: 'шт' },
  { name: 'Фланец стальной приварной d50', unit: 'шт' },
  { name: 'Фланец свободный d90 мм', unit: 'шт' },
  { name: 'Заглушка стальная фланцевая d90 мм', unit: 'шт' },
  { name: 'Отвод ПЭТ d90 мм, 90°', unit: 'шт' },
  { name: 'Неразъемное соединение ПЭ/сталь 90/89', unit: 'шт' },
  { name: 'Опорно-направляющее кольцо d90/315 мм', unit: 'шт' },
  { name: 'Лист стальной 8 мм', unit: 'м.кв.' },
  { name: 'Праймер', unit: 'л' },
  { name: 'Установка фильтра грубой очистки', unit: 'шт' },
  { name: 'Установка фильтра тонкой очистки', unit: 'шт' },
  { name: 'Установка счётчика воды', unit: 'шт' },
  { name: 'Услуги самосвала', unit: 'рейс' },
  { name: 'Услуги самосвала (почасовые)', unit: 'час' },
  { name: 'Услуги экскаватора', unit: 'час' },
  { name: 'Вывоз грунта', unit: 'рейс' },
  { name: 'Доставка песка', unit: 'рейс' },
  { name: 'Доставка щебня', unit: 'рейс' },
  { name: 'Доставка материалов', unit: 'час' },
  { name: 'Транспортные расходы, доставка материалов', unit: 'услуга' },
  { name: 'Погрузочно-разгрузочные работы (грузчик)', unit: 'чел/час' },
  { name: 'Вывоз строительного мусора (за м³, с утилизацией)', unit: 'м³' },
  { name: 'Вывоз старой трубы / металлолома', unit: 'рейс' },
  { name: 'Аренда инструмента (опрессовка / сварка)', unit: 'смена' },
  { name: 'Послестроительная уборка', unit: 'м²' },
  { name: 'Уборка прилегающей территории', unit: 'м²' },
  { name: 'Очистка участка от строительного мусора', unit: '100 м²' },
  { name: 'Демонтаж стальных труб', unit: 'м.п' },
  { name: 'Опрессовка трубы d90 мм', unit: 'м.п' },
  { name: 'Опрессовка системы', unit: 'услуга' },
  { name: 'Промывка системы', unit: 'услуга' },
  { name: 'Реконструкция КГМ', unit: 'услуга' }
];

const LS_CUSTOM_BASE = 'customBase';
const LS_BASE_OVERRIDES = 'baseOverrides';

function loadBase() {
  const overrides = JSON.parse(localStorage.getItem(LS_BASE_OVERRIDES) || '{}');
  const base = DEFAULT_BASE.map(item => {
    if (overrides[item.name]) return { name: overrides[item.name].name, unit: overrides[item.name].unit };
    return { ...item };
  });
  const custom = JSON.parse(localStorage.getItem(LS_CUSTOM_BASE) || '[]');
  return base.concat(custom);
}

function addToBase(name, unit) {
  const custom = JSON.parse(localStorage.getItem(LS_CUSTOM_BASE) || '[]');
  custom.push({ name, unit });
  localStorage.setItem(LS_CUSTOM_BASE, JSON.stringify(custom));
}

let currentSmetaId = null;
let selectedLines = [];

function showScreen(name) {
  document.getElementById('screenList').style.display = name === 'list' ? 'block' : 'none';
  document.getElementById('screenEditor').style.display = name === 'editor' ? 'block' : 'none';
}

function backToList() {
  loadSmetaList();
  showScreen('list');
}

async function loadSmetaList() {
  const container = document.getElementById('smetaList');
  container.innerHTML = '<div class="empty-state">Загрузка...</div>';
  try {
    const res = await fetch('/api/smetas');
    const smetas = await res.json();
    if (smetas.length === 0) {
      container.innerHTML = '<div class="empty-state">Пока нет ни одной сметы. Нажмите «+ Создать новую смету» выше.</div>';
      return;
    }
    smetas.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    container.innerHTML = '';
    smetas.forEach(s => {
      let total = 0;
      (s.lines || []).forEach(l => {
        const qty = parseFloat(l.qty) || 0;
        const price = parseFloat(l.price) || 0;
        total += (!qty && price) ? price : (qty * price);
      });

      const title = (s.header && s.header.title) ? s.header.title : ((s.header && s.header.customer) ? s.header.customer : 'Без названия');
      const date = (s.header && s.header.date) ? s.header.date : new Date(s.updatedAt).toLocaleDateString();
      const div = document.createElement('div');
      div.className = 'smeta-list-item';
      div.innerHTML = '<div class="info" onclick="openSmeta(\'' + s.id + '\')">' +
          '<div class="title">' + title + ' — ' + total.toLocaleString('ru-RU', {minimumFractionDigits: 2}) + ' ₽</div>' +
          '<div class="meta">' + ((s.header && s.header.object) ? s.header.object : 'Объект не указан') + ' · ' + date + '</div>' +
        '</div>' +
        '<div class="actions">' +
          '<button class="btn-secondary" onclick="openSmeta(\'' + s.id + '\')">Открыть</button>' +
          '<button class="btn-danger" onclick="deleteSmeta(\'' + s.id + '\')">Удалить</button>' +
        '</div>';
      container.appendChild(div);
    });
  } catch (e) {
    container.innerHTML = '<div class="empty-state">Ошибка загрузки.</div>';
  }
}

function toggleContractFields() {
  const isSimple = document.querySelector('input[name="smetaType"]:checked').value === 'simple';
  document.getElementById('contractFields').style.display = isSimple ? 'none' : 'block';
}

function createNewSmeta() {
  currentSmetaId = null;
  selectedLines = [];
  
  document.querySelector('input[name="smetaType"][value="simple"]').checked = true;
  toggleContractFields();
  
  document.getElementById('smetaTitle').value = 'СМЕТА';
  document.getElementById('contractNumber').value = '';
  document.getElementById('customer').value = '';
  document.getElementById('directorName').value = '';
  document.getElementById('object').value = '';
  document.getElementById('date').value = new Date().toISOString().slice(0, 10);
  document.getElementById('markupPercent').value = '';
  document.getElementById('usnPercent').value = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('searchDropdown').innerHTML = '';
  document.getElementById('newName').value = '';
  document.getElementById('newUnit').value = '';
  document.getElementById('hint').textContent = '';
  
  renderSelectedLines();
  calcTotal();
  showScreen('editor');
}

async function openSmeta(id) {
  try {
    const res = await fetch('/api/smetas');
    const smetas = await res.json();
    const smeta = smetas.find(s => s.id === id);
    if (!smeta) return alert('Смета не найдена');
    
    currentSmetaId = id;
    
    const isSimple = (smeta.header && smeta.header.type === 'simple');
    document.querySelector('input[name="smetaType"][value="' + (isSimple ? 'simple' : 'contract') + '"]').checked = true;
    toggleContractFields();

    document.getElementById('smetaTitle').value = (smeta.header && smeta.header.title) ? smeta.header.title : 'СМЕТА';
    document.getElementById('contractNumber').value = (smeta.header && smeta.header.contractNumber) ? smeta.header.contractNumber : '';
    document.getElementById('customer').value = (smeta.header && smeta.header.customer) ? smeta.header.customer : '';
    document.getElementById('directorName').value = (smeta.header && smeta.header.directorName) ? smeta.header.directorName : '';
    document.getElementById('object').value = (smeta.header && smeta.header.object) ? smeta.header.object : '';
    document.getElementById('date').value = (smeta.header && smeta.header.date) ? smeta.header.date : '';
    document.getElementById('markupPercent').value = (smeta.header && smeta.header.markupPercent) ? smeta.header.markupPercent : '';
    document.getElementById('usnPercent').value = (smeta.header && smeta.header.usnPercent) ? smeta.header.usnPercent : '';
    
    selectedLines = smeta.lines || [];
    document.getElementById('hint').textContent = 'Редактируется: ' + ((smeta.header && smeta.header.title) ? smeta.header.title : 'Смета');
    renderSelectedLines();
    calcTotal();
    showScreen('editor');
  } catch(e) {
    alert('Ошибка загрузки сметы');
  }
}

async function deleteSmeta(id) {
  if (!confirm('Удалить эту смету?')) return;
  await fetch('/api/smetas/' + id, { method: 'DELETE' });
  loadSmetaList();
}

function getHeaderData() {
  return {
    type: document.querySelector('input[name="smetaType"]:checked').value,
    title: document.getElementById('smetaTitle').value,
    contractNumber: document.getElementById('contractNumber').value,
    ip: document.getElementById('ip').value,
    customer: document.getElementById('customer').value,
    directorName: document.getElementById('directorName').value,
    object: document.getElementById('object').value,
    date: document.getElementById('date').value,
    markupPercent: document.getElementById('markupPercent').value,
    usnPercent: document.getElementById('usnPercent').value,
  };
}

async function saveSmeta() {
  const header = getHeaderData();
  const payload = { id: currentSmetaId, header, lines: selectedLines };

  try {
    const res = await fetch('/api/smetas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    currentSmetaId = result.id;
    document.getElementById('hint').textContent = 'Смета успешно сохранена ✓';
  } catch(e) {
    alert('Ошибка сохранения!');
  }
}

document.getElementById('searchInput').addEventListener('input', function () {
  const q = this.value.toLowerCase().trim();
  const dd = document.getElementById('searchDropdown');
  
  if (!q) {
    dd.innerHTML = '';
    return;
  }
  const results = loadBase().filter(item => item.name.toLowerCase().indexOf(q) !== -1).slice(0, 15);

  if (results.length > 0) {
    dd.innerHTML = results.map(r => 
      '<div class="dd-item" onclick="addSelected(\'' + r.name.replace(/'/g, "\\'") + '\', \'' + r.unit + '\')">' +
        r.name + ' <span class="dd-unit">' + r.unit + '</span>' +
      '</div>'
    ).join('');
  } else {
    dd.innerHTML = '<div class="dd-item" style="color:#888;cursor:default;">Ничего не найдено. Введите в поле ниже и сохраните.</div>';
  }
});

function saveNewToBase() {
  const name = document.getElementById('newName').value.trim();
  const unit = document.getElementById('newUnit').value.trim() || 'шт';
  if (!name) return alert('Введите название');
  addToBase(name, unit);
  alert('Позиция сохранена в базу');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchDropdown').innerHTML = '';
  document.getElementById('newName').value = '';
  document.getElementById('newUnit').value = '';
  addSelected(name, unit);
}

function addSelected(name, unit) {
  if (selectedLines.some(l => l.name === name)) return alert('Уже добавлено');
  selectedLines.push({ name: name, unit: unit, qty: '', price: '' });
  renderSelectedLines();
  document.getElementById('searchInput').value = '';
  document.getElementById('searchDropdown').innerHTML = '';
}

function renderSelectedLines() {
  const container = document.getElementById('selectedList');
  container.innerHTML = '';
  if (selectedLines.length === 0) {
    container.innerHTML = '<p style="color:#9ca3af;font-size:14px;text-align:center;">Ничего не выбрано.</p>';
    return;
  }
  selectedLines.forEach((line, idx) => {
    const div = document.createElement('div');
    div.className = 'selected-item';
    div.innerHTML = '<span class="sel-name">' + line.name + '</span>' +
      '<input type="text" class="sel-unit-input" value="' + (line.unit || '') + '" data-idx="' + idx + '" placeholder="ед.изм.">' +
      '<input type="number" class="sel-qty" placeholder="кол-во" value="' + (line.qty || '') + '" data-idx="' + idx + '" min="0" step="any">' +
      '<input type="number" class="sel-price" placeholder="цена" value="' + (line.price || '') + '" data-idx="' + idx + '" min="0" step="any">' +
      '<button class="sel-del" data-idx="' + idx + '">✕</button>';
    container.appendChild(div);
  });

  container.querySelectorAll('.sel-unit-input').forEach(inp => {
    inp.addEventListener('input', e => { selectedLines[+e.target.dataset.idx].unit = e.target.value; });
  });
  container.querySelectorAll('.sel-qty').forEach(inp => {
    inp.addEventListener('input', e => { selectedLines[+e.target.dataset.idx].qty = e.target.value; calcTotal(); });
  });
  container.querySelectorAll('.sel-price').forEach(inp => {
    inp.addEventListener('input', e => { selectedLines[+e.target.dataset.idx].price = e.target.value; calcTotal(); });
  });
  container.querySelectorAll('.sel-del').forEach(btn => {
    btn.addEventListener('click', e => {
      selectedLines.splice(+e.target.dataset.idx, 1);
      renderSelectedLines();
      calcTotal();
    });
  });
}

function calcTotal() {
  let total = 0;
  selectedLines.forEach(l => {
    const qty = parseFloat(l.qty) || 0;
    const price = parseFloat(l.price) || 0;
    total += (!qty && price) ? price : (qty * price);
  });
  
  const markupPercent = parseFloat(document.getElementById('markupPercent').value) || 0;
  const usnPercent = parseFloat(document.getElementById('usnPercent').value) || 0;
  
  const markupSum = total * (markupPercent / 100);
  const usnSum = total * (usnPercent / 100);
  const finalTotal = total + markupSum + usnSum;

  document.getElementById('totalDisplay').textContent = finalTotal.toLocaleString('ru-RU', {minimumFractionDigits: 2});
}

document.getElementById('markupPercent').addEventListener('input', calcTotal);
document.getElementById('usnPercent').addEventListener('input', calcTotal);

async function downloadPdf() {
  const header = getHeaderData();
  const res = await fetch('/api/pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ header, lines: selectedLines }),
  });
  const blob = await res.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (header.title || 'smeta') + '.pdf';
  a.click();
}

async function downloadExcel() {
  const header = getHeaderData();
  const res = await fetch('/api/excel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ header, lines: selectedLines }),
  });
  const blob = await res.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (header.title || 'smeta') + '.xlsx';
  a.click();
}

function openBaseEditor() {
  const base = loadBase();
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;';
  const box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:12px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;padding:24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);';

  const title = document.createElement('h3');
  title.textContent = 'Редактирование базы';
  title.style.marginTop = '0';
  box.appendChild(title);

  const addForm = document.createElement('div');
  addForm.style.cssText = 'background:#f0fdf4; padding:12px; border-radius:8px; margin-bottom:16px; border:1px solid #bbf7d0; display:flex; gap:8px;';
  addForm.innerHTML = '<input type="text" id="baseNewName" placeholder="Название новой позиции" style="flex:2;padding:8px;border:1px solid #d1d5db;border-radius:6px; box-sizing:border-box;">' +
    '<input type="text" id="baseNewUnit" placeholder="ед.изм." style="width:80px;padding:8px;border:1px solid #d1d5db;border-radius:6px; text-align:center; box-sizing:border-box;">' +
    '<button id="baseAddBtn" style="background:#10b981;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:600;">+ Добавить</button>';
  box.appendChild(addForm);

  addForm.querySelector('#baseAddBtn').addEventListener('click', () => {
    const name = addForm.querySelector('#baseNewName').value.trim();
    const unit = addForm.querySelector('#baseNewUnit').value.trim() || 'шт';
    if (!name) return alert('Введите название');
    addToBase(name, unit);
    modal.remove();
    openBaseEditor();
  });

  const searchEdit = document.createElement('input');
  searchEdit.placeholder = 'Поиск по базе...';
  searchEdit.style.cssText = 'width:100%;padding:12px;border:1px solid #d1d5db;border-radius:8px;margin-bottom:16px; font-size: 14px; box-sizing: border-box;';
  box.appendChild(searchEdit);

  const list = document.createElement('div');
  box.appendChild(list);

  function renderList(query = '') {
    list.innerHTML = '';
    const q = query.toLowerCase().trim();
    const filtered = base.filter(item => item.name.toLowerCase().indexOf(q) !== -1);

    if (filtered.length === 0) {
      list.innerHTML = '<p style="color:#6b7280;font-size:14px;text-align:center;">Ничего не найдено.</p>';
      return;
    }

    filtered.forEach((item) => {
      const originalName = item.name;
      const originalUnit = item.unit;
      const isCustom = !DEFAULT_BASE.some(b => b.name === originalName && b.unit === originalUnit);

      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:8px;padding:10px 0;border-bottom:1px solid #f3f4f6;align-items:center;font-size:14px;';
      row.innerHTML = '<input type="text" class="edit-name" value="' + originalName.replace(/"/g, '&quot;') + '" style="flex:2;padding:8px;border:1px solid #d1d5db;border-radius:6px; box-sizing: border-box;">' +
        '<input type="text" class="edit-unit" value="' + originalUnit.replace(/"/g, '&quot;') + '" style="width:80px;padding:8px;border:1px solid #d1d5db;border-radius:6px;text-align:center; box-sizing: border-box;">' +
        '<button class="edit-save" style="background:#1a56db;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;">OK</button>' +
        (isCustom ? '<button class="edit-del" style="background:#fee2e2;color:#b91c1c;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;">✕</button>' : '');
      list.appendChild(row);

      row.querySelector('.edit-save').addEventListener('click', () => {
        const newName = row.querySelector('.edit-name').value.trim();
        const newUnit = row.querySelector('.edit-unit').value.trim();
        if (!newName) return alert('Название не может быть пустым');
        updateInBase(originalName, newName, newUnit);
        modal.remove();
        openBaseEditor();
      });

      const delBtn = row.querySelector('.edit-del');
      if (delBtn) {
        delBtn.addEventListener('click', () => {
          if (!confirm('Удалить "' + originalName + '" из базы?')) return;
          removeFromBase(originalName);
          modal.remove();
          openBaseEditor();
        });
      }
    });
  }

  renderList();
  searchEdit.addEventListener('input', e => renderList(e.target.value));

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Закрыть';
  closeBtn.style.cssText = 'margin-top:20px;padding:12px 20px;background:#e5e7eb;color:#374151;border:none;border-radius:8px;cursor:pointer;width:100%;font-weight:600;';
  closeBtn.addEventListener('click', () => modal.remove());
  box.appendChild(closeBtn);

  modal.appendChild(box);
  document.body.appendChild(modal);
}

function updateInBase(oldName, newName, newUnit) {
  const custom = JSON.parse(localStorage.getItem(LS_CUSTOM_BASE) || '[]');
  const customIdx = custom.findIndex(c => c.name === oldName);
  if (customIdx !== -1) {
    custom[customIdx] = { name: newName, unit: newUnit };
    localStorage.setItem(LS_CUSTOM_BASE, JSON.stringify(custom));
    return;
  }
  const overrides = JSON.parse(localStorage.getItem(LS_BASE_OVERRIDES) || '{}');
  delete overrides[oldName];
  overrides[oldName] = { name: newName, unit: newUnit };
  localStorage.setItem(LS_BASE_OVERRIDES, JSON.stringify(overrides));
}

function removeFromBase(name) {
  const custom = JSON.parse(localStorage.getItem(LS_CUSTOM_BASE) || '[]');
  const filtered = custom.filter(c => c.name !== name);
  localStorage.setItem(LS_CUSTOM_BASE, JSON.stringify(filtered));
}

loadSmetaList();
showScreen('list');