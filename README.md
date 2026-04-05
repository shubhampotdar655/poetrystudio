# Khush — Poetry Studio 🖊

A modern, fully responsive poetry writing app with AI-powered mood detection, dynamic backgrounds, local ambient music playback, and zero backend required.

---

## ✅ Modular structure with local music

This app is now split into clean modular files:
- `index.html` — HTML structure 
- `styles.css` — All styling
- `script.js` — All JavaScript logic
- `music/` — 12 curated ambient MP3 files

No build step, no npm install, no backend. Just open or deploy.

---

## 🗂 Project Structure

```
khush/
├── index.html        ← HTML structure (links to CSS/JS)
├── styles.css        ← All styling
├── script.js         ← All application logic
├── music/            ← 12 ambient music files (MP3)
│   ├── soulprodmusic-cute-mood-151368.mp3
│   ├── surprising_media-atmospheric-mood-410009.mp3
│   ├── jorisvermeer-serene-strings-documentary-mood-442962.mp3
│   ├── melodigne-lofi-mood-154675.mp3
│   ├── audiocoffee-joyful-mood-129562.mp3
│   ├── grand_project-uplifting-motivational-background-music-positive-vibe_30sec-496507.mp3
│   ├── viosteffa-soft-mood-388436.mp3
│   ├── 1ye-1ye-what-to-do-506965.mp3
│   └── (4 more unused files)
├── README.md         ← This file
└── FILE_STRUCTURE.md ← Detailed file breakdown
```

---

## ✨ Features

| Feature | Status |
|---|---|
| Clean distraction-free poetry editor | ✅ |
| Word count & line count | ✅ |
| Auto-save to localStorage | ✅ |
| Mood detection from poem keywords | ✅ |
| 8 mood-based animated backgrounds | ✅ |
| Aurora blob + floating particle animations | ✅ |
| Manual background/mood override | ✅ |
| Dark / Light mode toggle | ✅ |
| **Local ambient music player with play/pause** | ✅ |
| **Mood-aware auto-play on mood change** | ✅ |
| **Volume control & progress bar** | ✅ |
| AI writing suggestions (mood-aware) | ✅ |
| Download as PNG image | ✅ |
| Download as PDF | ✅ |
| Share via encoded URL | ✅ |
| Copy poem to clipboard | ✅ |
| Save to Favorites (localStorage) | ✅ |
| Load saved favorites | ✅ |
| Font style selection (4 fonts) | ✅ |
| Font size slider | ✅ |
| Custom background image upload | ✅ |
| Glassmorphism UI | ✅ |
| Fully responsive (mobile-first) | ✅ |
| No backend / no setup required | ✅ |


---

## 🚀 Deployment

### Option 1: Netlify (drag & drop — 30 seconds)
1. Go to [netlify.com](https://netlify.com) → Log in
2. Click **"Add new site" → "Deploy manually"**
3. Drag the entire `khush/` folder into the drop zone
4. Done — you get a live URL instantly (music folder will be included)

### Option 2: Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import from GitHub **or** use Vercel CLI:
   ```bash
   npm i -g vercel
   cd khush
   vercel
   ```
3. Follow prompts → deployed in ~30 seconds

### Option 3: GitHub Pages
1. Create a repo, push all files (HTML, CSS, JS, and music/ folder)
2. Settings → Pages → Source: main branch / root
3. Live at `https://yourusername.github.io/repo-name`

### Option 4: Local
```bash
# Just open in browser:
open index.html

# Or serve locally (recommended for audio testing):
npx serve .
# Then visit http://localhost:3000
```

**Note:** When running locally, use a local web server (e.g., `npx serve .`, Python `http.server`, or VS Code Live Server) to avoid CORS issues with audio playback.

---

## 🎨 Mood System

The app detects mood by scanning the poem for keyword families:

| Mood | Keywords detected | Music File | Background |
|---|---|---|---|
| Romantic | love, heart, kiss, rose... | soulprodmusic-cute-mood | Deep mauve → rose gradient |
| Dark | death, shadow, void, dread... | surprising_media-atmospheric | Near-black → deep indigo |
| Nature | tree, river, forest, wind... | jorisvermeer-serene-strings | Deep forest green gradient |
| Melancholic | alone, sorrow, weep, fade... | melodigne-lofi-mood | Slate blue gradient |
| Joyful | laugh, dance, bright, golden... | audiocoffee-joyful-mood | Amber → coral → pink |
| Cosmic | star, galaxy, infinite, cosmos... | grand_project-uplifting | Deep space purple (default) |
| Mystical | magic, dream, spirit, veil... | viosteffa-soft-mood | Dark violet → amethyst |
| Stormy | storm, thunder, rage, fury... | 1ye-1ye-what-to-do | Charcoal → steel blue |

Detection runs 800ms after the user stops typing (debounced). Manual mood override via the sidebar chips locks the mood **and auto-plays the corresponding music**.

---

## 🔊 Music Playback

Each mood has a curated ambient music file. Features include:

- **Auto-play**: When you select a mood (via chips or auto-detection), music plays automatically
- **Play/Pause**: Click the ▶ button to toggle playback
- **Volume Control**: Slider adjusts audio volume (0-100%)
- **Progress Bar**: Shows playback position; click to seek
- **Song Title Display**: Shows which track is playing
- **Seamless Switching**: Changing moods while music plays instantly switches to the new mood's track

---

## 🧠 AI Suggestions

When toggled on, the AI panel shows a mood-specific writing prompt designed to push the poem further. These are curated per mood (no API required — purely client-side). Future enhancement: wire to Claude API for live, poem-specific feedback.

---

## 📥 Download

- **PNG**: Uses the HTML5 Canvas API to render the poem onto a gradient background matching the current mood
- **PDF**: Uses jsPDF (loaded from CDN) to generate a styled A4 PDF

---

## 🔗 Sharing

Clicking "Copy as link" encodes the poem title, body (first 600 chars), and mood into a base64 URL parameter. Visiting that URL auto-loads the poem. No server needed.

---

## 💾 Local Storage Keys

| Key | Contents |
|---|---|
| `verse_draft` | `{title, body, mood, ts}` — auto-saved every ~900ms |
| `verse_favorites` | Array of `{title, body, mood, ts}` — up to 12 entries |

---

## 🔮 Future Improvements

1. **Claude API integration** — Real-time AI feedback line-by-line
2. **Spotify Web Playback SDK** — Stream music directly from Spotify
3. **Unsplash API** — Real photographic backgrounds for each mood
4. **Poem history** — Timeline of all drafts with version restore
5. **Social preview** — Open Graph meta tags for rich link previews
6. **Custom themes** — User-defined gradient colors saved to localStorage
7. **Verse community** — Optional Supabase backend to share to a public gallery
8. **PWA** — Service worker for offline use and home screen install
9. **Markdown export** — `.md` file download option
10. **Lyrics search** — Auto-find song lyrics matching the poem's mood

---

## 🛠 Tech Used

- **HTML5 / CSS3 / Vanilla JS** — No framework overhead
- **HTML5 Audio Element** — Native music playback (no library)
- **Google Fonts** — Cormorant Garamond (display) + DM Sans (body)
- **jsPDF** (CDN) — PDF generation
- **CSS custom properties** — Theming and dark/light mode
- **LocalStorage API** — Auto-save and favorites
- **Canvas API** — Image export
- **Web Clipboard API** — Copy-to-clipboard
"# poetrystudio" 
