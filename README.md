# Italy Travel Handbook · 意大利 12 天旅行手册

四个女孩 · 12 天 · 9.25 – 10.6 · 香港 → 米兰 → 多洛米蒂 → 威尼斯 → 佛罗伦萨 → 卡普里 → 罗马 → 回家

## 一页纸交付

- `index.html` — 单文件成品，可离线使用；保存到手机用浏览器打开即可
- 顶部插画（白天 / 夜晚双态）
- 倒计时 + 意大利时间 / 北京时间双时钟
- SVG 行程地图（12 天、41 个地点）
- 12 天时间轴（每日可折叠、可打卡、可评分）
- 交通票据 / 住宿 / 出行前待办 / 旅行贴士
- 简体中文 / 繁体中文 / English 一键切换
- 浅色 / 暗色双主题

## 文件清单

| 文件 | 作用 |
| --- | --- |
| `index.html` | **主交付物**，单文件 HTML |
| `index-v1.html` | v1 快照（回滚用） |
| `data.js` | 所有数据对象（DICT / ITINERARY / LOCATIONS / SPOTS_INFO / TICKETS / STAY_INFO / TODO_LIST / TIPS_LIST） |
| `style.css` | 样式表（CSS 变量 + 双主题） |
| `s2t.js` | 简→繁字形映射字典 |
| `build_data.py` | 从 Python 字典生成 `data.js` |
| `build_html.py` | 拼装 `index.html` 的构建脚本 |
| `check.js` | Node + jsdom 自检脚本（31 项断言） |

## 重新生成 index.html

```bash
python build_html.py
```

## 自检

```bash
# 需要先在 workspace 装 jsdom
NODE_PATH=../workspace/node_modules node check.js
```

## 在线访问

已部署到 CloudStudio：<https://200e11a8585d43709f8ed591a87aa669.app.workbuddy.host>

## 路线

1. 香港 → 阿布扎比（转机）→ 米兰
2. 米兰 → 多洛米蒂（Brixen、Seceda 刀锋山、休斯高原、Braies 湖）
3. 威尼斯 → 佛罗伦萨
4. 佛罗伦萨 → 卡普里岛（蓝洞、Anacapri）
6. 罗马（梵蒂冈一日 + 罗马深度）
7. 罗马 → 阿布扎比 → 香港

数据来源：腾讯文档《意大利》行程单详细版（@tdoc#PxfaBgvapikt）。