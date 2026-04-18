// ─── STATE ────────────────────────────────────────────────────────────────────
const state = {
  theme: 'dark',
  mood: 'cosmic',
  manualMood: false,
  aiEnabled: false,
  currentFont: 'cormorant',
  fontSize: 20,
  favorites: JSON.parse(localStorage.getItem('verse_favorites') || '[]'),
  autosaveTimer: null,
  lastSaved: null,
  playing: false,
};

// ─── MOOD DEFINITIONS ────────────────────────────────────────────────────────
const MOODS = {
  romantic: {
    bg: 'linear-gradient(135deg, #3d0030 0%, #7a1845 30%, #c45c8b 60%, #f4a0c0 100%)',
    blobs: ['#c45c8b', '#7a1845', '#f4a0c0'],
    dot: '#f4a0c0',
    music: { icon: '🌹', title: 'Romantic Mood', artist: 'Ambient Music', file: 'music/soulprodmusic-cute-mood-151368.mp3' },
    particles: '#f4a0c0',
    aiHint: 'Consider weaving in sensory details — the scent of roses, warmth of skin, the hush between heartbeats.'
  },
  dark: {
    bg: 'linear-gradient(135deg, #030303 0%, #1a0a2e 40%, #0d1b2a 100%)',
    blobs: ['#1a0a2e', '#0d1b2a', '#2d1b69'],
    dot: '#6b21a8',
    music: { icon: '🌑', title: 'Dark Mood', artist: 'Ambient Music', file: 'music/surprising_media-atmospheric-mood-410009.mp3' },
    particles: '#6b21a8',
    aiHint: 'Darkness holds beauty in shadows. Try juxtaposing light and void — one word that blinds, followed by silence.'
  },
  nature: {
    bg: 'linear-gradient(135deg, #0a2e1a 0%, #145a32 35%, #1e8449 60%, #52be80 100%)',
    blobs: ['#145a32', '#52be80', '#1abc9c'],
    dot: '#52be80',
    music: { icon: '🌿', title: 'Nature Mood', artist: 'Ambient Music', file: 'music/jorisvermeer-serene-strings-documentary-mood-442962.mp3' },
    particles: '#52be80',
    aiHint: 'Let the natural world breathe into your verse — wind through branches, dew on moss, the patience of stones.'
  },
  melancholic: {
    bg: 'linear-gradient(135deg, #1a2a3a 0%, #2c3e50 40%, #4a6fa5 80%, #6b93c4 100%)',
    blobs: ['#2c3e50', '#4a6fa5', '#7fb3d3'],
    dot: '#7fb3d3',
    music: { icon: '🌧', title: 'Melancholic Mood', artist: 'Ambient Music', file: 'music/melodigne-lofi-mood-154675.mp3' },
    particles: '#7fb3d3',
    aiHint: 'Grief speaks in understatement. A single concrete image — an empty chair, a folded note — carries more than metaphor.'
  },
  joyful: {
    bg: 'linear-gradient(135deg, #f39c12 0%, #e74c3c 30%, #e91e63 60%, #ff6b6b 100%)',
    blobs: ['#f39c12', '#e91e63', '#ff9f43'],
    dot: '#ffd32a',
    music: { icon: '☀️', title: 'Joyful Mood', artist: 'Ambient Music', file: 'music/audiocoffee-joyful-mood-129562.mp3' },
    particles: '#ffd32a',
    aiHint: 'Joy is movement and light. Let your verbs dance — not "walked" but "leapt", not "shone" but "blazed".'
  },
  cosmic: {
    bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    blobs: ['#302b63', '#7c3aed', '#1e40af'],
    dot: '#a78bfa',
    music: { icon: '🌌', title: 'Cosmic Mood', artist: 'Ambient Music', file: 'music/grand_project-uplifting-motivational-background-music-positive-vibe_30sec-496507.mp3' },
    particles: '#a78bfa',
    aiHint: 'You are made of stardust — let your poem touch infinity. Zoom out to the cosmos, then crash back into the human.'
  },
  mystical: {
    bg: 'linear-gradient(135deg, #1a0533 0%, #4a1060 40%, #7b2d8b 70%, #c471ed 100%)',
    blobs: ['#4a1060', '#c471ed', '#7b2d8b'],
    dot: '#c471ed',
    music: { icon: '🔮', title: 'Mystical Mood', artist: 'Ambient Music', file: 'music/viosteffa-soft-mood-388436.mp3' },
    particles: '#c471ed',
    aiHint: 'Mystery lives in the half-said thing. Let your poem open a door without revealing what\'s behind it.'
  },
  stormy: {
    bg: 'linear-gradient(135deg, #1c1c2e 0%, #2d3436 40%, #636e72 75%, #b2bec3 100%)',
    blobs: ['#2d3436', '#636e72', '#74b9ff'],
    dot: '#74b9ff',
    music: { icon: '⛈', title: 'Stormy Mood', artist: 'Ambient Music', file: 'music/1ye-1ye-what-to-do-506965.mp3' },
    particles: '#74b9ff',
    aiHint: 'The storm is not metaphor — it is breath, it is heartbeat. Let your rhythm break apart like thunder, then go silent.'
  }
};

// ─── MOOD DETECTION ───────────────────────────────────────────────────────────
const MOOD_KEYWORDS = {
  romantic: ['love','heart','kiss','rose','tender','embrace','longing','desire','adore','beloved','passion','darling','together','caress','bloom','touch','warm','blush'],
  dark: ['death','shadow','void','darkness','despair','hollow','abyss','dread','decay','cruel','nightmare','cold','black','hate','fear','pain','lost','broken'],
  nature: ['tree','river','mountain','wind','leaf','rain','forest','stone','sky','bird','flower','earth','ocean','cloud','sun','moon','grass','seed','root'],
  melancholic: ['alone','silent','sorrow','weep','sigh','fade','missing','empty','grey','drift','memory','ghost','lonesome','hollow','grieve','tears','echo','forgotten'],
  joyful: ['laugh','bright','dance','celebrate','golden','smile','joy','sunshine','happy','gleam','soar','free','delight','wonder','glow','radiant','vivid','bliss'],
  cosmic: ['star','universe','galaxy','infinite','cosmos','void','nebula','orbit','beyond','eternity','vast','celestial','space','light','dark matter','quantum'],
  mystical: ['magic','spirit','dream','ancient','rune','veil','ghost','ethereal','ritual','sacred','trance','oracle','mystery','hidden','spell','vision','realm'],
  stormy: ['storm','thunder','lightning','rage','crash','fury','tempest','gale','flood','howl','roar','surge','shake','wild','chaotic','fierce','violent','torrent']
};

function detectMood(text) {
  if (!text.trim() || text.trim().split(/\s+/).length < 4) return null;
  const lower = text.toLowerCase();
  const scores = {};
  for (const [mood, words] of Object.entries(MOOD_KEYWORDS)) {
    scores[mood] = words.filter(w => lower.includes(w)).length;
  }
  const best = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  return best[0][1] > 0 ? best[0][0] : 'cosmic';
}

// ─── BACKGROUND ENGINE ────────────────────────────────────────────────────────
function applyMood(mood, manual = false) {
  state.mood = mood;
  if (manual) state.manualMood = true;
  const m = MOODS[mood];
  
  document.getElementById('bg-layer').style.background = m.bg;
  document.getElementById('mood-dot').style.background = m.dot;
  document.getElementById('mood-label').textContent = mood;

  // Update music
  document.getElementById('music-icon').textContent = m.music.icon;
  document.getElementById('music-title').textContent = m.music.title;
  document.getElementById('music-sub').textContent = m.music.artist;
  
  // Auto-play music for mood (if manually selected or if already playing)
  if (manual || state.playing) {
    playMusicForMood(mood);
  } else {
    // Just update the song title display
    songTitle.textContent = m.music.title;
  }
  
  // Update AI hint
  if (state.aiEnabled) {
    document.getElementById('ai-text').textContent = m.aiHint;
  }

  // Update mood chip selection
  document.querySelectorAll('.mood-chip').forEach(c => {
    c.classList.toggle('selected', c.dataset.mood === mood);
  });

  // Rebuild particles
  buildParticles(m.particles, m.blobs);
}

function buildParticles(color, blobs) {
  const container = document.getElementById('bg-particles');
  container.innerHTML = '';

  // Aurora blobs
  blobs.forEach((c, i) => {
    const blob = document.createElement('div');
    blob.className = 'aurora-blob';
    const size = 350 + i * 120;
    blob.style.cssText = `
      width:${size}px;height:${size}px;
      background:${c};opacity:0.25;
      left:${[10,50,70][i]}%;top:${[20,60,10][i]}%;
      animation-duration:${12 + i*5}s;
      animation-delay:-${i*3}s;
    `;
    container.appendChild(blob);
  });

  // Floating particles
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 2 + Math.random() * 4;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      background:${color};opacity:${0.3 + Math.random()*0.4};
      left:${Math.random()*100}%;bottom:${-10}px;
      animation-duration:${8 + Math.random()*12}s;
      animation-delay:${-Math.random()*15}s;
    `;
    container.appendChild(p);
  }
}

// ─── EDITOR ───────────────────────────────────────────────────────────────────
const titleEl = document.getElementById('poem-title');
const bodyEl = document.getElementById('poem-body');
const wordCountEl = document.getElementById('word-count');
const lineCountEl = document.getElementById('line-count');
let aiDebounce = null;
let moodDebounce = null;

function updateMeta() {
  const text = bodyEl.value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').filter(l => l.trim()).length : 0;
  wordCountEl.textContent = `${words} word${words !== 1 ? 's' : ''}`;
  lineCountEl.textContent = `${lines} line${lines !== 1 ? 's' : ''}`;
}

function debouncedMoodDetect() {
  if (state.manualMood) return;
  clearTimeout(moodDebounce);
  moodDebounce = setTimeout(() => {
    const detected = detectMood(titleEl.value + ' ' + bodyEl.value);
    if (detected && detected !== state.mood) applyMood(detected);
  }, 800);
}

function debouncedAI() {
  if (!state.aiEnabled) return;
  clearTimeout(aiDebounce);
  aiDebounce = setTimeout(() => {
    const mood = state.mood;
    document.getElementById('ai-text').textContent = MOODS[mood].aiHint;
  }, 1200);
}

function triggerAutosave() {
  const el = document.getElementById('autosave-indicator');
  el.innerHTML = '<span style="opacity:0.5">Saving…</span>';
  clearTimeout(state.autosaveTimer);
  state.autosaveTimer = setTimeout(() => {
    const data = { title: titleEl.value, body: bodyEl.value, mood: state.mood, ts: Date.now() };
    localStorage.setItem('verse_draft', JSON.stringify(data));
    el.innerHTML = '<div class="autosave-dot"></div><span>Saved</span>';
  }, 900);
}

titleEl.addEventListener('input', () => { updateMeta(); debouncedMoodDetect(); triggerAutosave(); });
bodyEl.addEventListener('input', () => { updateMeta(); debouncedMoodDetect(); debouncedAI(); triggerAutosave(); });

// Tab support in textarea
bodyEl.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = bodyEl.selectionStart, en = bodyEl.selectionEnd;
    bodyEl.value = bodyEl.value.substring(0,s) + '  ' + bodyEl.value.substring(en);
    bodyEl.selectionStart = bodyEl.selectionEnd = s + 2;
  }
});

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
document.getElementById('btn-theme').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = state.theme === 'light' ? 'light' : '';
  document.getElementById('btn-theme').textContent = state.theme === 'dark' ? '🌙' : '☀️';
});

// ─── AI TOGGLE ────────────────────────────────────────────────────────────────
document.getElementById('btn-ai').addEventListener('click', () => {
  state.aiEnabled = !state.aiEnabled;
  const panel = document.getElementById('ai-panel');
  panel.style.display = state.aiEnabled ? 'block' : 'none';
  document.getElementById('btn-ai').classList.toggle('active', state.aiEnabled);
  if (state.aiEnabled) {
    document.getElementById('ai-text').textContent = MOODS[state.mood].aiHint;
  }
  showToast(state.aiEnabled ? '✦ AI suggestions on' : 'AI suggestions off');
});

// ─── FAVORITES ────────────────────────────────────────────────────────────────
function saveFavorites() {
  localStorage.setItem('verse_favorites', JSON.stringify(state.favorites));
  renderFavorites();
}

function renderFavorites() {
  const list = document.getElementById('favorites-list');
  if (!state.favorites.length) {
    list.innerHTML = '<div class="empty-state">No saved poems yet…</div>';
    return;
  }
  list.innerHTML = state.favorites.map((f, i) => `
    <div class="fav-item" onclick="loadFavorite(${i})">
      <span class="fav-item-title">${f.title || 'Untitled'}</span>
      <button class="fav-del" onclick="deleteFavorite(event,${i})">×</button>
    </div>
  `).join('');
}

window.loadFavorite = (i) => {
  const f = state.favorites[i];
  titleEl.value = f.title || '';
  bodyEl.value = f.body || '';
  updateMeta();
  if (f.mood) { state.manualMood = false; applyMood(f.mood); }
  showToast('Poem loaded');
};

window.deleteFavorite = (e, i) => {
  e.stopPropagation();
  state.favorites.splice(i, 1);
  saveFavorites();
};

document.getElementById('btn-fav').addEventListener('click', () => {
  const entry = {
    title: titleEl.value || 'Untitled',
    body: bodyEl.value,
    mood: state.mood,
    ts: Date.now()
  };
  state.favorites.unshift(entry);
  if (state.favorites.length > 12) state.favorites.pop();
  saveFavorites();
  document.getElementById('btn-fav').textContent = '♥';
  setTimeout(() => document.getElementById('btn-fav').textContent = '♡', 1200);
  showToast('♥ Saved to favorites');
});

// ─── MOOD CHIPS ───────────────────────────────────────────────────────────────
document.querySelectorAll('.mood-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    applyMood(btn.dataset.mood, true);
    showToast(`✦ ${btn.dataset.mood} mood`);
  });
});

// ─── MUSIC ────────────────────────────────────────────────────────────────────
const audioPlayer = document.getElementById('mood-audio');
const playBtn = document.getElementById('play-btn');
const volumeSlider = document.getElementById('volume-slider');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const songTitle = document.getElementById('song-title');

function playMusicForMood(mood) {
  const musicFile = MOODS[mood].music.file;
  audioPlayer.src = musicFile;
  songTitle.textContent = MOODS[mood].music.title;
  audioPlayer.play();
  state.playing = true;
  playBtn.textContent = '⏸';
  playBtn.classList.add('playing');
}

function toggleAudioPlayback() {
  if (audioPlayer.src) {
    if (state.playing) {
      audioPlayer.pause();
      state.playing = false;
      playBtn.textContent = '▶';
      playBtn.classList.remove('playing');
    } else {
      audioPlayer.play();
      state.playing = true;
      playBtn.textContent = '⏸';
      playBtn.classList.add('playing');
    }
  }
}

// Play/Pause button
playBtn.addEventListener('click', toggleAudioPlayback);

// Volume control
volumeSlider.addEventListener('input', (e) => {
  audioPlayer.volume = e.target.value / 100;
});

// Progress bar
audioPlayer.addEventListener('timeupdate', () => {
  if (audioPlayer.duration) {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = percent + '%';
  }
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = x / rect.width;
  audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Stop playing when audio ends
audioPlayer.addEventListener('ended', () => {
  state.playing = false;
  playBtn.textContent = '▶';
  playBtn.classList.remove('playing');
});

// ─── FONT SETTINGS ────────────────────────────────────────────────────────────
const FONTS = {
  cormorant: "'Cormorant Garamond', Georgia, serif",
  georgia: 'Georgia, serif',
  dmsans: "'DM Sans', system-ui, sans-serif",
  mono: "'Courier New', Courier, monospace"
};

document.querySelectorAll('.font-option').forEach(btn => {
  btn.addEventListener('click', () => {
    state.currentFont = btn.dataset.font;
    document.querySelectorAll('.font-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    bodyEl.style.fontFamily = FONTS[state.currentFont];
    titleEl.style.fontFamily = FONTS[state.currentFont];
    bodyEl.style.fontStyle = state.currentFont === 'cormorant' ? 'normal' : 'normal';
  });
});

const sizeRange = document.getElementById('font-size-range');
const sizeVal = document.getElementById('font-size-val');
sizeRange.addEventListener('input', () => {
  state.fontSize = parseInt(sizeRange.value);
  bodyEl.style.fontSize = state.fontSize + 'px';
  sizeVal.textContent = state.fontSize + 'px';
});

// ─── SHARE MODAL ─────────────────────────────────────────────────────────────
function openShare() {
  const title = titleEl.value || 'Untitled';
  const body = bodyEl.value || '(empty poem)';
  document.getElementById('share-preview').innerHTML =
    `<strong style="font-size:18px;display:block;margin-bottom:8px">${title}</strong>` +
    body.split('\n').slice(0,8).map(l => l || '&nbsp;').join('<br>');
  document.getElementById('share-modal').classList.add('open');
}

document.getElementById('btn-share').addEventListener('click', openShare);
document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('share-modal').classList.remove('open');
});
document.getElementById('share-modal').addEventListener('click', e => {
  if (e.target.id === 'share-modal') document.getElementById('share-modal').classList.remove('open');
});

document.getElementById('copy-text-btn').addEventListener('click', () => {
  const text = (titleEl.value ? titleEl.value + '\n\n' : '') + bodyEl.value;
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard'));
});

document.getElementById('copy-link-btn').addEventListener('click', () => {
  const data = { t: titleEl.value, b: bodyEl.value.slice(0,600), m: state.mood };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  const url = `${location.origin}${location.pathname}?poem=${encoded}`;
  navigator.clipboard.writeText(url).then(() => showToast('Link copied!'));
});

// ─── DOWNLOAD ─────────────────────────────────────────────────────────────────
async function downloadImage() {
  const title = titleEl.value || 'poem';
  const body = bodyEl.value;
  const m = MOODS[state.mood];

  const canvas = document.createElement('canvas');
  canvas.width = 900; canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 900, 600);
  const colors = m.bg.match(/#[a-fA-F0-9]{6}/g) || ['#0f0c29','#302b63'];
  colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Poem text
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.font = 'italic 32px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(title, 60, 90);
  ctx.font = '22px "Cormorant Garamond", Georgia, serif';
  const lines = body.split('\n');
  lines.forEach((line, i) => { if(i < 16) ctx.fillText(line, 60, 150 + i * 36); });

  ctx.font = '13px "DM Sans", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillText('khush — poetry studio', 60, 570);

  const link = document.createElement('a');
  link.download = (title || 'poem') + '.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('Image downloaded');
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const m = MOODS[state.mood];
  const colors = m.bg.match(/#[a-fA-F0-9]{6}/g) || ['#0f0c29','#302b63'];
  
  // Parse hex to RGB for jsPDF
  const hex2rgb = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const [r1,g1,b1] = hex2rgb(colors[0]);
  doc.setFillColor(r1, g1, b1);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont('times', 'italic');
  doc.text(titleEl.value || 'Untitled', 20, 40);

  doc.setFontSize(14);
  doc.setFont('times', 'normal');
  const lines = doc.splitTextToSize(bodyEl.value, 170);
  doc.text(lines, 20, 60);

  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255, 0.4);
  doc.text('Created with Khush — Poetry Studio', 20, 285);

  doc.save((titleEl.value || 'poem') + '.pdf');
  showToast('PDF downloaded');
}

// ─── CUSTOM BACKGROUND IMAGE ──────────────────────────────────────────────────
let customBgImage = null;

function setupBackgroundImageUpload() {
  const uploadBtn = document.getElementById('bg-upload-btn');
  const removeBtn = document.getElementById('bg-remove-btn');
  const fileInput = document.getElementById('bg-image-input');
  const preview = document.getElementById('bg-image-preview');

  uploadBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      customBgImage = event.target.result;
      applyCustomBackground();
      removeBtn.style.display = 'block';
      showToast('Background image applied');
    };
    reader.readAsDataURL(file);
  });

  removeBtn.addEventListener('click', () => {
    customBgImage = null;
    applyCustomBackground();
    removeBtn.style.display = 'none';
    fileInput.value = '';
    preview.style.backgroundImage = 'none';
    showToast('Background image removed');
  });
}

function applyCustomBackground() {
  const bgLayer = document.getElementById('bg-layer');
  const preview = document.getElementById('bg-image-preview');

  if (customBgImage) {
    // Set background image with gradient overlay
    const m = MOODS[state.mood];
    const gradientCSS = m.bg;
    bgLayer.style.backgroundImage = `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${customBgImage}')`;
    bgLayer.style.backgroundSize = 'cover';
    bgLayer.style.backgroundPosition = 'center';
    bgLayer.style.backgroundAttachment = 'fixed';

    preview.style.backgroundImage = `url('${customBgImage}')`;
  } else {
    // Revert to gradient
    const m = MOODS[state.mood];
    bgLayer.style.backgroundImage = 'none';
    bgLayer.style.background = m.bg;
    preview.style.backgroundImage = 'none';
  }
}

document.getElementById('btn-download').addEventListener('click', downloadImage);
document.getElementById('download-img-btn').addEventListener('click', downloadImage);
document.getElementById('download-pdf-btn').addEventListener('click', downloadPDF);

// ─── TOAST ────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ─── LOAD FROM URL OR DRAFT ───────────────────────────────────────────────────
function init() {
  // Check URL param
  const params = new URLSearchParams(location.search);
  const poemParam = params.get('poem');
  if (poemParam) {
    try {
      const data = JSON.parse(decodeURIComponent(escape(atob(poemParam))));
      titleEl.value = data.t || '';
      bodyEl.value = data.b || '';
      if (data.m) applyMood(data.m, true);
    } catch(e) {}
  } else {
    // Load draft
    const draft = localStorage.getItem('verse_draft');
    if (draft) {
      try {
        const d = JSON.parse(draft);
        titleEl.value = d.title || '';
        bodyEl.value = d.body || '';
        if (d.mood) { state.manualMood = true; applyMood(d.mood); }
      } catch(e) {}
    }
  }

  updateMeta();
  renderFavorites();
  applyMood(state.mood);
  setupBackgroundImageUpload();
}

init();
