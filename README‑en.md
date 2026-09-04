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


## 模板示例：`react‑practice‑demo` 的 README‑en.md
```markdown
# react‑practice‑demo

> React18 + TypeScript + Vite technical demo project.
> Built for personal practice of React ecosystem. **No company business code included.**
> All data uses local mock, no backend required. Clone and run directly.

## Tech Stack
- React18, TypeScript, Vite
- Zustand for state management
- React‑Router‑Dom v6
- Axios, echarts‑for‑react
- ESLint, Prettier, Husky

## Key Features
### Engineering
1. Vite alias, dev proxy setup
2. ESLint + Prettier + Husky pre‑commit hooks
3. Axios request / response interceptor, unified error handling

### Components (TS Props type definitions)
1. `BaseDialog`: controlled modal
2. `BaseUpload`: simple file upload
3. `BasePagination`: pagination
4. `VirtualScrollTable` ⭐ hand‑written virtual scroll table for large dataset
5. `EchartsWrapper`: wrapped echarts component, chart type switch, time filter, instance dispose on unmount to prevent memory leak

### React Capability Demo
1. Custom React hooks: debounce & throttle, image lazy‑loading, auth hook
2. `useMemo` / `useCallback` optimization example
3. `React.lazy` + `Suspense` route lazy‑loading
4. Higher‑order protected route `AuthRoute` for login‑required page guard
5. Zustand store with localStorage persistence for simulated login

### Performance demos
- Route lazy‑loading
- Image lazy‑loading with IntersectionObserver
- Virtual‑scroll for big table
- ECharts instance cleanup to avoid memory leak

## Quick Start
```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm prepare # init husky on first clone
```

## Folder Overview

- `/api`: axios & mock data
- `/components`: base / business components & demo pages
- `/hooks`: custom react hooks
- `/router`: routes & protected AuthRoute component
- `/store`: zustand store
- `/utils`: helper functions
- `/views`: home, permission & performance demo pages

## Note

This repo is purely for personal technical practice. No production business logic.
`.vscode` contains editor config, not mandatory for running.


