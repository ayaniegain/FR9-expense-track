# ExpenseMate

A responsive personal expense tracker built with React, Redux Toolkit, React Router, and Vite.

## Getting started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```sh
npm run build
npm run preview
```

## Features

- Dashboard with total spending, record count, and the five most recent expenses.
- Create expenses with a name, date, and amount in Indian rupees.
- Search, edit, and delete records on the Expenses page.
- Responsive layout, accessible form labels, and keyboard-dismissable expense dialog.
- Redux Toolkit state shared between the dashboard and expenses routes.

The Redux store is in memory: expense records reset when the browser page is refreshed. Add persistence or connect an API if records need to survive reloads.

## Routes

- `/` — dashboard and recent expenses.
- `/expenses` — searchable expense list and record management.
