# Khush Poetry Studio - File Structure

## Project Files

### 1. **index_new.html** (Main HTML File)
- Contains the HTML structure and markup
- Imports `styles.css` via `<link rel="stylesheet" href="styles.css">`
- Imports `script.js` via `<script src="script.js"></script>`
- Includes external CDN scripts for jsPDF and html2canvas
- **Size:** ~7.6 KB

### 2. **styles.css** (Stylesheet)
- All CSS styling rules
- CSS variables for theming (dark/light mode)
- Responsive design with media queries
- Animations and transitions
- **Size:** ~17.4 KB

### 3. **script.js** (JavaScript)
- All application logic and functionality
- Mood detection and background engine
- Editor features (autosave, word count, etc.)
- Music player, download, sharing functionality
- Custom background image upload
- **Size:** ~22.7 KB

### 4. **index.html** (Original - Deprecated)
- The original single-file version
- Keep for backup/reference only
- **Do not use** - switch to `index_new.html`

### 5. **README.md** (Project Documentation)
- Original project documentation
- Features, deployment guides, and tech stack

## How to Use

### Option 1: Rename for Deployment (Recommended)
```bash
# Remove or archive the old file
mv index.html index_old.html

# Rename the new file
mv index_new.html index.html

# Now the app is ready to deploy!
```

### Option 2: Direct Usage
Simply use `index_new.html` directly - it will automatically load `styles.css` and `script.js` from the same directory.

## File Linking Diagram

```
index_new.html
├── Link to: styles.css
│   └── Contains: All CSS styles, animations, responsive design
│
├── Link to: script.js
│   └── Contains: All JavaScript logic and functionality
│
└── External CDN Scripts:
    ├── jsPDF (PDF generation)
    └── html2canvas (Image export)
```

## Deployment Instructions

### Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the entire folder
3. The app auto-deploys at a live URL

### Vercel
1. Connect your GitHub repo
2. Vercel auto-deploys on push

### GitHub Pages
1. Push all 3 files to your repo
2. Enable GitHub Pages in Settings
3. Live at `https://yourusername.github.io/repo-name`

### Local/Self-Hosted
Simply copy all 3 files to your web server:
- `index.html` (or rename from `index_new.html`)
- `styles.css`
- `script.js`

## Benefits of Separate Files

✅ **Better Organization** - Each file has a clear purpose  
✅ **Easier Maintenance** - Find and edit code quickly  
✅ **Better Performance** - Browsers cache separate files  
✅ **Team Collaboration** - Multiple developers can work on CSS/JS simultaneously  
✅ **Scalability** - Easy to split into more files as project grows  
✅ **Version Control** - Git can track changes per file more effectively  

## Notes

- All files must be in the **same directory**
- File names are case-sensitive on Linux/Mac servers (keep lowercase)
- External fonts from Google Fonts are loaded via CDN (requires internet)
- jsPDF and html2canvas are loaded from CDN
- No build process or bundler needed - works directly in browser!
