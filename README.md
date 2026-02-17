# Markdown Editor

A WYSIWYG markdown editor built for the Microsoft Data Integration team. Visual-first editing with Fluent UI, powered by TipTap.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Fluent UI](https://img.shields.io/badge/Fluent%20UI-0078D4?logo=microsoft&logoColor=white)

## Features

- **Visual-first editing** — WYSIWYG is the default mode; write naturally without touching markdown syntax
- **Fluent UI toolbar** — Microsoft-native look and feel with full formatting controls
- **Code view toggle** — Switch to raw markdown editing with `Ctrl+Shift+M` (or `Cmd+Shift+M` on Mac)
- **Rich formatting** — Bold, italic, underline, strikethrough, highlight, inline code
- **Block elements** — Headings (H1–H6), blockquotes, code blocks with syntax highlighting, horizontal rules
- **Lists** — Bullet, numbered, and task lists with checkboxes
- **Tables** — Insert and edit tables with header rows
- **Links & images** — Dialog-based insertion for links and images
- **Text alignment** — Left, center, right
- **File operations** — Import `.md` files, export as `.md`, copy markdown to clipboard
- **Dark/light theme** — Auto-detects system preference with manual toggle

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Editor | TipTap (ProseMirror) |
| UI Components | Fluent UI v9 |
| Icons | Fluent UI Icons |
| Syntax Highlighting | lowlight (highlight.js) |
| Markdown ↔ HTML | Turndown + Showdown |

## Project Structure

```
src/
├── components/
│   ├── Editor.tsx          # TipTap editor with all extensions
│   ├── Editor.css          # Editor and content styles
│   ├── EditorToolbar.tsx   # Fluent UI formatting toolbar
│   └── EditorToolbar.css   # Toolbar styles
├── utils/
│   └── markdown.ts         # HTML ↔ Markdown conversion
├── App.tsx                 # App shell with theme and branding
├── App.css                 # Layout styles
├── index.css               # Global reset
└── main.tsx                # Entry point
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+U` | Underline |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+Shift+M` | Toggle code view |

## License

MIT
