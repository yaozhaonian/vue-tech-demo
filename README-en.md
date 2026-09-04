# vue‑tech‑demo

> Vue3 + TypeScript + Vite technical demonstration project.
> This repository is a personal technical practice, **NO commercial / company business code included**.
> All data comes from local mock, no backend service required. You can clone and run it directly.

## Tech Stack
- Vue3, TypeScript, Vite
- Pinia, Vue‑Router
- Axios, ECharts
- ESLint, Prettier, Husky

## Key Features
### Engineering Practice
1. Vite path alias, development proxy configuration
2. ESLint + Prettier + Husky pre‑commit hooks for code style
3. Axios interceptor with unified error handling
4. Simulated login authentication with route guards

### Reusable Components (fully typed with TypeScript)
1. `BaseDialog`: controlled modal component
2. `BaseUpload`: simple file upload component
3. `BasePagination`: pagination component
4. `VirtualScrollTable` ⭐: hand‑written virtual‑scroll table for rendering 1000+ rows, DOM reuse for performance
5. `EchartsWrapper`: wrapped ECharts component, support line / bar chart, time‑range filter, instance dispose to avoid memory leak

### Reactivity & Performance Demo
1. Vue composables: debounce, throttle, image lazy‑loading
2. Route lazy‑loading
3. WebP image lazy‑loading

## Quick Start
```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm prepare # initialize husky after first clone
```

## Project Structure Brief

- `/api`: axios wrapper & mock data
- `/components`: base / business components & demo pages
- `/composables`: vue composition functions
- `/router`: routes & permission guard
- `/store`: pinia store
- `/utils`: utility functions
- `/views`: demo pages for features & performance

## Note

- This project is for technical demonstration only. No real‑world business logic.
- `.vscode` folder is editor settings, not required for project running.



