# Recipe Box

A small recipe app: browse a list of recipes, open one to read its ingredients
and steps, add a new recipe and edit existing ones.

It is a plain [Vite](https://vite.dev) + TypeScript front end with no backend.
Recipes are saved in the browser's `localStorage`, and a dozen starter recipes
are added the first time the app runs.

## Run it

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Test and build

```sh
npm test        # run the Vitest suite
npm run build   # type-check and build to dist/
```

## Project layout

```
index.html          page shell and header
src/main.ts         hash router (#/, #/new, #/recipe/:id, #/recipe/:id/edit)
src/storage.ts      load and save recipes in localStorage
src/seed.ts         starter recipes
src/format.ts       display helpers (dates, cooking times, HTML escaping)
src/views/          list, detail and add/edit form
src/style.css       styles, with colours defined as CSS variables in :root
tests/              Vitest tests
```

To start over with the starter recipes, clear the site's local storage in your
browser's developer tools.
