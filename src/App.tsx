import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  tokens,
} from '@fluentui/react-components';
import {
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from '@fluentui/react-icons';
import { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import './App.css';

const SAMPLE_CONTENT = `# Welcome to the Markdown Editor

This is a **WYSIWYG markdown editor** built for the Microsoft Data Integration team.

## Features

- **Rich text editing** \u2014 write naturally with formatting toolbar
- **Markdown export** \u2014 download your content as \`.md\` files
- **Code view** \u2014 toggle to see and edit raw markdown
- **Tables, code blocks, task lists** \u2014 full markdown support

## Getting Started

Start typing below or use the toolbar to format your content. You can:

1. **Bold**, *italic*, ~~strikethrough~~, and __underline__ text
2. Create headings (H1-H6)
3. Insert links, images, and tables
4. Use code blocks with syntax highlighting

### Code Example

\`\`\`typescript
interface Pipeline {
  name: string;
  activities: Activity[];
  schedule: CronExpression;
}
\`\`\`

### Task List

- [x] Set up editor framework
- [x] Add Fluent UI toolbar
- [ ] Connect to data pipeline documentation
- [ ] Share with team

> **Tip:** Press \`Ctrl+Shift+M\` to toggle between visual and code view.

---

*Built for the Data Integration team*
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme}>
      <div className="app-root" style={{ background: tokens.colorNeutralBackground2 }}>
        <header className="app-header" style={{ borderBottomColor: tokens.colorNeutralStroke1 }}>
          <div className="app-header-left">
            <svg
              className="app-logo"
              width="32"
              height="32"
              viewBox="0 0 23 23"
              fill="none"
            >
              <rect width="11" height="11" fill="#f25022" />
              <rect x="12" width="11" height="11" fill="#7fba00" />
              <rect y="12" width="11" height="11" fill="#00a4ef" />
              <rect x="12" y="12" width="11" height="11" fill="#ffb900" />
            </svg>
            <div className="app-title">
              <h1>Markdown Editor</h1>
              <span className="app-subtitle">Data Integration</span>
            </div>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ color: tokens.colorNeutralForeground1 }}
          >
            {isDarkMode ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
          </button>
        </header>
        <main className="app-main">
          <Editor initialContent={SAMPLE_CONTENT} />
        </main>
      </div>
    </FluentProvider>
  );
}

export default App
