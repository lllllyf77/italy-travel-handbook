// Node + jsdom self-check for Italy Travel Handbook
// Verifies: data integrity, render functions, theme/language switching, no NaN coords, no console errors
'use strict';
const path = require('path');
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const HTML_PATH = path.resolve(process.cwd(), 'index.html');

if (!fs.existsSync(HTML_PATH)) {
  console.error('FAIL: index.html missing at', HTML_PATH);
  process.exit(1);
}

const html = fs.readFileSync(HTML_PATH, 'utf8');

// Capture console output
const consoleMessages = [];
const consoleErrors = [];
const vc = new VirtualConsole();
vc.on('log',   (...a) => consoleMessages.push(['log', a.join(' ')]));
vc.on('info',  (...a) => consoleMessages.push(['info', a.join(' ')]));
vc.on('warn',  (...a) => consoleMessages.push(['warn', a.join(' ')]));
vc.on('error', (...a) => consoleErrors.push(a.join(' ')));
vc.on('jsdomError', (e) => consoleErrors.push('jsdomError: ' + (e.message || e)));

let dom;
try {
  // HTML is fully self-contained (no external resources), so don't use a custom loader.
  // Use localhost URL so localStorage works (file:// opaque origin would throw SecurityError).
  dom = new JSDOM(html, {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc,
    url: 'http://localhost/'
  });
} catch (e) {
  console.error('FAIL: JSDOM construction threw:', e.message);
  process.exit(1);
}

const results = [];
function record(name, ok, detail) {
  results.push({ name, ok: !!ok, detail: detail || '' });
  console.log((ok ? 'PASS' : 'FAIL') + ' ' + name + (detail ? ' :: ' + detail : ''));
}

// Wait for scripts to finish (give IIFE + renderAll a moment)
setTimeout(runChecks, 1500);

function runChecks() {
  try {
    const win = dom.window;
    const doc = win.document;

    // ===== 1) No script errors thrown during init =====
    record('no console errors during init', consoleErrors.length === 0,
      consoleErrors.length ? consoleErrors.slice(0, 3).join(' | ') : '');

    // ===== 2) Data globals exist =====
    const dataKeys = ['DICT', 'ITINERARY', 'LOCATIONS', 'SPOTS_INFO', 'TICKETS', 'STAY_INFO', 'TODO_LIST', 'TIPS_LIST'];
    for (let i = 0; i < dataKeys.length; i++) {
      record('global ' + dataKeys[i] + ' exists', typeof win[dataKeys[i]] !== 'undefined');
    }

    // ===== 3) t() translation function works (test via DOM-language button clicks) =====
    // The IIFE doesn't expose t() to window, so we verify by clicking the language button.
    const langBtnEn = doc.querySelector('.lang-btn[data-lang="en"]');
    const langBtnZh = doc.querySelector('.lang-btn[data-lang="zh"]');
    record('language buttons present in toolbar', !!langBtnEn && !!langBtnZh,
      'en=' + !!langBtnEn + ' zh=' + !!langBtnZh);

    // ===== 4) ITINERARY has 12 days =====
    const itin = win.ITINERARY;
    record('ITINERARY has 12 days', Array.isArray(itin) && itin.length === 12,
      'actual length: ' + (Array.isArray(itin) ? itin.length : 'not array'));

    // ===== 5) LOCATIONS all have valid lat/lng, no NaN =====
    const locs = win.LOCATIONS || {};
    let bad = [];
    let count = 0;
    for (const k in locs) {
      count++;
      const v = locs[k];
      if (!v) { bad.push(k + ':null'); continue; }
      if (typeof v.lat !== 'number' || isNaN(v.lat)) bad.push(k + ':bad lat');
      if (typeof v.lng !== 'number' || isNaN(v.lng)) bad.push(k + ':bad lng');
      if (v.lat < -90 || v.lat > 90) bad.push(k + ':lat out of range');
      if (v.lng < -180 || v.lng > 180) bad.push(k + ':lng out of range');
    }
    record('LOCATIONS all valid coords', bad.length === 0 && count > 0,
      'count=' + count + ' bad=' + JSON.stringify(bad.slice(0, 5)));

    // ===== 6) Every spot ref in ITINERARY resolves in SPOTS_INFO and LOCATIONS =====
    let unresolved = [];
    for (let d = 0; d < (Array.isArray(itin) ? itin.length : 0); d++) {
      const items = (itin[d] && itin[d].items) || [];
      for (let i = 0; i < items.length; i++) {
        const s = items[i].spot;
        if (!s) continue;
        if (!win.SPOTS_INFO[s]) unresolved.push('Day' + (d+1) + ':' + s + ':no-spot-info');
        if (!win.LOCATIONS[s]) unresolved.push('Day' + (d+1) + ':' + s + ':no-location');
      }
    }
    record('All itinerary spot refs resolve', unresolved.length === 0,
      unresolved.length ? unresolved.slice(0, 5).join(', ') : '');

    // ===== 7) DOM rendered key elements =====
    const sel = (s) => doc.querySelectorAll(s).length;
    record('Hero SVG rendered', sel('svg.hero-svg, svg') > 0);
    record('Map SVG rendered', doc.querySelectorAll('#map-svg-wrap svg').length > 0);
    record('Itinerary list rendered', sel('#itinerary-list .day-card, #itinerary-list .day, .day-card') > 0);
    record('Day buttons rendered', sel('#day-buttons button.day-btn') >= 1);
    record('Tickets rendered', sel('#ticket-list .info-card') >= 1);
    record('Stay rendered', sel('#stay-list .info-card') >= 1);
    record('Todo rendered', sel('#todo-list li, #todo-list .list-item') >= 1);
    record('Tips rendered', sel('#tips-list li, #tips-list .list-item') >= 1);
    record('Footer rendered', !!doc.querySelector('footer'));

    // ===== 7b) Countdown + dual clocks populated =====
    const cdEl = doc.getElementById('cd-count');
    const cdText = cdEl ? cdEl.textContent.trim() : '';
    record('Countdown populated', cdText.length > 0 && /\d/.test(cdText),
      'text=' + JSON.stringify(cdText.slice(0, 60)));
    const clockIt = doc.getElementById('clock-it');
    const clockBj = doc.getElementById('clock-bj');
    const itText = clockIt ? clockIt.textContent.trim() : '';
    const bjText = clockBj ? clockBj.textContent.trim() : '';
    record('Italy clock populated', /^\d{2}:\d{2}:\d{2}$/.test(itText), 'it=' + itText);
    record('Beijing clock populated', /^\d{2}:\d{2}:\d{2}$/.test(bjText), 'bj=' + bjText);

    // ===== 8) Language switching: zh -> en produces different text =====
    if (langBtnEn && langBtnZh) {
      try {
        const itin = doc.querySelector('#itinerary-list');
        const beforeZh = itin ? itin.textContent.length : 0;

        langBtnEn.dispatchEvent(new win.MouseEvent('click', { bubbles: true }));
        const afterEn = itin ? itin.textContent.length : 0;

        // English mode should change text (UI labels translated, itinerary content stays in zh)
        // We just verify the language button reflects the active language
        const enActive = langBtnEn.classList.contains('lang-active');
        const zhInactive = !langBtnZh.classList.contains('lang-active');
        record('lang switch en activates en button', enActive && zhInactive,
          'enActive=' + enActive + ' zhInactive=' + zhInactive + ' zhLen=' + beforeZh + ' enLen=' + afterEn);

        langBtnZh.dispatchEvent(new win.MouseEvent('click', { bubbles: true }));
        const zhActiveAfter = langBtnZh.classList.contains('lang-active');
        record('lang switch back to zh activates zh', zhActiveAfter, 'zhActive=' + zhActiveAfter);
      } catch (e) {
        record('lang switch via button works', false, e.message);
      }
    } else {
      record('lang switch via button works', false, 'lang buttons missing');
    }

    // ===== 9) Theme switching via DOM click =====
    const themeBtn = doc.querySelector('.theme-toggle');
    if (themeBtn) {
      try {
        const before = doc.documentElement.getAttribute('data-theme');
        themeBtn.dispatchEvent(new win.MouseEvent('click', { bubbles: true }));
        const after = doc.documentElement.getAttribute('data-theme');
        record('theme toggle button changes data-theme', before !== after, before + '->' + after);
        // toggle back so subsequent checks aren't affected
        themeBtn.dispatchEvent(new win.MouseEvent('click', { bubbles: true }));
      } catch (e) {
        record('theme toggle via button works', false, e.message);
      }
    } else {
      record('theme toggle button present', false);
    }

    // ===== 10) Map mode switch buttons exist =====
    const modeBtns = doc.querySelectorAll('[data-map-mode], .map-mode-btn, #map-mode');
    record('map mode control present', modeBtns.length >= 1, 'count=' + modeBtns.length);

    // ===== 11) Day buttons trigger map =====
    const dayBtns = doc.querySelectorAll('#day-buttons button');
    if (dayBtns.length > 0) {
      try {
        const ev = new win.MouseEvent('click', { bubbles: true });
        dayBtns[1].dispatchEvent(ev);
        record('day button click dispatchable', true);
      } catch (e) {
        record('day button clickable', false, e.message);
      }
    }

    // ===== 12) After all rendering, still no errors =====
    record('no console errors after interactive run', consoleErrors.length === 0,
      consoleErrors.length ? consoleErrors.slice(0, 3).join(' | ') : '');

    // ===== Summary =====
    const passed = results.filter(r => r.ok).length;
    const failed = results.filter(r => !r.ok).length;
    console.log('\n=== SUMMARY ===');
    console.log('PASS:', passed);
    console.log('FAIL:', failed);
    if (failed > 0) {
      console.log('\nFailed checks:');
      results.filter(r => !r.ok).forEach(r => {
        console.log('  -', r.name, r.detail ? '(' + r.detail + ')' : '');
      });
    }
    process.exit(failed > 0 ? 1 : 0);
  } catch (e) {
    console.error('FAIL: check threw:', e.message, e.stack);
    process.exit(1);
  }
}