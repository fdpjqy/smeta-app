const express = require('express');
const ExcelJS = require('exceljs');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'smetas.json');

function readSmetas() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch (e) { return []; }
}
function writeSmetas(arr) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
}

app.get('/api/smetas', (req, res) => res.json(readSmetas()));

app.post('/api/smetas', (req, res) => {
  if (process.env.RENDER) {
    return res.status(503).json({ error: 'Сохранение на сервере временно недоступно. Используйте локальную версию.' });
  }

  const { id, header, lines } = req.body;
  const smetas = readSmetas();
  if (id) {
    const idx = smetas.findIndex(s => s.id === id);
    if (idx !== -1) {
      smetas[idx] = { ...smetas[idx], header, lines, updatedAt: Date.now() };
      writeSmetas(smetas);
      return res.json({ id });
    }
  }
  const newId = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  smetas.push({ id: newId, header, lines, createdAt: Date.now(), updatedAt: Date.now() });
  writeSmetas(smetas);
  res.json({ id: newId });
});

app.delete('/api/smetas/:id', (req, res) => {
  const smetas = readSmetas().filter(s => s.id !== req.params.id);
  writeSmetas(smetas);
  res.json({ ok: true });
});

function processData(header, lines) {
  let total = 0;
  const processedLines = lines.map(l => {
    const qty = parseFloat(l.qty) || 0;
    const price = parseFloat(l.price) || 0;
    const sum = (!qty && price) ? price : (qty * price);
    total += sum;
    return { ...l, sum };
  });

  const markupPercent = parseFloat(header.markupPercent) || 0;
  const usnPercent = parseFloat(header.usnPercent) || 0;

  return { processedLines, total, markupPercent, usnPercent };
}

app.post('/api/pdf', async (req, res) => {
  if (process.env.RENDER) {
    return res.status(503).send('Генерация PDF доступна только локально.');
  }

  const { header, lines } = req.body;
  const formatNumber = (num) => Number(num || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const { processedLines, total, markupPercent, usnPercent } = processData(header, lines);

  let rows = '';
  processedLines.forEach(l => {
    rows += '<tr>' +
      '<td style="border:1px solid #000;padding:6px;">' + l.name + '</td>' +
      '<td style="border:1px solid #000;padding:6px;text-align:center;">' + (l.unit || '') + '</td>' +
      '<td style="border:1px solid #000;padding:6px;text-align:center;">' + (l.qty || '') + '</td>' +
      '<td style="border:1px solid #000;padding:6px;text-align:right;">' + formatNumber(l.price) + '</td>' +
      '<td style="border:1px solid #000;padding:6px;text-align:right;">' + formatNumber(l.sum) + '</td>' +
    '</tr>';
  });

  const isSimple = header.type === 'simple';
  const formattedDate = header.date ? header.date.split('-').reverse().join('.') : '__.__.____';

  let headerHtml = '';
  if (isSimple) {
    headerHtml = '<div class="doc-title">' + (header.title || 'СМЕТА') + '</div>';
  } else {
    headerHtml = '<table style="width:100%; border-collapse:collapse; margin-bottom:20px; font-family:\'Times New Roman\', serif;">' +
      '<tr>' +
        '<td style="width:50%; vertical-align:top; padding:0;">' +
          '<div style="height:22px; margin-bottom:15px;"></div>' +
          '<div style="font-weight:bold; font-size:14px; margin-bottom:5px;">СОГЛАСОВАНО:</div>' +
          '<div>Индивидуальный предприниматель</div>' +
          '<div style="height:60px;"></div>' + 
          '<div style="border-bottom:1px solid #000; width:200px; display:inline-block; height:15px;"></div>' +
          ' <span style="font-size:14px;">' + (header.ip || 'ИП Ефремов В.В.') + '</span><br>' +
          '<div style="margin-top:5px;">"' + formattedDate + '"г.</div>' +
        '</td>' +
        '<td style="width:50%; vertical-align:top; padding:0; padding-left:20px;">' +
          '<div style="margin-bottom:15px; text-align:right; height:22px;">Приложение №1 к договору № ' + (header.contractNumber || '____') + ' от ' + formattedDate + 'г.</div>' +
          '<div style="font-weight:bold; font-size:14px; margin-bottom:5px;">УТВЕРЖДАЮ:</div>' +
          '<div>Директор</div>' +
          '<div>' + (header.customer || '') + '</div>' +
          '<div style="height:20px;"></div>' + 
          '<div style="border-bottom:1px solid #000; width:150px; display:inline-block; height:15px;"></div>' +
          ' <span style="font-size:14px;">' + (header.directorName || '') + '</span><br>' +
          '<div style="margin-top:5px;">"' + formattedDate + '"г.</div>' +
        '</td>' +
      '</tr>' +
    '</table>' +
    '<div style="text-align:center; font-size:14px; font-weight:bold; margin-top:30px; margin-bottom:20px;">' +
      '<div style="margin-bottom:5px;">Состав и стоимость работ №1</div>' +
      '<div>Объект: ' + (header.object || '') + '</div>' +
    '</div>';
  }

  let markupHtml = '';
  if (markupPercent > 0) {
    markupHtml += '<tr><td colspan="5" class="no-border align-left" style="padding-top: 10px !important;">Оплата на ИП (' + markupPercent + '%)</td></tr>';
  }
  if (usnPercent > 0) {
    markupHtml += '<tr><td colspan="5" class="no-border align-left" style="padding-top: 6px !important;">Налог УСН (' + usnPercent + '%)</td></tr>';
  }

  const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
    'body{font-family: "Times New Roman", Times, serif; font-size:12px; padding:20px; color:#000;}' +
    '.doc-title{text-align:center; font-size:16px; font-weight:bold; margin-bottom:20px; text-transform:uppercase;}' +
    'table.data-table { width: 100%; border-collapse: collapse; margin-top: 12px; }' +
    'th { background: #fff; border: 1px solid #000; padding: 6px; font-weight: bold; text-align: center; }' +
    '.no-border { border: none !important; padding: 6px 0 !important; }' +
    '.bold { font-weight: bold; }' +
    '.align-left { text-align: left !important; }' +
    '.align-right { text-align: right !important; }' +
  '</style></head><body>' +
    headerHtml +
    '<table class="data-table">' +
      '<tr>' +
        '<th style="width:45%;">Наименование</th>' +
        '<th style="width:10%;">ед.изм.</th>' +
        '<th style="width:10%;">кол-во</th>' +
        '<th style="width:15%;">цена(руб.)</th>' +
        '<th style="width:20%;">сумма(руб.)</th>' +
      '</tr>' +
      rows +
      '<tr>' +
        '<td colspan="4" style="border:1px solid #000;padding:6px;" class="bold align-left">Итого</td>' +
        '<td style="border:1px solid #000;padding:6px;" class="bold align-right">' + formatNumber(total) + '</td>' +
      '</tr>' +
      markupHtml +
    '</table>' +
  '</body></html>';

  const browser = await puppeteer.launch({ 
    headless: 'new', 
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' } });
  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="smeta.pdf"');
  res.send(pdfBuffer);
});

app.post('/api/excel', async (req, res) => {
  const { header, lines } = req.body;
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Смета');

  const { processedLines, markupPercent, usnPercent, total } = processData(header, lines);
  const isSimple = header.type === 'simple';
  const formattedDate = header.date ? header.date.split('-').reverse().join('.') : '__.__.____';

  // Настраиваем 5 колонок
  ws.columns = [
    { width: 35 }, // A: Наименование / левая часть шапки
    { width: 10 }, // B: ед.изм / середина левой части
    { width: 10 }, // C: кол-во / пустая
    { width: 15 }, // D: цена / правая часть шапки
    { width: 18 }  // E: сумма
  ];

  const makeBorder = (cell) => {
    cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
  };

  if (isSimple) {
    ws.mergeCells('A1:E1');
    ws.getCell('A1').value = header.title || 'СМЕТА';
    ws.getCell('A1').font = { bold: true, size: 16 };
    ws.getCell('A1').alignment = { horizontal: 'center' };
    ws.addRow([]);
  } else {
    // --- ВЕРСТКА ШАПКИ КАК В PDF ---

    // 1. Строка с "Приложение №1..."
    ws.mergeCells('A1:E1');
    const cellA1 = ws.getCell('A1');
    cellA1.value = 'Приложение №1 к договору № ' + (header.contractNumber || '____') + ' от ' + formattedDate + 'г.';
    cellA1.alignment = { horizontal: 'right', vertical: 'middle' };
    
    // 2. Пустые строки перед шапкой (как на вашем примере)
    ws.addRow([]); 
    ws.addRow([]); 

    // 3. Строка "СОГЛАСОВАНО:" и "УТВЕРЖДАЮ:"
    // Объединяем A и B для левой части, C пустая, D и E объединяем для правой
    ws.mergeCells('A4:B4'); 
    ws.mergeCells('D4:E4');
    const row4 = ws.getRow(4);
    row4.getCell(1).value = 'СОГЛАСОВАНО:';
    row4.getCell(1).font = { bold: true };
    row4.getCell(1).alignment = { horizontal: 'left', vertical: 'bottom' };
    row4.getCell(4).value = 'УТВЕРЖДАЮ:';
    row4.getCell(4).font = { bold: true };
    row4.getCell(4).alignment = { horizontal: 'left', vertical: 'bottom' };

    // 4. Строка с должностями
    ws.mergeCells('A5:B5'); 
    ws.mergeCells('D5:E5');
    const row5 = ws.getRow(5);
    row5.getCell(1).value = 'Индивидуальный предприниматель';
    row5.getCell(1).alignment = { horizontal: 'left', vertical: 'top' };
    row5.getCell(4).value = 'Директор';
    row5.getCell(4).alignment = { horizontal: 'left', vertical: 'top' };

    // 5. Строка с названием компании (только справа)
    ws.mergeCells('D6:E6');
    const row6 = ws.getRow(6);
    row6.getCell(4).value = header.customer || '';
    row6.getCell(4).alignment = { horizontal: 'left', vertical: 'top' };

    // 6. Пропуск для подписи (оставляем пустым)
    ws.getRow(7).height = 30; 
    
    // 7. Строка с ФИО и подчеркиванием (только для ячеек с ФИО)
    ws.mergeCells('A8:B8'); 
    ws.mergeCells('D8:E8');
    const row8 = ws.getRow(8);
    row8.getCell(1).value = header.ip || '';
    row8.getCell(1).alignment = { horizontal: 'right', vertical: 'bottom' };
    row8.getCell(1).border = { bottom: {style:'thin'} }; // Подчеркивание
    row8.getCell(4).value = header.directorName || '';
    row8.getCell(4).alignment = { horizontal: 'right', vertical: 'bottom' };
    row8.getCell(4).border = { bottom: {style:'thin'} }; // Подчеркивание

    // 8. Строка с датой
    ws.mergeCells('A9:B9'); 
    ws.mergeCells('D9:E9');
    const row9 = ws.getRow(9);
    row9.getCell(1).value = '"' + formattedDate + '"г.';
    row9.getCell(1).alignment = { horizontal: 'left', vertical: 'top' };
    row9.getCell(4).value = '"' + formattedDate + '"г.';
    row9.getCell(4).alignment = { horizontal: 'left', vertical: 'top' };

    // 9. Пустая строка
    ws.addRow([]); 

    // 10. Заголовок "Состав и стоимость работ"
    ws.mergeCells('A11:E11');
    const cellA11 = ws.getCell('A11');
    cellA11.value = 'Состав и стоимость работ №1';
    cellA11.font = { bold: true, size: 14 };
    cellA11.alignment = { horizontal: 'center', vertical: 'middle' };

    // 11. Строка "Объект: ..."
    ws.mergeCells('A12:E12');
    const cellA12 = ws.getCell('A12');
    cellA12.value = 'Объект: ' + (header.object || '');
    cellA12.font = { bold: true, size: 12 };
    cellA12.alignment = { horizontal: 'center', vertical: 'middle' };
  }

  // Определяем, с какой строки начинать таблицу (зависит от того, простая смета или нет)
  const startTableRow = isSimple ? 3 : 14;

  // Строка заголовков таблицы
  const headerRow = ws.getRow(startTableRow);
  headerRow.values = ['Наименование', 'ед.изм.', 'кол-во', 'цена(руб.)', 'сумма(руб.)'];
  headerRow.font = { bold: true };
  headerRow.eachCell((c, colNumber) => { 
    if(colNumber <= 5) {
      makeBorder(c); 
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
      c.alignment = { horizontal: 'center', vertical: 'middle' }; 
    }
  });

  // Строки с данными
  let currentRowIndex = startTableRow;
  processedLines.forEach(l => {
    currentRowIndex++;
    const qtyNum = parseFloat(l.qty) || 0;
    const priceNum = parseFloat(l.price) || 0;
    const sumNum = parseFloat(l.sum) || 0;

    const formattedQty = (l.qty === '' || l.qty === undefined) ? '' : 
      (Number.isInteger(qtyNum) ? qtyNum.toString() : qtyNum.toLocaleString('ru-RU'));
    
    const formattedPrice = priceNum.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedSum = sumNum.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const row = ws.getRow(currentRowIndex);
    row.values = [l.name || '', l.unit || '', formattedQty, formattedPrice, formattedSum];
    
    row.eachCell((c, colNumber) => { 
      if(colNumber <= 5) makeBorder(c);
    });
    row.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };   
    row.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' }; 
    row.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' }; 
    row.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' }; 
    row.getCell(5).alignment = { horizontal: 'right', vertical: 'middle' };  
  });

  // Строка Итого
  currentRowIndex++;
  const formattedTotal = (parseFloat(total) || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const totalRow = ws.getRow(currentRowIndex);
  totalRow.values = ['Итого', '', '', '', formattedTotal];
  totalRow.font = { bold: true };
  totalRow.eachCell((c, colNumber) => { 
    if(colNumber <= 5) makeBorder(c); 
  });
  totalRow.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' }; 
  totalRow.getCell(5).alignment = { horizontal: 'right', vertical: 'middle' }; 

  if (markupPercent > 0) {
    currentRowIndex++;
    const row = ws.getRow(currentRowIndex);
    row.getCell(1).value = 'Оплата на ИП (' + markupPercent + '%)';
    row.getCell(1).alignment = { horizontal: 'left' }; 
  }
  if (usnPercent > 0) {
    currentRowIndex++;
    const row = ws.getRow(currentRowIndex);
    row.getCell(1).value = 'Налог УСН (' + usnPercent + '%)';
    row.getCell(1).alignment = { horizontal: 'left' };
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="smeta.xlsx"');
  await wb.xlsx.write(res);
  res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Сервер запущен. Порт ' + PORT));