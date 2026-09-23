"""
构建 index.html - 单文件意大利旅行手册
读取 data.js、style.css、s2t.js，拼装成完整页面
"""
import os

BASE = 'C:/Users/fan77/WorkBuddy/2026-09-22-15-02-23/itinerary'

with open(os.path.join(BASE, 'data.js'), 'r', encoding='utf-8') as f:
    data_js = f.read()
with open(os.path.join(BASE, 'style.css'), 'r', encoding='utf-8') as f:
    style_css = f.read()
with open(os.path.join(BASE, 's2t.js'), 'r', encoding='utf-8') as f:
    s2t_js = f.read()

# 主 JS (核心逻辑) - 内联在 IIFE 中
MAIN_JS = r"""
(function () {
'use strict';

// ===== 字形转换 (简->繁) 核心词典 =====
__S2T_PLACEHOLDER__

// ===== 当前语言 / 主题 =====
var currentLang = localStorage.getItem('lang') || 'zh';
var currentTheme = localStorage.getItem('theme') || 'light';
var ratings = {};
var checks = {};
try {
  var savedR = localStorage.getItem('rating');
  if (savedR) ratings = JSON.parse(savedR);
  var savedC = localStorage.getItem('checks');
  if (savedC) checks = JSON.parse(savedC);
} catch(e) { ratings = {}; checks = {}; }

// ===== 翻译函数 t() =====
function t(key, params) {
  var actualLang = (currentLang === 'zht') ? 'zh' : currentLang;
  var dict = DICT[actualLang] || DICT.zh;
  var val = dict[key];
  if (val === undefined) return key;
  if (currentLang === 'zht' && typeof val === 'string') {
    val = s2t(val);
  }
  if (params && typeof val === 'string') {
    for (var k in params) {
      val = val.replace(new RegExp('\\{\\{' + k + '\\}\\}', 'g'), params[k]);
    }
  }
  return val;
}

// ===== 标签翻译（按嵌套结构） =====
function getTagLabel(tagKey) {
  var actualLang = (currentLang === 'zht') ? 'zh' : currentLang;
  var dict = DICT[actualLang] || DICT.zh;
  var v = (dict.tags && dict.tags[tagKey]) || tagKey;
  if (currentLang === 'zht') v = s2t(v);
  return v;
}

// ===== 主题切换 =====
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
  try { localStorage.setItem('theme', theme); } catch(e) {}
  var btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀' : '🌙';
  renderHero();
  if (typeof renderMap === 'function') renderMap();
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

// ===== 语言切换 =====
function applyLang(lang) {
  currentLang = lang;
  try { localStorage.setItem('lang', lang); } catch(e) {}
  var buttons = document.querySelectorAll('.lang-btn');
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].getAttribute('data-lang') === lang) {
      buttons[i].classList.add('lang-active');
    } else {
      buttons[i].classList.remove('lang-active');
    }
  }
  renderAll();
}

function setLang(lang) { applyLang(lang); }

// ===== 倒计时 =====
var DEPARTURE_DATE = new Date('2026-09-25T21:30:00+08:00'); // HKT
function updateCountdown() {
  var now = new Date();
  var diff = DEPARTURE_DATE - now;
  var el = document.getElementById('cd-count');
  if (!el) return;
  if (diff <= 0) {
    el.innerHTML = '<span style="color:var(--accent-2)">✈ 已出发</span>';
    return;
  }
  var d = Math.floor(diff / 86400000);
  var h = Math.floor((diff % 86400000) / 3600000);
  var m = Math.floor((diff % 3600000) / 60000);
  var s = Math.floor((diff % 60000) / 1000);
  el.innerHTML =
    '<span class="count">' + d + '</span><span class="unit">' + t('days') + '</span>' +
    '<span class="count">' + h + '</span><span class="unit">' + t('hours') + '</span>' +
    '<span class="count">' + m + '</span><span class="unit">' + t('minutes') + '</span>' +
    '<span class="count">' + s + '</span><span class="unit">' + t('seconds') + '</span>';
}

// ===== 双时钟 =====
function updateClocks() {
  var now = new Date();
  // Use UTC arithmetic (independent of local timezone).
  // Beijing time = UTC + 8
  var bj = new Date(now.getTime() + 8 * 3600 * 1000);
  // Italy time = UTC + 2 (CEST)
  var it = new Date(now.getTime() + 2 * 3600 * 1000);

  var pad = function(n) { return n < 10 ? '0' + n : '' + n; };
  function fmt(d) { return pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()); }
  function fmtDate(d) {
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    return d.getUTCFullYear() + '-' + months[d.getUTCMonth()] + '-' + pad(d.getUTCDate());
  }

  var bjEl = document.getElementById('clock-bj');
  var itEl = document.getElementById('clock-it');
  var bjDate = document.getElementById('date-bj');
  var itDate = document.getElementById('date-it');
  if (bjEl) bjEl.textContent = fmt(bj);
  if (itEl) itEl.textContent = fmt(it);
  if (bjDate) bjDate.textContent = fmtDate(bj);
  if (itDate) itDate.textContent = fmtDate(it);
}

// ===== 头图渲染 =====
function renderHero() {
  var hero = document.getElementById('hero');
  if (!hero) return;
  var isDark = currentTheme === 'dark';
  var html = '';
  html += '<svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">';
  html += '<defs>';
  html += '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">';
  if (isDark) {
    html += '<stop offset="0%" stop-color="#0F1530"/>';
    html += '<stop offset="60%" stop-color="#2A3A6A"/>';
    html += '<stop offset="100%" stop-color="#0A0E22"/>';
  } else {
    html += '<stop offset="0%" stop-color="#FFC9A0"/>';
    html += '<stop offset="50%" stop-color="#FFD8B4"/>';
    html += '<stop offset="100%" stop-color="#F7B894"/>';
  }
  html += '</linearGradient>';
  html += '<radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">';
  html += '<stop offset="0%" stop-color="#FFFAE6"/>';
  html += '<stop offset="100%" stop-color="#FFFAE6" stop-opacity="0"/>';
  html += '</radialGradient>';
  html += '<radialGradient id="moon" cx="0.5" cy="0.5" r="0.5">';
  html += '<stop offset="0%" stop-color="#F0F0F8"/>';
  html += '<stop offset="100%" stop-color="#A0A0C0" stop-opacity="0.4"/>';
  html += '</radialGradient>';
  html += '</defs>';
  html += '<rect width="800" height="280" fill="url(#sky)"/>';
  if (isDark) {
    html += '<circle cx="650" cy="80" r="40" fill="url(#moon)"/>';
    html += '<circle cx="650" cy="80" r="22" fill="#F5F5F0"/>';
    html += '<circle cx="100" cy="40" r="1.5" fill="#FFF" opacity="0.8"/>';
    html += '<circle cx="220" cy="60" r="1" fill="#FFF" opacity="0.6"/>';
    html += '<circle cx="350" cy="30" r="1.2" fill="#FFF" opacity="0.7"/>';
    html += '<circle cx="500" cy="50" r="0.8" fill="#FFF" opacity="0.5"/>';
    html += '<circle cx="750" cy="30" r="1" fill="#FFF" opacity="0.6"/>';
  } else {
    html += '<circle cx="650" cy="80" r="45" fill="url(#sun)"/>';
    html += '<circle cx="650" cy="80" r="30" fill="#FFFAE6"/>';
  }
  // 云
  if (isDark) {
    html += '<ellipse cx="120" cy="100" rx="60" ry="20" fill="#3A4060" opacity="0.6"/>';
    html += '<ellipse cx="500" cy="120" rx="80" ry="22" fill="#3A4060" opacity="0.5"/>';
  } else {
    html += '<ellipse cx="100" cy="90" rx="55" ry="18" fill="#FFFFFF" opacity="0.75"/>';
    html += '<ellipse cx="120" cy="80" rx="40" ry="14" fill="#FFFFFF" opacity="0.7"/>';
    html += '<ellipse cx="500" cy="110" rx="70" ry="20" fill="#FFFFFF" opacity="0.7"/>';
    html += '<ellipse cx="540" cy="100" rx="40" ry="12" fill="#FFFFFF" opacity="0.6"/>';
  }
  // 山丘
  html += '<path d="M 0 220 Q 200 180 400 200 T 800 195 L 800 280 L 0 280 Z" fill="' + (isDark ? '#2A3050' : '#D8B69A') + '"/>';
  html += '<path d="M 0 240 Q 300 220 600 235 T 800 230 L 800 280 L 0 280 Z" fill="' + (isDark ? '#1F2540' : '#C49A78') + '"/>';

  // ===== 比萨斜塔 =====
  html += '<g transform="translate(120, 130)"><g transform="rotate(-8)">';
  html += '<rect x="-32" y="100" width="64" height="10" fill="' + (isDark ? '#3D3520' : '#8B7355') + '"/>';
  html += '<rect x="-25" y="-30" width="50" height="130" fill="' + (isDark ? '#5C5240' : '#D4C2A8') + '" stroke="' + (isDark ? '#7B6B50' : '#A8957A') + '" stroke-width="1"/>';
  for (var i = 0; i < 6; i++) {
    html += '<line x1="-25" y1="' + (-25 + i * 22) + '" x2="25" y2="' + (-25 + i * 22) + '" stroke="' + (isDark ? '#7B6B50' : '#A8957A') + '" stroke-width="0.8"/>';
  }
  for (var j = 0; j < 6; j++) {
    html += '<rect x="-6" y="' + (-22 + j * 22) + '" width="12" height="14" fill="' + (isDark ? '#1F2540' : '#5A4D3A') + '" rx="2"/>';
  }
  html += '<rect x="-15" y="-45" width="30" height="15" fill="' + (isDark ? '#5C5240' : '#D4C2A8') + '"/>';
  html += '<circle cx="0" cy="-50" r="6" fill="' + (isDark ? '#7B6B50' : '#A8957A') + '"/>';
  html += '</g></g>';

  // ===== 葡萄藤 + 红酒 =====
  html += '<g transform="translate(310, 180)">';
  html += '<rect x="-3" y="0" width="6" height="40" fill="' + (isDark ? '#2D2010' : '#6B3818') + '"/>';
  html += '<rect x="-12" y="-2" width="24" height="14" rx="3" fill="' + (isDark ? '#3D2515' : '#8B4513') + '" stroke="' + (isDark ? '#1A0E08' : '#5A2C0C') + '" stroke-width="1"/>';
  html += '<rect x="-9" y="-5" width="18" height="6" rx="1" fill="' + (isDark ? '#5C3820' : '#A0522D') + '"/>';
  // 葡萄串
  for (var gi = 0; gi < 6; gi++) {
    var gx = (gi % 3 - 1) * 8;
    var gy = -16 + Math.floor(gi / 3) * 8;
    html += '<circle cx="' + gx + '" cy="' + gy + '" r="5" fill="' + (isDark ? '#3D1850' : '#6F2D7B') + '"/>';
  }
  // 葡萄叶
  html += '<path d="M 0 -20 Q 15 -30 12 -15 Q 25 -20 22 -5 Q 18 -10 12 -10 Z" fill="' + (isDark ? '#1F4020' : '#4D7C4D') + '"/>';
  html += '</g>';

  // ===== 意面 + 餐叉 =====
  html += '<g transform="translate(440, 195)">';
  html += '<ellipse cx="0" cy="0" rx="40" ry="14" fill="' + (isDark ? '#3D3520' : '#FFFFFF') + '" stroke="' + (isDark ? '#7B6B50' : '#A8957A') + '" stroke-width="1.5"/>';
  html += '<ellipse cx="0" cy="-2" rx="32" ry="9" fill="' + (isDark ? '#E5C490' : '#FFD8B4') + '"/>';
  // 意面线条
  for (var n = 0; n < 6; n++) {
    var nxo = (n - 2.5) * 8;
    html += '<path d="M ' + nxo + ' -5 Q ' + (nxo + 3) + ' -1 ' + nxo + ' 3" stroke="' + (isDark ? '#A08550' : '#D4A857') + '" stroke-width="1" fill="none"/>';
  }
  // 番茄
  html += '<circle cx="-18" cy="-3" r="3" fill="' + (isDark ? '#A03020' : '#C8533F') + '"/>';
  html += '<circle cx="20" cy="-2" r="3" fill="' + (isDark ? '#A03020' : '#C8533F') + '"/>';
  // 餐叉
  html += '<rect x="-3" y="20" width="2" height="40" fill="' + (isDark ? '#A0A0A8' : '#808088') + '"/>';
  html += '<rect x="-7" y="20" width="2" height="14" fill="' + (isDark ? '#A0A0A8' : '#808088') + '"/>';
  html += '<rect x="-1" y="20" width="2" height="14" fill="' + (isDark ? '#A0A0A8' : '#808088') + '"/>';
  html += '<rect x="5" y="20" width="2" height="14" fill="' + (isDark ? '#A0A0A8' : '#808088') + '"/>';
  html += '</g>';

  // ===== 古罗马柱 =====
  html += '<g transform="translate(560, 100)">';
  // 柱顶
  html += '<rect x="-22" y="-10" width="44" height="8" fill="' + (isDark ? '#5C5240' : '#D4C2A8') + '"/>';
  html += '<rect x="-20" y="-2" width="40" height="6" fill="' + (isDark ? '#7B6B50' : '#A8957A') + '"/>';
  // 柱身（凹槽）
  for (var k = 0; k < 4; k++) {
    var kx = (k - 1.5) * 10;
    html += '<rect x="' + (kx - 4) + '" y="4" width="8" height="110" fill="' + (isDark ? '#6B5D48' : '#E0D2B6') + '"/>';
  }
  // 柱基
  html += '<rect x="-24" y="114" width="48" height="10" fill="' + (isDark ? '#5C5240' : '#D4C2A8') + '"/>';
  html += '<rect x="-28" y="124" width="56" height="10" fill="' + (isDark ? '#3D3520' : '#8B7355') + '"/>';
  html += '</g>';

  // ===== 咖啡杯 =====
  html += '<g transform="translate(680, 200)">';
  html += '<ellipse cx="0" cy="20" rx="22" ry="6" fill="' + (isDark ? '#3D3520' : '#8B7355') + '"/>';
  html += '<path d="M -18 -10 L -14 16 Q -14 20 -8 20 L 8 20 Q 14 20 14 16 L 18 -10 Z" fill="' + (isDark ? '#E5E0D5' : '#FFFFFF') + '" stroke="' + (isDark ? '#7B6B50' : '#A8957A') + '" stroke-width="1"/>';
  html += '<ellipse cx="0" cy="-10" rx="18" ry="4" fill="' + (isDark ? '#3D2515' : '#5A2C1A') + '"/>';
  html += '<path d="M 14 -6 Q 22 -4 22 4 Q 22 12 14 12" fill="none" stroke="' + (isDark ? '#7B6B50' : '#A8957A') + '" stroke-width="1.5"/>';
  // 蒸汽
  html += '<path d="M -6 -16 Q -4 -22 -6 -28 Q -8 -34 -6 -40" fill="none" stroke="' + (isDark ? '#FFFFFF' : '#FFFFFF') + '" stroke-width="1.5" opacity="0.4"/>';
  html += '<path d="M 0 -16 Q 2 -22 0 -28 Q -2 -34 0 -40" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.4"/>';
  html += '<path d="M 6 -16 Q 8 -22 6 -28 Q 4 -34 6 -40" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.4"/>';
  html += '</g>';

  // ===== 两只小动物 (白天：站立 + 玩耍；夜晚：蜷睡 + ZZZ) =====
  if (isDark) {
    // 夜晚：蜷睡的小猫 + ZZZ
    // 小猫 1
    html += '<g transform="translate(250, 230)">';
    html += '<ellipse cx="0" cy="10" rx="22" ry="10" fill="' + (isDark ? '#5C5240' : '#9C7A56') + '"/>';
    html += '<circle cx="-15" cy="2" r="10" fill="' + (isDark ? '#5C5240' : '#9C7A56') + '"/>';
    // 耳朵
    html += '<path d="M -22 -4 L -18 -10 L -16 -3 Z" fill="' + (isDark ? '#5C5240' : '#9C7A56') + '"/>';
    html += '<path d="M -12 -4 L -8 -10 L -6 -3 Z" fill="' + (isDark ? '#5C5240' : '#9C7A56') + '"/>';
    // 眼睛（闭合）
    html += '<path d="M -19 2 Q -17 4 -15 2" stroke="#3D2A18" stroke-width="1" fill="none"/>';
    // 鼻子
    html += '<circle cx="-19" cy="5" r="1" fill="#3D2A18"/>';
    // 尾巴
    html += '<path d="M 22 5 Q 30 -2 28 -8" stroke="' + (isDark ? '#5C5240' : '#9C7A56') + '" stroke-width="3" fill="none"/>';
    html += '</g>';
    // 小猫 2
    html += '<g transform="translate(380, 235)">';
    html += '<ellipse cx="0" cy="8" rx="18" ry="8" fill="' + (isDark ? '#7A6850' : '#B89A7C') + '"/>';
    html += '<circle cx="-12" cy="2" r="8" fill="' + (isDark ? '#7A6850' : '#B89A7C') + '"/>';
    html += '<path d="M -18 -3 L -14 -8 L -12 -2 Z" fill="' + (isDark ? '#7A6850' : '#B89A7C') + '"/>';
    html += '<path d="M -10 -3 L -6 -8 L -4 -2 Z" fill="' + (isDark ? '#7A6850' : '#B89A7C') + '"/>';
    html += '<path d="M -15 2 Q -13 4 -11 2" stroke="#3D2A18" stroke-width="1" fill="none"/>';
    html += '<circle cx="-15" cy="4" r="1" fill="#3D2A18"/>';
    html += '</g>';
    // ZZZ
    html += '<text x="270" y="200" font-size="18" font-weight="700" fill="#E0E8FF" font-family="serif">Z</text>';
    html += '<text x="285" y="190" font-size="14" font-weight="700" fill="#E0E8FF" font-family="serif">Z</text>';
    html += '<text x="297" y="182" font-size="10" font-weight="700" fill="#E0E8FF" font-family="serif">z</text>';
    html += '<text x="395" y="205" font-size="14" font-weight="700" fill="#E0E8FF" font-family="serif">Z</text>';
    html += '<text x="408" y="195" font-size="10" font-weight="700" fill="#E0E8FF" font-family="serif">z</text>';
  } else {
    // 白天：站立的小猫 + 小狗
    // 小狗
    html += '<g transform="translate(220, 220)">';
    html += '<ellipse cx="0" cy="14" rx="20" ry="8" fill="' + (isDark ? '#5C5240' : '#A07852') + '"/>';
    html += '<circle cx="-12" cy="6" r="9" fill="' + (isDark ? '#5C5240' : '#A07852') + '"/>';
    html += '<ellipse cx="-19" cy="-2" rx="3" ry="6" fill="' + (isDark ? '#4A3D2A' : '#8B6840') + '" transform="rotate(-20 -19 -2)"/>';
    html += '<ellipse cx="-9" cy="-2" rx="3" ry="6" fill="' + (isDark ? '#4A3D2A' : '#8B6840') + '" transform="rotate(20 -9 -2)"/>';
    html += '<circle cx="-15" cy="6" r="1" fill="#3D2A18"/>';
    html += '<ellipse cx="-15" cy="9" rx="2" ry="1" fill="#3D2A18"/>';
    html += '<path d="M 19 12 Q 26 6 22 0" stroke="' + (isDark ? '#5C5240' : '#A07852') + '" stroke-width="3" fill="none"/>';
    html += '</g>';
    // 小猫
    html += '<g transform="translate(380, 220)">';
    html += '<ellipse cx="0" cy="12" rx="16" ry="7" fill="' + (isDark ? '#5C5240' : '#7A6850') + '"/>';
    html += '<circle cx="-10" cy="4" r="8" fill="' + (isDark ? '#5C5240' : '#7A6850') + '"/>';
    html += '<path d="M -15 -3 L -12 -8 L -10 -3 Z" fill="' + (isDark ? '#5C5240' : '#7A6850') + '"/>';
    html += '<path d="M -8 -3 L -5 -8 L -3 -3 Z" fill="' + (isDark ? '#5C5240' : '#7A6850') + '"/>';
    html += '<circle cx="-13" cy="4" r="1" fill="#3D2A18"/>';
    html += '<circle cx="-7" cy="4" r="1" fill="#3D2A18"/>';
    html += '<path d="M -12 7 Q -10 9 -8 7" stroke="#3D2A18" stroke-width="0.5" fill="none"/>';
    html += '<path d="M 15 8 Q 22 4 20 -2" stroke="' + (isDark ? '#5C5240' : '#7A6850') + '" stroke-width="3" fill="none"/>';
    html += '</g>';
  }

  // 植被 - 前景
  html += '<path d="M 0 260 Q 60 245 100 260 Q 140 240 180 258 Q 240 248 290 260 Q 340 240 400 260 Q 460 250 520 258 Q 580 245 650 260 Q 720 250 800 258 L 800 280 L 0 280 Z" fill="' + (isDark ? '#1A2A18' : '#5A7A52') + '" opacity="0.85"/>';
  // 灌木
  for (var b = 0; b < 8; b++) {
    var bx = b * 100 + 30;
    html += '<circle cx="' + bx + '" cy="262" r="14" fill="' + (isDark ? '#1A2A18' : '#5A7A52') + '" opacity="0.7"/>';
  }
  html += '</svg>';

  html += '<div class="hero-title">';
  html += '<h1>' + escapeHtml(t('appName')) + '</h1>';
  html += '<p>' + escapeHtml(t('tagline')) + '</p>';
  html += '</div>';
  hero.innerHTML = html;
}

function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ===== Web Mercator 投影 =====
function lngLatToXY(lng, lat, lng0, lat0, scale, offsetX, offsetY) {
  // Web Mercator 简化版
  var x = lng * scale + offsetX;
  var y = -lat * scale + offsetY; // 简化：使用线性缩放
  return [x, y];
}

// ===== 地图渲染（fit + 标点 + 路线） =====
function fit(keys, W, H, pad, extra, cap) {
  pad = pad || 60; cap = cap || 3;
  var pts = [];
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var loc = LOCATIONS[k];
    if (!loc) continue;
    pts.push([loc.lat, loc.lng]);
  }
  if (extra) {
    for (var j = 0; j < extra.length; j++) {
      pts.push(extra[j]);
    }
  }
  if (pts.length === 0) {
    return {scale: 1, offX: 0, offY: 0, minLat: 0, maxLat: 0, minLng: 0, maxLng: 0};
  }
  var minLat = pts[0][0], maxLat = pts[0][0], minLng = pts[0][1], maxLng = pts[0][1];
  for (var i2 = 1; i2 < pts.length; i2++) {
    if (pts[i2][0] < minLat) minLat = pts[i2][0];
    if (pts[i2][0] > maxLat) maxLat = pts[i2][0];
    if (pts[i2][1] < minLng) minLng = pts[i2][1];
    if (pts[i2][1] > maxLng) maxLng = pts[i2][1];
  }
  var spanLat = Math.max(maxLat - minLat, 0.5);
  var spanLng = Math.max(maxLng - minLng, 0.5);
  var availW = W - 2 * pad;
  var availH = H - 2 * pad;
  var scaleLng = availW / spanLng;
  var scaleLat = availH / spanLat;
  var scale = Math.min(scaleLng, scaleLat, 80 * cap); // 最大 80 px/度
  var centerLat = (minLat + maxLat) / 2;
  var centerLng = (minLng + maxLng) / 2;
  var offX = W / 2 - centerLng * scale;
  var offY = H / 2 + centerLat * scale;
  return {scale: scale, offX: offX, offY: offY, minLat: minLat, maxLat: maxLat, minLng: minLng, maxLng: maxLng};
}

function proj(lng, lat, fitObj) {
  // 渲染时把数据坐标投影到屏幕（使用线性近似）
  var x = lng * fitObj.scale + fitObj.offX;
  var y = -lat * fitObj.scale + fitObj.offY;
  return [x, y];
}

var currentMapMode = 'overview'; // overview | day-1 | day-2 ... | all
var currentDayIndex = 0;

function renderMap() {
  var wrap = document.getElementById('map-svg-wrap');
  if (!wrap) return;
  var W = wrap.clientWidth || 600;
  var H = wrap.clientHeight || 450;

  var keys = [];
  var extra = [];
  var centerLat = 41.9, centerLng = 12.5;

  if (currentMapMode === 'overview') {
    // 总览：只显示大地点
    keys = ['milano-malpensa', 'brixen', 'seceda', 'alpe-di-siusi', 'venice-mestre', 'venice-rialto', 'florence-smn', 'uffizi', 'duomo', 'rome-termini', 'vatican-museum', 'st-peter', 'colosseum', 'anacapri', 'capri-port', 'augustus-garden'];
    extra = [[46.7167, 11.6580, 'tag'], [40.5474, 14.2397, 'tag']]; // 多洛米蒂 + 卡普里
    centerLat = 43.0; centerLng = 12.0;
  } else if (currentMapMode === 'all') {
    // 显示全部地点：所有 LOCATIONS
    keys = Object.keys(LOCATIONS);
    extra = [];
    centerLat = 43.0; centerLng = 12.0;
  } else if (currentMapMode.indexOf('day-') === 0) {
    // 单日视图
    var dayNum = parseInt(currentMapMode.split('-')[1], 10);
    var day = ITINERARY[dayNum - 1];
    keys = [];
    for (var i = 0; i < day.items.length; i++) {
      if (day.items[i].spot && keys.indexOf(day.items[i].spot) === -1) {
        keys.push(day.items[i].spot);
      }
    }
    centerLat = day.centerLat; centerLng = day.centerLng;
  }

  var fitObj = fit(keys, W, H, 60, extra, 12);

  // 渲染 SVG
  var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';
  // 背景：海
  svg += '<rect width="' + W + '" height="' + H + '" fill="var(--sea)"/>';

  // 意大利国境轮廓 (简化版)
  // 把国境坐标转为屏幕坐标
  function ptsToPath(poly) {
    var d = "";
    for (var i = 0; i < poly.length; i++) {
      var p = proj(poly[i][0], poly[i][1], fitObj);
      d += (i === 0 ? "M " : "L ") + p[0] + " " + p[1] + " ";
    }
    d += "Z";
    return d;
  }
  if (typeof ITALY_OUTLINE !== 'undefined') {
    svg += '<path d="' + ptsToPath(ITALY_OUTLINE) + '" class="land-fill"/>';
  }
  if (typeof SICILY_OUTLINE !== 'undefined') {
    svg += '<path d="' + ptsToPath(SICILY_OUTLINE) + '" class="land-fill land-fill-2"/>';
  }
  if (typeof SARDINIA_OUTLINE !== 'undefined') {
    svg += '<path d="' + ptsToPath(SARDINIA_OUTLINE) + '" class="land-fill land-fill-2"/>';
  }

  // 绘制路线（如果是单日视图）
  if (currentMapMode.indexOf('day-') === 0) {
    var dayNum2 = parseInt(currentMapMode.split('-')[1], 10);
    var day2 = ITINERARY[dayNum2 - 1];
    var pts = [];
    for (var ii = 0; ii < day2.items.length; ii++) {
      if (day2.items[ii].spot) {
        var loc = LOCATIONS[day2.items[ii].spot];
        if (loc) pts.push([loc.lat, loc.lng]);
      }
    }
    if (pts.length > 1) {
      var pathD = "";
      for (var pi = 0; pi < pts.length; pi++) {
        var pp = proj(pts[pi][1], pts[pi][0], fitObj);
        pathD += (pi === 0 ? "M " : "L ") + pp[0] + " " + pp[1] + " ";
      }
      svg += '<path d="' + pathD + '" class="route-line"/>';
    }
  }

  // 绘制所有 LOCATIONS 作为标记
  var allKeys = (currentMapMode === 'all') ? Object.keys(LOCATIONS) : keys;
  for (var ki = 0; ki < allKeys.length; ki++) {
    var kk = allKeys[ki];
    var loc = LOCATIONS[kk];
    if (!loc) continue;
    if (isNaN(loc.lat) || isNaN(loc.lng)) continue; // 防 NaN
    var p = proj(loc.lng, loc.lat, fitObj);
    if (isNaN(p[0]) || isNaN(p[1])) continue;
    var kclass = 'spot-dot kind-' + (loc.kind || 'default');
    svg += '<g class="' + kclass + '" data-spot="' + escapeHtml(kk) + '" transform="translate(' + p[0] + ',' + p[1] + ')">';
    svg += '<circle class="dot" r="5"/>';
    if (currentMapMode === 'all' || currentMapMode.indexOf('day-') === 0) {
      svg += '<text class="label" y="-8">' + escapeHtml(loc.name || '') + '</text>';
    }
    svg += '</g>';
  }

  svg += '</svg>';
  wrap.innerHTML = svg;

  // 绑定点击事件
  bindMapClicks();
}

function bindMapClicks() {
  var wrap = document.getElementById('map-svg-wrap');
  if (!wrap) return;
  var dots = wrap.querySelectorAll('.spot-dot');
  for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function(e) {
      var spotId = this.getAttribute('data-spot');
      showSpotCard(spotId, this);
    });
  }
}

function showSpotCard(spotId, anchor) {
  var info = SPOTS_INFO[spotId];
  if (!info) return;
  var d = info[currentLang] || info.zh;
  if (currentLang === 'zht') {
    d = info.zh;
  }
  var loc = LOCATIONS[spotId];
  if (!loc) return;

  // 创建小卡片
  var existing = document.querySelector('.spot-card');
  if (existing) existing.remove();
  var card = document.createElement('div');
  card.className = 'spot-card';
  var hStr = t('appName');
  card.innerHTML = '<p class="sc-title">' + escapeHtml(d.name) + '</p>' +
    '<p class="sc-cat">' + escapeHtml(d.cat) + '</p>' +
    '<p style="margin-top:6px;font-size:11px;color:var(--ink-light)">' + escapeHtml(d.reason) + '</p>' +
    '<button class="sc-btn" data-loc="' + spotId + '">' + (currentLang === 'en' ? 'Open detail →' : '查看详情 →') + '</button>' +
    '<button class="sc-btn" style="margin-left:4px;border-color:var(--accent-2);color:var(--accent-2)" data-nav="' + loc.lat + ',' + loc.lng + '">' + (currentLang === 'en' ? 'Open Map ↗' : '导航 ↗') + '</button>';
  // 定位
  var wrap2 = document.getElementById('map-svg-wrap');
  var rect = anchor.getBoundingClientRect();
  var wrapRect = wrap2.getBoundingClientRect();
  card.style.left = (rect.left - wrapRect.left + rect.width/2 - 130) + 'px';
  card.style.top = (rect.top - wrapRect.top - 90) + 'px';
  wrap2.appendChild(card);

  // 绑定按钮
  card.querySelector('.sc-btn[data-loc]').addEventListener('click', function(e) {
    e.stopPropagation();
    openModal(this.getAttribute('data-loc'));
    card.remove();
  });
  card.querySelector('.sc-btn[data-nav]').addEventListener('click', function(e) {
    e.stopPropagation();
    var coords = this.getAttribute('data-nav').split(',');
    var url = 'https://www.google.com/maps/search/?api=1&query=' + coords[0] + ',' + coords[1];
    window.open(url, '_blank');
  });

  // 自动消失
  setTimeout(function() { if (card.parentNode) card.remove(); }, 6000);
}

// ===== 介绍卡片弹窗 =====
function openModal(spotId) {
  var info = SPOTS_INFO[spotId];
  if (!info) return;
  var d = info[currentLang] || info.zh;
  if (currentLang === 'zht') d = info.zh;
  var loc = LOCATIONS[spotId];
  if (!loc) return;

  var html = '';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-head">';
  html += '<button class="modal-close" onclick="closeModal()">×</button>';
  html += '<h3 class="modal-title">' + escapeHtml(d.name) + '</h3>';
  html += '<p class="modal-subtitle">' + escapeHtml(d.cat) + ' · ' + loc.lat.toFixed(4) + '°, ' + loc.lng.toFixed(4) + '°</p>';
  html += '<a class="modal-loclink" href="https://www.google.com/maps/search/?api=1&query=' + loc.lat + ',' + loc.lng + '" target="_blank">📍 ' + (currentLang === 'en' ? 'Open in Google Maps' : '在 Google 地图中打开') + '</a>';
  html += '</div>';
  html += '<div class="modal-body">';
  html += '<div class="modal-section"><h4>' + (currentLang === 'en' ? 'Why visit' : '推荐理由') + '</h4><p>' + escapeHtml(d.reason) + '</p></div>';
  html += '<div class="modal-section"><h4>' + (currentLang === 'en' ? 'Must see' : '必看点') + '</h4><ul>';
  for (var i = 0; i < d.must.length; i++) html += '<li>' + escapeHtml(d.must[i]) + '</li>';
  html += '</ul></div>';
  html += '<div class="modal-section"><h4>' + (currentLang === 'en' ? 'Tips' : '体验建议') + '</h4><ul>';
  for (var k = 0; k < d.tips.length; k++) html += '<li>' + escapeHtml(d.tips[k]) + '</li>';
  html += '</ul></div>';
  html += '</div>';
  html += '</div>';
  var bg = document.getElementById('modal-bg');
  if (!bg) return;
  bg.innerHTML = html;
  bg.classList.add('show');
}

function closeModal() {
  var bg = document.getElementById('modal-bg');
  if (bg) bg.classList.remove('show');
}

// ===== 行程时间轴渲染 =====
function renderItinerary() {
  var cont = document.getElementById('itinerary-list');
  if (!cont) return;
  var html = '';
  for (var i = 0; i < ITINERARY.length; i++) {
    var d = ITINERARY[i];
    html += '<div class="day-card" data-day="' + d.day + '">';
    html += '<div class="day-head" data-toggle="' + d.day + '">';
    html += '<div class="day-num">D' + d.day + '</div>';
    html += '<div class="day-info">';
    html += '<p class="day-title">' + escapeHtml(t('dayOfN', {n: d.day})) + ' · ' + escapeHtml(d.title) + '</p>';
    html += '<p class="day-meta"><span>' + escapeHtml(d.date) + '</span><span>·</span><span>' + escapeHtml(d.weekday) + '</span><span>·</span><span>' + escapeHtml(d.cityLabel) + '</span></p>';
    html += '</div>';
    html += '<div class="day-progress" data-progress="' + d.day + '">0<span class="total">/' + d.items.length + '</span></div>';
    html += '<div class="day-toggle">▼</div>';
    html += '</div>';
    html += '<div class="day-body">';
    // 住宿
    if (d.stay && STAY_INFO[d.stay]) {
      var stay = STAY_INFO[d.stay][currentLang] || STAY_INFO[d.stay].zh;
      if (currentLang === 'zht') stay = STAY_INFO[d.stay].zh;
      html += '<div class="day-stay">🏨 <strong>' + t('stayHotel') + '：</strong>' + escapeHtml(stay.name) + ' · ' + escapeHtml(stay.nights) + '</div>';
    }
    // 当天小地图
    html += '<div class="day-map" id="day-map-' + d.day + '"></div>';
    // 行程项
    for (var j = 0; j < d.items.length; j++) {
      var it = d.items[j];
      html += '<div class="item" data-day="' + d.day + '" data-idx="' + j + '">';
      html += '<div class="item-time">' + escapeHtml(it.time || '') + '<span class="zone">' + escapeHtml(it.zone || '') + '</span></div>';
      html += '<div class="item-body">';
      var titleHtml = escapeHtml(it.title || '');
      if (it.spot && SPOTS_INFO[it.spot]) {
        var sd = SPOTS_INFO[it.spot][currentLang] || SPOTS_INFO[it.spot].zh;
        if (currentLang === 'zht') sd = SPOTS_INFO[it.spot].zh;
        titleHtml = '<span class="spot-link" data-spot="' + escapeHtml(it.spot) + '" style="cursor:pointer;color:var(--accent)">' + escapeHtml(it.title || '') + '</span>';
      }
      html += '<span class="item-title">' + titleHtml + '</span>';
      html += '<span class="item-rating">';
      for (var si = 1; si <= 5; si++) {
        html += '<button type="button" class="rating-btn" data-day="' + d.day + '" data-idx="' + j + '" data-val="' + si + '" title="' + escapeHtml(t('rateTitle', {n: si})) + '">★</button>';
      }
      html += '<button class="check-btn" data-day="' + d.day + '" data-idx="' + j + '">' + escapeHtml(t('checkIn')) + '</button>';
      html += '</span>';
      if (it.note) html += '<p class="item-note">' + escapeHtml(it.note) + '</p>';
      if (it.tags && it.tags.length) {
        html += '<div class="item-tags">';
        for (var t2 = 0; t2 < it.tags.length; t2++) {
          var tag = it.tags[t2];
          html += '<span class="tag tag-' + escapeHtml(tag) + '">' + escapeHtml(getTagLabel(tag)) + '</span>';
        }
        html += '</div>';
      }
      if (it.transit) {
        html += '<div class="transit-capsule">' + escapeHtml(t('transit', {n: it.transit})) + '</div>';
      }
      html += '</div></div>';
    }
    // transit note
    if (d.transitNote) {
      html += '<div class="day-stay" style="border-color:var(--accent-3);color:var(--ink-soft)">🚆 ' + escapeHtml(d.transitNote) + '</div>';
    }
    html += '</div></div>';
  }
  cont.innerHTML = html;

  // 绑定折叠
  var heads = cont.querySelectorAll('.day-head');
  for (var hi = 0; hi < heads.length; hi++) {
    (function(head) {
      head.addEventListener('click', function() {
        var card = head.parentNode;
        card.classList.toggle('open');
        // 渲染当天小地图
        if (card.classList.contains('open')) {
          var dayNum = parseInt(head.getAttribute('data-toggle'), 10);
          renderDayMap(dayNum);
        }
      });
    })(heads[hi]);
  }

  // 恢复评分/打卡状态
  refreshAllProgress();
  refreshChecks();
}

function renderDayMap(dayNum) {
  var day = ITINERARY[dayNum - 1];
  if (!day) return;
  var wrap = document.getElementById('day-map-' + dayNum);
  if (!wrap) return;
  var W = wrap.clientWidth || 600;
  var H = 90;
  var keys = [];
  for (var i = 0; i < day.items.length; i++) {
    if (day.items[i].spot && keys.indexOf(day.items[i].spot) === -1) {
      keys.push(day.items[i].spot);
    }
  }
  if (keys.length === 0) { wrap.innerHTML = ''; return; }
  var fitObj = fit(keys, W, H, 25, [], 6);
  function proj2(lng, lat) {
    return proj(lng, lat, fitObj);
  }
  var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '">';
  svg += '<rect width="' + W + '" height="' + H + '" fill="var(--sea)"/>';
  // 路线
  var pts = [];
  for (var j = 0; j < day.items.length; j++) {
    if (day.items[j].spot) {
      var loc = LOCATIONS[day.items[j].spot];
      if (loc) pts.push([loc.lat, loc.lng]);
    }
  }
  if (pts.length > 1) {
    var pd = '';
    for (var p = 0; p < pts.length; p++) {
      var pp = proj2(pts[p][1], pts[p][0]);
      pd += (p === 0 ? 'M ' : 'L ') + pp[0] + ' ' + pp[1] + ' ';
    }
    svg += '<path d="' + pd + '" class="route-line" stroke-dasharray="3 3" stroke-width="1.5"/>';
  }
  // 点
  for (var k = 0; k < keys.length; k++) {
    var kk = keys[k];
    var loc = LOCATIONS[kk];
    if (!loc) continue;
    if (isNaN(loc.lat) || isNaN(loc.lng)) continue;
    var p = proj2(loc.lng, loc.lat);
    if (isNaN(p[0]) || isNaN(p[1])) continue;
    var kclass = 'spot-dot kind-' + (loc.kind || 'default');
    svg += '<g class="' + kclass + '" data-spot="' + escapeHtml(kk) + '" transform="translate(' + p[0] + ',' + p[1] + ')">';
    svg += '<circle class="dot" r="3.5"/>';
    svg += '</g>';
  }
  svg += '</svg>';
  wrap.innerHTML = svg;
  var dots = wrap.querySelectorAll('.spot-dot');
  for (var di = 0; di < dots.length; di++) {
    dots[di].addEventListener('click', function(e) {
      var spotId = this.getAttribute('data-spot');
      openModal(spotId);
    });
  }
}

// ===== 评分 / 打卡 状态管理 =====
// 评分为 1-5 星整数，0 表示未评分（不再区分男/女）
function getRating(day, idx) {
  var v = ratings[day + '_' + idx];
  if (Array.isArray(v)) return (v[0] || v[1] || 0); // 兼容旧版 [男,女] 数组数据
  return (typeof v === 'number' && v > 0) ? v : 0;
}
function setRating(day, idx, val) {
  var key = day + '_' + idx;
  if (val > 0) ratings[key] = val;
  else delete ratings[key];
  try { localStorage.setItem('rating', JSON.stringify(ratings)); } catch(e) {}
}

function getCheck(day, idx) {
  return !!checks[day + '_' + idx];
}
function setCheck(day, idx, val) {
  var key = day + '_' + idx;
  if (val) {
    checks[key] = true;
  } else {
    delete checks[key];
  }
  try { localStorage.setItem('checks', JSON.stringify(checks)); } catch(e) {}
}

// ===== 行李清单打卡状态 =====
var packChecks = {};
try {
  var savedP = localStorage.getItem('packChecks');
  if (savedP) packChecks = JSON.parse(savedP);
} catch(e) { packChecks = {}; }

function getPackingCheck(catIdx, itemIdx) {
  return !!(packChecks[catIdx + '_' + itemIdx]);
}
function setPackingCheck(catIdx, itemIdx, val) {
  var key = catIdx + '_' + itemIdx;
  if (val) packChecks[key] = true;
  else delete packChecks[key];
  try { localStorage.setItem('packChecks', JSON.stringify(packChecks)); } catch(e) {}
}

function refreshAllProgress() {
  for (var d = 1; d <= ITINERARY.length; d++) {
    refreshDayProgress(d);
  }
}
function refreshDayProgress(dayNum) {
  var day = ITINERARY[dayNum - 1];
  if (!day) return;
  var total = day.items.length;
  var done = 0;
  for (var i = 0; i < total; i++) {
    if (getCheck(dayNum, i)) done++;
  }
  var el = document.querySelector('[data-progress="' + dayNum + '"]');
  if (el) {
    el.innerHTML = done + '<span class="total">/' + total + '</span>';
  }
}
function refreshChecks() {
  var items = document.querySelectorAll('.item');
  for (var i = 0; i < items.length; i++) {
    var day = parseInt(items[i].getAttribute('data-day'), 10);
    var idx = parseInt(items[i].getAttribute('data-idx'), 10);
    if (getCheck(day, idx)) items[i].classList.add('checked');
    else items[i].classList.remove('checked');
    var btn = items[i].querySelector('.check-btn');
    if (btn) {
      if (getCheck(day, idx)) {
        btn.classList.add('checked');
        btn.textContent = t('checked');
      } else {
        btn.classList.remove('checked');
        btn.textContent = t('checkIn');
      }
    }
    var rv = getRating(day, idx);
    var stars = items[i].querySelectorAll('.rating-btn');
    for (var sb = 0; sb < stars.length; sb++) {
      var sv = parseInt(stars[sb].getAttribute('data-val'), 10);
      if (sv <= rv) stars[sb].classList.add('active');
      else stars[sb].classList.remove('active');
    }
  }
}

// ===== 待办 / 贴士 渲染 =====
// 注：交通票据 / 住宿 两个独立模块已按需求下线。
//     TICKETS / STAY_INFO 数据仍保留在 data.js，需要恢复时重新加上对应
//     <div class="section"> 容器即可（旧渲染逻辑见 git 历史）。
function renderSections() {
  // 待办
  var todoCont = document.getElementById('todo-list');
  if (todoCont) {
    var list = TODO_LIST[currentLang] || TODO_LIST.zh;
    var tdlHtml = '<ul style="list-style:none;padding:0;margin:0">';
    for (var ti = 0; ti < list.length; ti++) {
      tdlHtml += '<li class="list-item"><div class="bullet"></div><div>' + escapeHtml(list[ti]) + '</div></li>';
    }
    tdlHtml += '</ul>';
    todoCont.innerHTML = tdlHtml;
  }

  // 贴士
  var tipsCont = document.getElementById('tips-list');
  if (tipsCont) {
    var tipsList = TIPS_LIST[currentLang] || TIPS_LIST.zh;
    var tipsHtml = '<ul style="list-style:none;padding:0;margin:0">';
    for (var tp = 0; tp < tipsList.length; tp++) {
      tipsHtml += '<li class="list-item"><div class="bullet"></div><div>' + escapeHtml(tipsList[tp]) + '</div></li>';
    }
    tipsHtml += '</ul>';
    tipsCont.innerHTML = tipsHtml;
  }

  // 行李清单
  renderPackingList();
}

// ===== 行李清单渲染 =====
function renderPackingList() {
  var cont = document.getElementById('packing-list');
  if (!cont) return;
  var secTitle = document.getElementById('packing-section-title');
  var secSub = document.getElementById('packing-section-sub');
  if (secTitle) secTitle.textContent = t('packingTitle');
  if (secSub) secSub.textContent = t('packingSubtitle');

  var list = PACKING_LIST[currentLang] || PACKING_LIST.zh;
  var html = '<div class="packing-wrap">';
  var total = 0;
  var done = 0;

  // Flatten helper: 返回该分类下的全部 item，附 subIdx（若有）
  function flatten(cat) {
    if (cat.subcategories) {
      var out = [];
      for (var s = 0; s < cat.subcategories.length; s++) {
        var sub = cat.subcategories[s];
        for (var k = 0; k < sub.items.length; k++) {
          out.push({ text: sub.items[k], subName: sub.name });
        }
      }
      return out;
    }
    var out2 = [];
    for (var k2 = 0; k2 < cat.items.length; k2++) {
      out2.push({ text: cat.items[k2], subName: null });
    }
    return out2;
  }

  for (var ci = 0; ci < list.length; ci++) {
    var cat = list[ci];
    var flat = flatten(cat);
    var catDone = 0;

    var itemsHtml = '';
    if (cat.subcategories) {
      // 有子分组：按分组渲染
      var itemIdx = 0;
      for (var s = 0; s < cat.subcategories.length; s++) {
        var sub = cat.subcategories[s];
        itemsHtml += '<div class="pack-sub-head">' + escapeHtml(sub.name) + '</div>';
        for (var k = 0; k < sub.items.length; k++) {
          total++;
          var chk = getPackingCheck(ci, itemIdx);
          if (chk) { done++; catDone++; }
          itemsHtml += '<div class="pack-item' + (chk ? ' checked' : '') + '" data-cat="' + ci + '" data-item="' + itemIdx + '">';
          itemsHtml += '<button class="pack-check" data-cat="' + ci + '" data-item="' + itemIdx + '">' + (chk ? '✓' : '○') + '</button>';
          itemsHtml += '<span class="pack-text">' + escapeHtml(sub.items[k]) + '</span>';
          itemsHtml += '</div>';
          itemIdx++;
        }
      }
    } else {
      // 普通分类
      for (var k2 = 0; k2 < flat.length; k2++) {
        total++;
        var chk2 = getPackingCheck(ci, k2);
        if (chk2) { done++; catDone++; }
        itemsHtml += '<div class="pack-item' + (chk2 ? ' checked' : '') + '" data-cat="' + ci + '" data-item="' + k2 + '">';
        itemsHtml += '<button class="pack-check" data-cat="' + ci + '" data-item="' + k2 + '">' + (chk2 ? '✓' : '○') + '</button>';
        itemsHtml += '<span class="pack-text">' + escapeHtml(flat[k2].text) + '</span>';
        itemsHtml += '</div>';
      }
    }

    html += '<div class="pack-card" data-cat="' + ci + '">';
    html += '<div class="pack-head" data-toggle="' + ci + '">';
    html += '<span class="pack-title">' + escapeHtml(cat.category) + '</span>';
    html += '<span class="pack-progress">' + catDone + '/' + flat.length + '</span>';
    html += '<span class="pack-caret">▼</span>';
    html += '</div>';
    html += '<div class="pack-body" id="pack-body-' + ci + '">' + itemsHtml + '</div>';
    html += '</div>';
  }
  html += '</div>';
  html += '<div class="pack-total">' + t('packedTotal', { done: done, total: total }) + '</div>';
  cont.innerHTML = html;
}

// ===== 刷新行李清单状态 =====
function refreshPackingChecks() {
  var items = document.querySelectorAll('.pack-item');
  for (var i = 0; i < items.length; i++) {
    var ci = parseInt(items[i].getAttribute('data-cat'), 10);
    var ii = parseInt(items[i].getAttribute('data-item'), 10);
    var checked = getPackingCheck(ci, ii);
    var btn = items[i].querySelector('.pack-check');
    if (btn) btn.textContent = checked ? '✓' : '○';
    if (checked) items[i].classList.add('checked');
    else items[i].classList.remove('checked');
  }
  // refresh progress numbers
  renderPackingList();
}

// ===== 12 天地图缩放按钮 =====
function renderDayButtons() {
  var wrap = document.getElementById('day-buttons');
  if (!wrap) return;
  var html = '';
  for (var i = 0; i < ITINERARY.length; i++) {
    var day = ITINERARY[i];
    var dn = i + 1;
    var label = t('dayLabel', { n: dn });
    html += '<button class="day-btn" data-day="' + dn + '">' + label + ' · ' + escapeHtml(day.title || '') + '</button>';
  }
  wrap.innerHTML = html;
}

// ===== 主渲染 =====
function renderAll() {
  renderHero();
  updateCountdown();
  updateClocks();
  renderMap();
  renderDayButtons();
  renderItinerary();
  renderSections();
  refreshAllProgress();
  refreshChecks();
  refreshPackingChecks();

  // 更新地图按钮
  document.getElementById('map-title').textContent = t('overviewMap');

  // 更新 footer
  var f = document.querySelector('footer');
  if (f) f.textContent = t('footerNote');
}

// ===== 事件委托 =====
document.addEventListener('click', function(e) {
  var t2 = e.target;

  // 语言按钮
  if (t2.classList && t2.classList.contains('lang-btn')) {
    setLang(t2.getAttribute('data-lang'));
    return;
  }
  // 主题切换
  if (t2.classList && t2.classList.contains('theme-toggle')) {
    toggleTheme();
    return;
  }
  // 地图模式
  if (t2.classList && t2.classList.contains('map-mode-btn')) {
    var mode = t2.getAttribute('data-mode');
    if (mode === 'all') currentMapMode = 'all';
    else if (mode === 'overview') currentMapMode = 'overview';
    else if (mode === 'back') currentMapMode = 'overview';
    renderMap();
    // 更新按钮
    var mbtns = document.querySelectorAll('.map-mode-btn');
    for (var i = 0; i < mbtns.length; i++) mbtns[i].classList.remove('active');
    t2.classList.add('active');
    return;
  }
  // day 按钮
  if (t2.classList && t2.classList.contains('day-btn')) {
    currentMapMode = 'day-' + t2.getAttribute('data-day');
    renderMap();
    return;
  }
  // 打卡按钮
  if (t2.classList && t2.classList.contains('check-btn')) {
    var day = parseInt(t2.getAttribute('data-day'), 10);
    var idx = parseInt(t2.getAttribute('data-idx'), 10);
    var newVal = !getCheck(day, idx);
    setCheck(day, idx, newVal);
    var item = t2.closest('.item');
    if (item) {
      if (newVal) item.classList.add('checked');
      else item.classList.remove('checked');
    }
    if (newVal) { t2.textContent = t('checked'); t2.classList.add('checked'); }
    else { t2.textContent = t('checkIn'); t2.classList.remove('checked'); }
    refreshDayProgress(day);
    return;
  }
  // 评分按钮（1-5 星）
  if (t2.classList && t2.classList.contains('rating-btn')) {
    var day2 = parseInt(t2.getAttribute('data-day'), 10);
    var idx2 = parseInt(t2.getAttribute('data-idx'), 10);
    var val2 = parseInt(t2.getAttribute('data-val'), 10);
    var curR = getRating(day2, idx2);
    setRating(day2, idx2, curR === val2 ? 0 : val2);
    var stars2 = t2.parentNode.querySelectorAll('.rating-btn');
    var newR2 = getRating(day2, idx2);
    for (var s2 = 0; s2 < stars2.length; s2++) {
      var sv2 = parseInt(stars2[s2].getAttribute('data-val'), 10);
      if (sv2 <= newR2) stars2[s2].classList.add('active');
      else stars2[s2].classList.remove('active');
    }
    return;
  }
  // 介绍链接
  if (t2.classList && t2.classList.contains('spot-link')) {
    openModal(t2.getAttribute('data-spot'));
    return;
  }
  // 行李清单打卡
  if (t2.classList && t2.classList.contains('pack-check')) {
    var pc = parseInt(t2.getAttribute('data-cat'), 10);
    var pi = parseInt(t2.getAttribute('data-item'), 10);
    var newP = !getPackingCheck(pc, pi);
    setPackingCheck(pc, pi, newP);
    refreshPackingChecks();
    return;
  }
  // 行李清单分类折叠 - 整个 header 行都可点击
  var packHead = t2.classList && t2.classList.contains('pack-head') ? t2
                 : (t2.closest ? t2.closest('.pack-head') : null);
  if (packHead) {
    var body = document.getElementById('pack-body-' + packHead.getAttribute('data-toggle'));
    if (body) {
      body.classList.toggle('collapsed');
      packHead.classList.toggle('collapsed');
    }
    return;
  }
  // 关闭弹窗
  if (t2.classList && t2.classList.contains('modal-close')) {
    closeModal();
    return;
  }
});

// 点击 modal-bg 关闭
document.addEventListener('click', function(e) {
  if (e.target.id === 'modal-bg') closeModal();
});

// ===== 初始化 =====
window.addEventListener('load', function() {
  applyTheme(currentTheme);
  // 初始化时不调用 applyLang（会触发 renderAll），直接渲染
  renderAll();
  // 设置倒计时和时钟定时器
  setInterval(function() { updateCountdown(); updateClocks(); }, 1000);
});

// 暴露到全局供测试使用
window._test = {
  t: t,
  s2t: s2t,
  applyLang: applyLang,
  applyTheme: applyTheme,
  renderAll: renderAll,
  LOCATIONS: LOCATIONS,
  ITINERARY: ITINERARY,
  DICT: DICT
};

})();
"""

# 拼接
main_js = MAIN_JS.replace('__S2T_PLACEHOLDER__', s2t_js)

# 写 HTML
HTML_HEAD = """<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<title>意大利旅行手册</title>
<style>
__STYLE_CSS__
</style>
</head>
<body>

<div class="toolbar">
  <div class="brand">🇮🇹 Italy Trip</div>
  <div class="btns">
    <button class="lang-btn lang-active" data-lang="zh">简</button>
    <button class="lang-btn" data-lang="zht">繁</button>
    <button class="lang-btn" data-lang="en">EN</button>
    <button class="theme-toggle" title="主题切换">🌙</button>
  </div>
</div>

<div class="container">
  <!-- 头图 -->
  <div id="hero" class="hero"></div>

  <!-- 倒计时 + 双时钟 -->
  <div class="panel-cd">
    <div class="cd-block">
      <div class="label">📅 DEPARTURE</div>
      <div id="cd-count" class="count"></div>
      <div class="small">2026-09-25 21:30 HKT · 香港 → 罗马</div>
    </div>
    <div class="clock-block">
      <div class="clock-row">
        <span class="city">🇮🇹 <span id="clock-it-label">意大利时间</span></span>
        <span id="clock-it" class="time">--:--:--</span>
      </div>
      <div id="date-it" class="date" style="font-size:11px;color:var(--ink-light);text-align:right"></div>
      <div class="clock-row" style="margin-top:6px">
        <span class="city">🇨🇳 <span id="clock-bj-label">北京时间</span></span>
        <span id="clock-bj" class="time">--:--:--</span>
      </div>
      <div id="date-bj" class="date" style="font-size:11px;color:var(--ink-light);text-align:right"></div>
    </div>
  </div>

  <!-- 行程总览地图 -->
  <div class="section">
    <h2 class="section-title" id="map-section-title">🗺️ 行程总览地图</h2>
    <p class="section-subtitle" id="map-section-sub">点击某天查看当天完整路线；点击景点查看介绍。</p>
    <div class="map-block">
      <div class="map-toolbar">
        <div class="map-title" id="map-title">行程总览地图</div>
        <div class="map-actions">
          <button class="map-mode-btn active" data-mode="overview">总览</button>
          <button class="map-mode-btn" data-mode="all">显示全部</button>
        </div>
      </div>
      <div id="map-svg-wrap" class="map-svg-wrap"></div>
      <div class="map-note">⏱ 标注时间仅供参考 · 路线按行程顺序连接 · 点击景点查看介绍</div>
      <div style="padding:10px 14px;border-top:1px solid var(--line);display:flex;gap:4px;flex-wrap:wrap" id="day-buttons"></div>
    </div>
  </div>

  <!-- 行程时间轴 -->
  <div class="section">
    <h2 class="section-title">📅 12 天行程</h2>
    <p class="section-subtitle">点击日期展开/折叠 · 点 ^_^ 打卡 · 点星星评分（1-5 星）· 标点介绍</p>
    <div id="itinerary-list"></div>
  </div>

  <!-- 行李清单 -->
  <div class="section" id="packing-section">
    <h2 class="section-title" id="packing-section-title">🧳 行李清单</h2>
    <p class="section-subtitle" id="packing-section-sub">12 大分类 · 随身/托运/上机分开 · 点击打卡</p>
    <div id="packing-list" class="packing-section"></div>
  </div>

  <!-- 待办 -->
  <div class="section">
    <h2 class="section-title">✅ 出行前待办</h2>
    <p class="section-subtitle">18 项核心任务清单</p>
    <div id="todo-list" class="list-section"></div>
  </div>

  <!-- 贴士 -->
  <div class="section">
    <h2 class="section-title">💡 旅行贴士</h2>
    <p class="section-subtitle">时区 / 着装 / 餐饮 / 紧急电话</p>
    <div id="tips-list" class="list-section"></div>
  </div>
</div>

<!-- 弹窗 -->
<div id="modal-bg" class="modal-bg"></div>

<footer></footer>

<script>
__DATA_JS__
__MAIN_JS__
</script>
</body>
</html>
"""

# 拼装
output = HTML_HEAD.replace('__STYLE_CSS__', style_css)
output = output.replace('__DATA_JS__', data_js)
output = output.replace('__MAIN_JS__', main_js)

# 写文件
final_html_path = os.path.join(BASE, 'index.html')
with open(final_html_path, 'w', encoding='utf-8') as f:
    f.write(output)

print('Generated index.html')
print('Size:', os.path.getsize(final_html_path), 'bytes')
print('Lines:', output.count('\n'))