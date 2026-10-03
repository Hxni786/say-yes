<div align="center">

# A Question For You 💖
### The Ultimate Interactive Proposal & Question Experience
**Created & Designed with ❤️ by [hxni](https://github.com/hxni)**

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary%20%2F%20All%20Rights%20Reserved-rose?style=for-the-badge)](./LICENSE)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Desktop-purple?style=for-the-badge)](#mobile--ios-optimizations)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side%20%7C%20Zero--Tracking-emerald?style=for-the-badge)](./PRIVACY.md)
[![Vite](https://img.shields.io/badge/Built%20With-React%2018%20%2B%20Vite%20%2B%20Tailwind-blue?style=for-the-badge)](https://vitejs.dev/)

<br />

<p align="center">
  A viral, modern, and beautifully crafted interactive web application designed to ask your beloved, crush, partner, or friend any question. Features the classic expanding <b>"Yes"</b> button, an evasive runaway <b>"No"</b> button, synthesized audio effects, personalized recipient links, and confetti celebrations.
</p>

[Explore Questions](#-preset-categories) • [How to Use](#-how-to-use) • [Deployment](#-deployment-guide) • [Privacy Policy](./PRIVACY.md) • [License](./LICENSE)

</div>

---

## 🌟 Highlights

* **16+ Built-in Questions & Unique Categories**: Covers timeless romantic proposals, heartfelt apologies, late-night date cravings, and playful gamer banter.
* **✍️ Custom Question Builder**: Write any custom question, custom subtitle, unique Yes/No button text, celebration headline, and pick from 6 designer palettes.
* **🏃 Evasive "Runaway" No Button**: Optimized for both **desktop mouse-hover** and **iOS/Android touch gestures** (`onTouchStart`), dodging taps dynamically!
* **🔊 Synthesized Web Audio Effects**: High-precision pops, dodges, and victory fanfare powered entirely by the browser's native Web Audio API (zero external audio file dependencies).
* **📱 iOS & Mobile-First Architecture**: Built using `min-h-[100dvh]` and native Apple Safe Area insets (`env(safe-area-inset-*)`) to prevent address bar clipping and iOS tap delays.
* **🔒 100% Autonomous & Private**: All 19 cute animation assets are hosted locally in `public/gifs/`. Zero remote CDN calls, zero 404s, and zero telemetry tracking.
* **💌 Instant Personalized Sharing**: Generate unique share links with recipient names (e.g. `?to=Sarah`), ready to send via WhatsApp, Telegram, or iMessage.

---

## 📚 Preset Categories

### 1. ❤️ Love & Romance
* **Do you love me?**
* **Do you miss me?**
* **Will you be my Valentine?** *(The timeless classic!)*
* **Will you be my girlfriend?** / **Will you be my boyfriend?**
* **Will you marry me?** 💍
* **Am I your favorite person?**
* **Do you think about me every day?**
* **Do you want a hug?** 🫂
* **Can I kiss you?** 💋

### 2. 🥺 Sorry & Making Up *(Soft Apologies & Truces)*
* **Will you forgive me?** *(With apologetic pleading lines & warm hug celebration)*
* **Are you still angry with me?** *(Truce mode with "No, not angry anymore ❤️" / "Still mad 😤")*
* **Can we start over?**
* **Will you talk to me?**

### 3. 🍕 Late-Night Dates & Food Cravings
* **Late-night boba / ice cream run?** 🧋🍦
* **Can I steal fries from your plate without you judging me?** 🍟
* **Are we ordering takeout & pizza tonight?** 🍕🎬
* **Coffee & bookstore date this weekend?** ☕📚

### 4. 🎮 Playful & Couple Banter
* **Will you let me win at Mario Kart just once?** 🏎️
* **Can I keep your oversized hoodie forever?** 🧥
* **Will you be my Player 2 for life?** 🎮
* **Can we adopt a golden retriever puppy together?** 🐶🐾

### 5. ✨ Deep & Heartfelt Connections
* **Will you hold my hand everywhere we go?** 🤝
* **Can we grow old and wrinkly together?** 👵👴

---

## 🚀 How to Use

### For Anyone Sending to a Beloved
1. **Choose or Write a Question**: Tap the **Question** button in the header to browse presets or build your own.
2. **Personalize**: Tap **Share**, enter your beloved's name (e.g., *Sarah* or *Babe*).
3. **Send**: Tap **WhatsApp**, **Telegram**, or **Copy Link**. When your recipient opens the page on their iPhone, Android, or laptop, it greets them personally, dodges their "No" clicks, and showers them with confetti when they say **Yes**!

---

## 💻 Developer Setup & Running Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18+ recommended)
* npm, pnpm, or yarn

### Quick Start
```bash
# 1. Clone your repository
git clone <your-repo-url>
cd will-you-be-my-valentine-main

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open http://localhost:5173/ in your browser
```

### Production Build
```bash
# Compile and bundle optimized static assets into /dist
npm run build

# Preview the production build locally
npm run preview
```

---

## 🌐 Deployment Guide

### Option 1: Vercel (Recommended — 1-Minute Setup)
1. Push this project to GitHub.
2. Visit [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and deploy.
4. Enjoy instant global CDN delivery with automatic HTTPS!

### Option 2: GitHub Pages (Built-In)
```bash
npm run deploy
```
*(Automatically builds the bundle and pushes to the `gh-pages` branch).*

### Option 3: Netlify
1. Run `npm run build`.
2. Drag and drop the `dist/` directory directly into [Netlify Drop](https://app.netlify.com/drop).

---

## 🔗 URL Query Parameters API

You can deeply link directly to any question, personalized name, or evasive behavior using URL query parameters:

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `q` | `string` | ID of the question preset | `?q=will-you-forgive-me` |
| `to` | `string` | Recipient name or nickname | `?to=Sarah` |
| `evasive`| `1` or `0` | Enable runaway "No" button mode | `?evasive=1` |

**Example Combined URL:**
```
https://your-domain.com/?q=do-you-love-me&to=Sarah&evasive=1
```

---

## 🔒 Privacy Policy Summary

This application is strictly **client-side** and operates with a zero-tracking philosophy:
* **Zero Remote Logging**: Personalized names and responses are never sent to a database or server.
* **No Telemetry**: No third-party tracking pixels, advertising beacons, or Google Analytics.
* **Local Storage Only**: Browser `localStorage` is used solely on your device to persist audio preferences.
* Read the full [Privacy Policy](./PRIVACY.md).

---

## 📄 License & Terms of Use

**Copyright (c) 2026 hxni. All Rights Reserved.**

This repository and all associated assets, source code, designs, and interactive elements are the **proprietary intellectual property of hxni**.

* **No Unauthorized Use**: No person or entity may copy, reproduce, modify, distribute, publish, sublicense, sell, or deploy this project or derivative works without prior explicit written permission from **hxni**.
* **Personal Viewing Only**: End-users are permitted to view and interact with the deployed application for personal, non-commercial entertainment.
* For full terms and licensing inquiries, refer to the [LICENSE](./LICENSE) file.

---

<div align="center">
  <b>Designed & Crafted with 💖 by <a href="#">hxni</a></b>
</div>
