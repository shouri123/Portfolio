# Shouri Chakraborty | AI Developer & Software Engineer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![GSAP](https://img.shields.io/badge/Animations-GSAP-88CE02?style=for-the-badge&logo=greenock&logoColor=white)](https://gsap.com/)

A premium, highly interactive, and visually stunning developer portfolio built using **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. The site leverages advanced **GSAP** timelines, micro-interactions, **Supabase** database integrations, and real-time **GitHub API** stats to deliver a premium agentic developer experience.

---

## 🚀 Key Features

* **Cinematic Visuals & Backgrounds**: Features a noise overlay, glassmorphism UI accents, and a seamless background video loop with GSAP ScrollTrigger parallax.
* **🏆 World Cup 2026 Mode (Limited Time FIFA Special)**:
  An exclusive seasonal event toggleable from the navigation bar. Shifts the entire portfolio into a stadium pitch layout with full gamification:
  * **Interactive Ultimate Card**: 3D mouse-tracked card displaying Shouri's custom skill scores (Learning Speed, Collaboration, UI Creativity, etc.) and revealing GitHub evidence drawers.
  * **Dream XI Squad Builder**: Pitch layout allowing visitors to drag/select projects into active tactical formations (4-3-3, 3-5-2, 4-2-3-1).
  * **Gold Pack Openings**: Loot-pack reveal sequence with animated flares, spotlights, and "walkout player" details for projects.
  * **VAR (Video Assistant Referee) Checker**: Custom VAR review sequence validating each selected project check.
  * **Transfer Market Portal**: Roster negotiation board supporting custom internship contract bids.
  * **Stadium commentary & Interactive Soundtracks**: Native playback of the World Cup theme song (`dai_dai.mp3` in loops) and rolling live ticker logs.
  * **Goalie AI Penalty Shootout**: Submitting a contact inquiry is locked behind scoring 3 goals on the canvas shootout goalie.
* **Advanced GSAP Animations & Interactions**:
  * **Dynamic Preloader**: Immersive entry animation utilizing custom font scaling.
  * **Custom Cursor**: Adaptive custom pointer dot.
  * **Magnetic Effects**: Snappy magnetic cursor attraction on interactive buttons and navigation links.
  * **Neural Network Canvas**: Real-time rendering of responsive node connections.
  * **3D Tilt Cards**: Fluid 3D perspective tilting on mouse-over.
  * **Text Pull-Ups**: Staggered character/word scroll reveals.
* **Command Palette (Cmd + K / Ctrl + K)**: A keyboard-accessible overlay allowing users to quick-navigate sections, download the resume, toggle theme settings, or jump directly to social platforms.
* **Live GitHub Stats Integration**:
  * Real-time contribution tracker, public repo counts, and longest streaks fetched via a custom cached API route `/api/github-stats`.
  * Customized `react-github-calendar` widget styled with custom theme colors and a patched legend showing current month labels.
* **Secure Admin Dashboard & Panel (`/admin`)**:
  * Cookie-based admin authentication.
  * Live inbox reader to view and manage incoming contact messages from Supabase.
* **Database & Content Management**:
  * Integration with **Supabase PostgreSQL** for loading active projects and caching contact form entries.
  * Built-in DB migration scripts.

---

## 🛠️ Technology Stack

* **Frontend Framework**: Next.js 16 (App Router) & React 19
* **Styling**: Tailwind CSS v4 & Vanilla CSS variables
* **Animations**: GSAP (GreenSock Animation Platform) & ScrollTrigger
* **Smooth Scrolling**: Lenis Scroll Provider
* **Database & Auth**: Supabase (PostgreSQL client)
* **API Handling**: Next.js Route Handlers (Edge-ready)
* **Package Manager**: npm

---

## 📂 Project Structure

```
├── .agent/                  # GSD agent configuration & workflows
├── public/                  # Static assets (PDFs, images, videos)
│   ├── Shouri_Chakraborty_Resume.pdf
│   ├── developer_portrait.jpg
│   └── videos/              # Seamless background loop videos
├── src/
│   ├── app/                 # Next.js App Router (pages & API endpoints)
│   │   ├── admin/           # Admin Dashboard & Login page
│   │   ├── api/             # API routes (contact, github-stats, admin auth)
│   │   ├── favicon.ico      # Multi-resolution favicon
│   │   ├── globals.css      # Core theme variables & global styles
│   │   ├── layout.tsx       # Global layouts, fonts, JSON-LD schema metadata
│   │   └── page.tsx         # Main portfolio entry
│   ├── components/          # Reusable UI sections and features
│   │   ├── animations/      # GSAP motion controls (magnetic, tilt, canvas)
│   │   ├── football/        # FIFA mode components (DreamXI, TransferMarket, FUT Card)
│   │   ├── AboutSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── GithubContributions.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   └── ProjectsShowcase.tsx
│   ├── lib/                 # Shared utilities (Supabase clients, Contexts)
│   └── proxy.ts             # Custom auth/admin middleware proxy
├── supabase/                # PostgreSQL DB schemas and migrations
│   └── migrations/          # Tables for contact messages & project seeds
└── next.config.ts           # Next.js framework configuration
```

---

## ⚙️ Local Development Setup

### 1. Prerequisites

Ensure you have **Node.js (v18+)** and **npm** installed.

### 2. Clone the Repository

```bash
git clone https://github.com/shouri123/Portfolio.git
cd Portfolio
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory and configure the following credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Panel Credentials
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET=your_jwt_signing_key

# Optional: GitHub API Access (prevents API rate-limiting)
GITHUB_TOKEN=your_github_personal_access_token
```

### 4. Database Setup (Supabase)

Run the SQL migration scripts located in the `supabase/migrations/` directory inside your Supabase SQL editor:
* `20260613063809_create_contact_messages_table.sql`: Creates the contact messages table.
* `20260613063857_create_projects_table_with_seed.sql`: Creates the projects table and seeds initial portfolio items.

### 5. Install Dependencies

```bash
npm install
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building and Deploying

To create an optimized production build:

```bash
npm run build
```

This compiles TypeScript, bundles static assets via Next.js Turbopack, and exports static routes.

### Deploying to Vercel

The easiest way to deploy this portfolio is using Vercel:
1. Connect your GitHub repository to Vercel.
2. Configure your Environment Variables in the project settings.
3. Deploy! Vercel will auto-detect Next.js and apply optimal build settings.

---

## 🤝 Contact & Connections

* **Developer**: Shouri Chakraborty
* **GitHub**: [@shouri123](https://github.com/shouri123)
* **LinkedIn**: [shouri-chakraborty](https://linkedin.com/in/shouri-chakraborty)
* **Instagram**: [@devshouri](https://instagram.com/devshouri)
* **Website**: [devshouri.in](https://devshouri.in)
