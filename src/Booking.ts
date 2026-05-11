/* ============================================================
   TennisFinder — bookings.js
============================================================ */

// ── DATA ──────────────────────────────────────────────────────
const HOURS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
const COURTS = ['Court 1','Court 2','Court 3','Court 4'];

// Each booking: { court (0-indexed), startHour, durationHours, type, name, tag }
const BOOKINGS = [
  { court:0, startHour:8,  durationHours:2, type:'confirmed', name:'S. Williams',       tag:'PRIVATE LESSON',       tagClass:'tag-lesson'      },
  { court:1, startHour:9,  durationHours:2, type:'confirmed', name:'R. Federer',         tag:'TOURNAMENT PRACTICE',  tagClass:'tag-tournament'  },
  { court:2, startHour:10, durationHours:2, type:'confirmed', name:'C. Gauff',           tag:'CLUB MEMBER',          tagClass:'tag-member'      },
  { court:0, startHour:13, durationHours:1, type:'hold',      name:'M. Djokovic (Hold)', tag:null,                   tagClass:null               },
  { court:1, startHour:12, durationHours:5, type:'maintenance', name:null,              tag:null,                   tagClass:null               },
];

// ── RENDER SCHEDULE ───────────────────────────────────────────
const CELL_HEIGHT = 68; // px per hour
const HEADER_OFFSET = 0;

function renderSchedule() {
  const body = document.getElementById('scheduleBody');
  if (!body) return;

  // Build grid: rows = hours, cols = time + 4 courts
  let html = '';

  HOURS.forEach((hour, rowIdx) => {
    // Time label
    html += `<div class="time-slot-label">${hour}</div>`;
    // 4 court cells
    for (let col = 0; col < 4; col++) {
      html += `<div class="court-cell" data-row="${rowIdx}" data-col="${col}"></div>`;
    }
  });

  body.innerHTML = html;

  // Inject booking blocks
  BOOKINGS.forEach(b => {
    const rowIdx = b.startHour - 8; // 08:00 = row 0
    const cell = body.querySelector(`.court-cell[data-row="${rowIdx}"][data-col="${b.court}"]`);
    if (!cell) return;

    const block = document.createElement('div');
    const topOffset = 3;
    const height = b.durationHours * CELL_HEIGHT - 8;

    block.style.cssText = `top:${topOffset}px;height:${height}px;`;

    if (b.type === 'maintenance') {
      block.className = 'booking-block block-maintenance';
      block.style.left = '4px';
      block.style.right = '4px';
      block.style.position = 'absolute';
      block.innerHTML = `
        <i class="fas fa-tools maint-icon"></i>
        <div class="maint-label">RESURFACING</div>
        <div class="maint-sub">UNAVAILABLE UNTIL 17:00</div>
      `;
    } else {
      const startLabel = `${b.startHour.toString().padStart(2,'0')}:00`;
      const endHour = b.startHour + b.durationHours;
      const endLabel = `${endHour.toString().padStart(2,'0')}:00`;
      block.className = `booking-block block-${b.type}`;
      block.style.left = '4px';
      block.style.right = '4px';
      block.style.position = 'absolute';
      block.innerHTML = `
        <div class="block-time">${startLabel} - ${endLabel}</div>
        <div class="block-name">${b.name}</div>
        ${b.tag ? `<div class="block-tag ${b.tagClass}">${b.tag}</div>` : ''}
        <button class="block-menu-btn"><i class="fas fa-ellipsis-v"></i></button>
      `;
    }

    cell.appendChild(block);

    // Stretch across multiple rows visually by adjusting cell z-index
    if (b.durationHours > 1) {
      // Cover subsequent cells with a visual continuation
      for (let extra = 1; extra < b.durationHours; extra++) {
        const nextRow = rowIdx + extra;
        if (nextRow >= HOURS.length) break;
        const nextCell = body.querySelector(`.court-cell[data-row="${nextRow}"][data-col="${b.court}"]`);
        if (nextCell) nextCell.style.position = 'relative'; // keep z-context
      }
    }
  });

  // Live time line
  injectLiveLine(body);
}

// ── LIVE LINE ─────────────────────────────────────────────────
function injectLiveLine(body) {
  const now = new Date();
  const hour = now.getHours();
  const mins = now.getMinutes();

  if (hour < 8 || hour > 17) return; // outside schedule

  const rowIdx = hour - 8;
  const fraction = mins / 60;
  const topPx = rowIdx * CELL_HEIGHT + fraction * CELL_HEIGHT;

  // Find the first time label at that row to position relative to the grid
  const firstCell = body.querySelector(`.time-slot-label`);
  if (!firstCell) return;

  const line = document.createElement('div');
  line.className = 'live-line';
  line.style.cssText = `top:${topPx}px;`;

  // Span across all 5 columns (time col + 4 courts)
  line.style.gridColumn = '1 / -1';
  line.style.position = 'absolute';
  line.style.left = '0';
  line.style.right = '0';

  body.style.position = 'relative';
  body.appendChild(line);
}

// ── PANEL TOGGLE ──────────────────────────────────────────────
const panel = document.getElementById('bookingPanel');
const overlay = document.getElementById('panelOverlay');
const openBtn = document.getElementById('openBookingBtn');
const closeBtn = document.getElementById('closePanelBtn');

function openPanel() {
  panel.classList.add('open');
  overlay.classList.add('open');
}
function closePanel() {
  panel.classList.remove('open');
  overlay.classList.remove('open');
}

openBtn?.addEventListener('click', openPanel);
closeBtn?.addEventListener('click', closePanel);
overlay?.addEventListener('click', closePanel);

// Clicking on existing booking blocks opens panel too
document.addEventListener('click', e => {
  if (e.target.closest('.booking-block') && !e.target.closest('.block-menu-btn')) {
    openPanel();
  }
});

// ── BOOKING TYPE TABS ─────────────────────────────────────────
document.querySelectorAll('.type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── DATE RANGE CHIP ───────────────────────────────────────────
function getWeekRange() {
  const today = new Date();
  const day = today.getDay();
  const mon = new Date(today); mon.setDate(today.getDate() - day + (day === 0 ? -6 : 1));
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
  const fmt = d => d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
  return `${fmt(mon)} – ${fmt(sun)}`;
}

const dateLabel = document.getElementById('dateRangeLabel');
if (dateLabel) dateLabel.textContent = getWeekRange();

// ── LIVE CLOCK UPDATE ─────────────────────────────────────────
function updateLiveLine() {
  const body = document.getElementById('scheduleBody');
  if (!body) return;
  const old = body.querySelector('.live-line');
  if (old) old.remove();
  injectLiveLine(body);
}
setInterval(updateLiveLine, 60000); // refresh every minute

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderSchedule();
});