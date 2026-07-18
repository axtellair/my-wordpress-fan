# AXTELL FAN — Static site restructured for development

This repository was refactored into a small frontend project using Vite to make development and maintenance easier.

Quick start

1. Install dependencies

   npm install

2. Run dev server

   npm run dev

3. Build for production

   npm run build

4. Preview the production build

   npm run preview

What changed

- Moved inline CSS and JS into `src/` for componentized development.
- Added `package.json` and `vite.config.js` so you can use Vite for hot reload and builds.

Next steps

- Continue migrating the remaining styles from the original `index.html` into `src/styles/main.css`.
- Break larger UI pieces into components in `src/components/` if you want more structure (React/Vue conversion is also possible).
