# React + TypeScript + Vite

This project is a modern frontend setup using **React**, **TypeScript**, and **Vite** for fast development and optimized builds.

## Requirements

- Node.js (LTS recommended)
- npm (comes with Node.js)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

Create `.env` file and fill values (see .env.example):
VITE_API_BASE_URL - with back-end url
VITE_CLERK_PUBLISHABLE_KEY - clerk publishable key
VITE_TOKEN_TEMPLATE - not mandatory. Used as reference for custom JWT template with email claim

3. Start development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Build

```
npm run build
```

The production-ready files will be generated in the dist/ directory.
