# 🎨 Portfolio — UI/UX Designer

A stunning portfolio website built with **Vite + React + Tailwind CSS + Framer Motion**, inspired by the layout and effects of Fini Charisa's portfolio.

---

## ✨ Effects & Features

| Feature | Description |
|---|---|
| 🎆 Particle Canvas | 80 particles + glowing orbs that react to your mouse |
| ✍️ Split Text Reveal | Hero title animates letter by letter on load |
| 🎰 Slot Machine Text | Rolling words in About section (like Fini's) |
| 🃏 3D Tilt Cards | Project cards tilt + moving spotlight on hover |
| 🌊 Wave Canvas | Animated sine waves in CTA/Footer background |
| 🖱️ Custom Cursor | Dot + lag-follower ring, expands on hover |
| 📜 Smooth Scroll | Lenis for buttery smooth scrolling |
| ✨ Film Grain | Subtle noise texture overlay for depth |
| 🎬 Scroll Reveals | Staggered fade-up on every section |
| 🏷️ Marquee Strip | Infinite scrolling skills ticker |
| 📸 Drag Gallery | Horizontal drag-to-scroll photo gallery |
| 📱 Responsive | Mobile-first, hamburger menu included |

---

## 🗂️ Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── ParticleBackground.jsx   ← Canvas particles + orbs
        ├── Cursor.jsx               ← Custom cursor
        ├── Navbar.jsx               ← Sticky nav + mobile menu
        ├── Hero.jsx                 ← Split text, 3D tilt, badges
        ├── MarqueeStrip.jsx         ← Scrolling ticker
        ├── Projects.jsx             ← Tilt cards + spotlight
        ├── About.jsx                ← Slot machine text + skills
        ├── Experience.jsx           ← Timeline
        ├── Gallery.jsx              ← Drag scroll gallery
        └── Footer.jsx               ← Wave canvas + CTA
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 🛠️ Customization Guide

### 📝 Change your info
Edit these files to replace placeholder content:

**`src/components/Hero.jsx`**
- Line 3: Change `WORDS` array for rolling skills
- Title text: "An Architect of User Minds, based in Indonesia"
- Add your photo: uncomment `<img src="/your-photo.jpg" ...>`

**`src/components/Navbar.jsx`**
- Change `YourName.` logo text
- Update `mailto:your@email.com`

**`src/components/Projects.jsx`**
- Edit the `PROJECTS` array with your real projects
- Add project images: `/public/projects/1.jpg`, `2.jpg`, etc.

**`src/components/About.jsx`**
- Edit `SLOTS` object for rolling words
- Edit `SKILLS` array
- Change stats numbers

**`src/components/Experience.jsx`**
- Edit the `JOBS` array with your real experience

**`src/components/Gallery.jsx`**
- Replace placeholder divs with `<img src="/gallery/1.jpg" ...>`

**`src/components/Footer.jsx`**
- Update `mailto:your@email.com`
- Change social links

### 🎨 Change colors
In `tailwind.config.js`:
```js
accent: '#c9a84c',      // Gold — change to your brand color
'accent-light': '#e2c06b',
```

Also update `--accent` in `src/index.css`:
```css
--accent: #c9a84c;
```

### 🖼️ Add your photos
Put images in `/public/`:
```
public/
├── your-photo.jpg        → hero portrait
├── projects/
│   ├── 1.jpg             → project thumbnails
│   ├── 2.jpg
│   └── ...
└── gallery/
    ├── 1.jpg             → gallery photos
    └── ...
```

---

## 📦 Dependencies

```json
"framer-motion": "^11"     → Animations & transitions
"lenis": "^1.1"            → Smooth scroll
"react-intersection-observer" → Scroll-triggered reveals
```

---

## 🌐 Deploy to Vercel / Netlify

```bash
npm run build
# Upload /dist folder to Netlify
# or connect repo to Vercel — zero config needed
```

---

Made with ❤️ — inspired by finicharisa.framer.website
