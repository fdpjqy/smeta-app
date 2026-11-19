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
    // Добавили невидимый блок слева, чтобы выровнять СОГЛАСОВАНО и УТВЕРЖДАЮ
    headerHtml = '<table style="width:100%; border-collapse:collapse; margin-bottom:20px; font-family:\'Times New Roman\', serif;">' +
      '<tr>' +
        '<td style="width:50%; vertical-align:top; padding:0;">' +
          '<div style="height:22px; margin-bottom:15px;"></div>' + // ПУСТОЙ БЛОК ДЛЯ ВЫРАВНИВАНИЯ
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

  const { processedLines, markupPercent, usnPercent } = processData(header, lines);
  const isSimple = header.type === 'simple';

  ws.columns = [{ width: 45 }, { width: 10 }, { width: 10 }, { width: 15 }, { width: 15 }];

  if (isSimple) {
    ws.mergeCells('A1:E1');
    ws.getCell('A1').value = header.title || 'СМЕТА';
    ws.getCell('A1').font = { bold: true, size: 16 };
    ws.getCell('A1').alignment = { horizontal: 'center' };
    ws.addRow([]);
  } else {
    ws.mergeCells('A1:E1');
    ws.getCell('A1').value = 'СМЕТА (Приложение №1)';
    ws.getCell('A1').font = { bold: true, size: 14 };
    ws.getCell('A1').alignment = { horizontal: 'center' };
    ws.addRow(['СОГЛАСОВАНО: ' + (header.ip || '')]);
    ws.addRow(['УТВЕРЖДАЮ: ' + (header.customer || '')]);
    ws.addRow(['Объект: ' + (header.object || '')]);
    ws.addRow(['Дата: ' + (header.date || '')]);
    ws.addRow([]);
  }

  const headerRow = ws.addRow(['Наименование', 'ед.изм.', 'кол-во', 'цена(руб.)', 'сумма(руб.)']);
  headerRow.font = { bold: true };
  headerRow.eachCell(c => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } }; c.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} }; });

  const firstDataRow = ws.lastRow.number + 1;
  processedLines.forEach(l => {
    const row = ws.addRow([l.name, l.unit || '', l.qty || '', l.price || '', '']);
    const r = row.number;
    row.getCell(5).value = { formula: 'IF(C' + r + '="", D' + r + ', C' + r + '*D' + r + ')', result: l.sum };
    row.getCell(4).numFmt = '#,##0.00';
    row.getCell(5).numFmt = '#,##0.00';
    row.eachCell(c => { c.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} }; });
  });
  const lastDataRow = ws.lastRow.number;

  const totalRow = ws.addRow(['Итого', '', '', '', { formula: 'SUM(E' + firstDataRow + ':E' + lastDataRow + ')', result: 0 }]);
  totalRow.font = { bold: true };
  totalRow.getCell(5).numFmt = '#,##0.00';
  totalRow.eachCell(c => { c.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} }; });

  if (markupPercent > 0) {
    ws.addRow(['Оплата на ИП (' + markupPercent + '%)']);
  }
  if (usnPercent > 0) {
    ws.addRow(['Налог УСН (' + usnPercent + '%)']);
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="smeta.xlsx"');
  await wb.xlsx.write(res);
  res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Сервер запущен. Порт ' + PORT));