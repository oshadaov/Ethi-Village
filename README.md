# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Firebase image upload + rules + CORS setup

1. Add your firebase `.env` values (already present in `.env`). Add admin credentials:
   - `VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD`.
2. Firestore rules are in `firestore.rules`:
   - `site_images` readable/writable by anyone in this local admin mode.
   - You can harden this in production using Firebase Auth with custom claims.
3. Storage rules are mostly disabled in `storage.rules` because this implementation saves images directly in Firestore documents (`imageDataUrl`).

### GCS CORS fix for local dev

Create a `cors.json` (already present) and run:

```bash
npm install -g firebase-tools # if needed
gcloud auth login
gcloud config set project ethi-village
gsutil cors set cors.json gs://ethi-village.appspot.com
gsutil cors get gs://ethi-village.appspot.com
```

If your bucket name is `ethi-village.firebasestorage.app`, use that bucket URI instead.

### Usage

- Admin UI: `src/pages/AdminImage.jsx` supports upload + overwrite + delete.
- Public loader: `src/hooks/useSiteImages.js` reads image URLs from Firestore.
- `src/utils/siteImageHelpers.js` is helper getter for fallback images.
