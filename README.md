# Flesh & Blood Card Search Tool

A modern, responsive web application for searching Flesh & Blood trading cards using the official @flesh-and-blood/cards API and fuzzy search with Fuse.js.

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## How to Use


## Project Structure

```
app/
├── components/          # Vue components
│   └── cardDetails.vue # Card information display
├── middleware/          # Services and utilities
│   └── services/
│       └── cardSearchService.ts # Fuse.js search implementation
├── pages/               # Application pages
│   └── index.vue        # Main search page
├── stores/              # Pinia stores
│   ├── cardStore.ts     # Card data management
│   └── themeStore.ts    # Dark mode state
├── types/               # TypeScript definitions
│   ├── card.ts          # Card interface
│   └── pitch.ts         # Pitch enum
└── app.vue              # Root component with theme toggle
```

## Production

Build the application for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```
