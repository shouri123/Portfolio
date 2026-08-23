# Shouri Chakraborty | AI Developer & Software Engineer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![GSAP](https://img.shields.io/badge/Animations-GSAP-88CE02?style=for-the-badge&logo=greenock&logoColor=white)](https://gsap.com/)

A premium, highly interactive, and visually stunning developer portfolio and digital presence OS built using **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. The site leverages advanced **GSAP** timelines, micro-interactions, **Supabase PostgreSQL** database integrations, an interactive **Command Center Admin OS**, and real-time **GitHub API** stats to deliver an agentic, cinematic developer experience.

---

## 🚀 Key Features

* **Cinematic Visuals & Backgrounds**: Features a noise overlay, glassmorphism UI accents, and seamless background video loops with GSAP ScrollTrigger parallax.
* **Advanced GSAP Animations & Interactions**:
  * **Dynamic Preloader**: Immersive entry animation utilizing custom font scaling.
  * **Custom Cursor & Magnetic Effects**: Snappy magnetic cursor attraction on interactive buttons and navigation links.
  * **Neural Network Canvas**: Real-time rendering of responsive node connections.
  * **3D Tilt Cards**: Fluid 3D perspective tilting on mouse-over.
  * **Staggered Text Pull-Ups**: Fluid character/word scroll reveals.
* **Command Palette (Cmd + K / Ctrl + K)**: A keyboard-accessible overlay allowing users to quick-navigate sections, download the resume, copy contacts, or jump directly to projects.
* **Live GitHub Telemetry & Stats**:
  * Real-time contribution tracker, public repository count, stars, and longest streaks fetched via custom cached API routes.
  * Customized `react-github-calendar` widget styled with custom theme colors and current month indicators.
* **Digital OS Command Center Dashboard (`/admin`)**:
  * Cookie-based admin authentication session management.
  * **Portfolio CMS**: Create, edit, and toggle active portfolio projects.
  * **GitHub Repos Browser**: One-click import of public repositories from `@shouri123` into the portfolio showcase.
  * **Inbound Opportunity CRM**: Real-time reader and status manager for incoming contact submissions.
  * **Developer CLI Console**: Interactive BASH-style terminal to query system metrics, trigger syncs, and audit telemetry.
* **Automated Supabase Health & Telemetry Pipeline**:
  * Scheduled daily health maintenance (via Vercel Cron & GitHub Actions) keeping the database active and monitoring query latency.
  * Real-time operational status displayed directly in the developer dashboard.

---

## 🛠️ Technology Stack

* **Frontend Framework**: Next.js 16 (App Router) & React 19
* **Styling**: Tailwind CSS v4 & Vanilla CSS custom properties
* **Motion & Animations**: GSAP (GreenSock Animation Platform) & ScrollTrigger
* **Smooth Scrolling**: Lenis Smooth Scroll Provider
* **Database & Auth**: Supabase (PostgreSQL client)
* **Automation & Cron**: Vercel Cron & GitHub Actions
* **API Handling**: Next.js Route Handlers (Edge & Node.js runtimes)
* **Package Manager**: npm

---

## 📂 Project Structure

```
├── .agent/                  # GSD agent configuration & workflows
├── .github/                 # GitHub Actions workflows (health checks, CI)
│   └── workflows/
│       └── health-check.yml
├── public/                  # Static assets (PDFs, images, videos)
│   ├── Shouri_Chakraborty_Resume.pdf
│   ├── developer_portrait.jpg
│   └── videos/              # Seamless background loop videos
├── src/
│   ├── app/                 # Next.js App Router (pages & API endpoints)
│   │   ├── admin/           # Command Center Dashboard & Login
│   │   ├── api/             # API routes (contact, cron/health, github-stats, admin CMS)
│   │   ├── favicon.ico      # Multi-resolution favicon
│   │   ├── globals.css      # Core theme variables & global styles
│   │   ├── layout.tsx       # Global layouts, fonts, JSON-LD schema metadata
│   │   └── page.tsx         # Main portfolio entry
│   ├── components/          # Reusable UI sections and features
│   │   ├── animations/      # GSAP motion controls (magnetic, tilt, canvas)
│   │   ├── AboutSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── FooterSection.tsx
│   │   ├── GithubContributions.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectsShowcase.tsx
│   │   └── TechStackSection.tsx
│   ├── lib/                 # Shared utilities (Supabase client, Security, Command Center store)
│   └── proxy.ts             # Custom auth/admin middleware proxy
├── supabase/                # PostgreSQL DB schemas and migrations
│   └── migrations/          # Tables for contact messages, project seeds, & system_health
├── vercel.json              # Vercel deployment headers & automated cron configuration
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

# Cron Security Secret (for automated health checks)
CRON_SECRET=your_random_secure_cron_secret

# Optional: GitHub API Access (prevents API rate-limiting)
GITHUB_TOKEN=your_github_personal_access_token
```

### 4. Database Setup (Supabase)

Run the SQL migration scripts located in the `supabase/migrations/` directory inside your Supabase SQL editor:
* `20260613063809_create_contact_messages_table.sql`: Creates the contact messages table.
* `20260613063857_create_projects_table_with_seed.sql`: Creates the projects table and initial seed data.
* `20260824000000_create_system_health_table.sql`: Creates the system health telemetry table.

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

This compiles TypeScript, bundles static assets via Next.js Turbopack, and exports static/dynamic routes.

### Deploying to Vercel

The easiest way to deploy this portfolio is using Vercel:
1. Connect your GitHub repository to Vercel.
2. Configure your Environment Variables in the project settings (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CRON_SECRET`).
3. Deploy! Vercel will auto-detect Next.js and apply the `vercel.json` cron configurations.

---

## 🤝 Contact & Connections

* **Developer**: Shouri Chakraborty
* **GitHub**: [@shouri123](https://github.com/shouri123)
* **LinkedIn**: [shouri-chakraborty](https://linkedin.com/in/shouri-chakraborty)
* **Instagram**: [@devshouri](https://instagram.com/devshouri)
* **Website**: [devshouri.in](https://devshouri.in)
