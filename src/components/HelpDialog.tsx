import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Button,
  TabList,
  Tab,
} from '@fluentui/react-components';
import { useState } from 'react';
import './HelpDialog.css';

const isMac = navigator.platform.toUpperCase().includes('MAC');
const mod = isMac ? '⌘' : 'Ctrl';

interface ShortcutEntry {
  keys: string;
  description: string;
}

const shortcuts: ShortcutEntry[] = [
  { keys: `${mod}+B`, description: 'Bold' },
  { keys: `${mod}+I`, description: 'Italic' },
  { keys: `${mod}+U`, description: 'Underline' },
  { keys: `${mod}+Shift+X`, description: 'Strikethrough' },
  { keys: `${mod}+E`, description: 'Inline code' },
  { keys: `${mod}+Shift+H`, description: 'Highlight' },
  { keys: `${mod}+Z`, description: 'Undo' },
  { keys: `${mod}+${isMac ? 'Shift+Z' : 'Y'}`, description: 'Redo' },
  { keys: `${mod}+Shift+M`, description: 'Toggle code / visual view' },
  { keys: `${mod}+Shift+7`, description: 'Numbered list' },
  { keys: `${mod}+Shift+8`, description: 'Bullet list' },
  { keys: `${mod}+Shift+B`, description: 'Blockquote' },
  { keys: 'Tab / Shift+Tab', description: 'Indent / outdent list items' },
  { keys: 'Enter', description: 'New list item or paragraph' },
];

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  const [selectedTab, setSelectedTab] = useState<string>('guide');

  return (
    <Dialog open={open} onOpenChange={(_e, data) => onOpenChange(data.open)}>
      <DialogSurface className="help-dialog-surface">
        <DialogBody>
          <DialogTitle>Help &amp; User Guide</DialogTitle>
          <DialogContent>
            <TabList
              selectedValue={selectedTab}
              onTabSelect={(_e, data) => setSelectedTab(data.value as string)}
              size="small"
              style={{ marginBottom: 16 }}
            >
              <Tab value="guide">Getting Started</Tab>
              <Tab value="shortcuts">Keyboard Shortcuts</Tab>
              <Tab value="features">Features</Tab>
            </TabList>

            {selectedTab === 'guide' && (
              <div className="help-section">
                <p>
                  Welcome to the <strong>Markdown Editor</strong> — a visual-first editor built
                  for the Microsoft Data Integration team.
                </p>

                <h3>Quick Start</h3>
                <ol>
                  <li>Start typing in the editor area to create content.</li>
                  <li>Use the <strong>toolbar</strong> above the editor to apply formatting (bold, headings, lists, etc.).</li>
                  <li>Click <strong>Code</strong> (or press <kbd>{mod}+Shift+M</kbd>) to toggle between visual editing and raw markdown.</li>
                  <li>Use <strong>Export</strong> to download your document as a <code>.md</code> file.</li>
                  <li>Use <strong>Import</strong> to open an existing markdown file.</li>
                  <li>Use <strong>Copy MD</strong> to copy the markdown source to your clipboard.</li>
                </ol>

                <h3>Tips</h3>
                <ul>
                  <li>Type <code># </code>, <code>## </code>, or <code>### </code> at the start of a line to create headings.</li>
                  <li>Type <code>- </code> or <code>1. </code> to start a list.</li>
                  <li>Type <code>```</code> to create a code block.</li>
                  <li>Type <code>&gt; </code> to create a blockquote.</li>
                  <li>Type <code>---</code> for a horizontal rule.</li>
                  <li>Use the theme toggle (sun/moon icon) in the header to switch between light and dark mode.</li>
                </ul>
              </div>
            )}

            {selectedTab === 'shortcuts' && (
              <div className="help-section">
                <table className="help-shortcuts-table">
                  <thead>
                    <tr>
                      <th>Shortcut</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shortcuts.map((s) => (
                      <tr key={s.keys}>
                        <td>
                          <kbd>{s.keys}</kbd>
                        </td>
                        <td>{s.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedTab === 'features' && (
              <div className="help-section">
                <h3>Toolbar</h3>
                <p>The main toolbar provides quick access to all formatting options:</p>
                <ul>
                  <li><strong>Undo / Redo</strong> — Navigate your edit history.</li>
                  <li><strong>Headings</strong> — Dropdown to select H1, H2, H3, or Paragraph.</li>
                  <li><strong>Text formatting</strong> — Bold, italic, underline, strikethrough, highlight, inline code.</li>
                  <li><strong>Alignment</strong> — Left, center, and right text alignment.</li>
                  <li><strong>Lists</strong> — Bullet, numbered, and task lists (with checkboxes).</li>
                  <li><strong>Block elements</strong> — Blockquotes, fenced code blocks, horizontal rules.</li>
                  <li><strong>Insert</strong> — Links, images, and 3×3 tables.</li>
                </ul>

                <h3>File Operations</h3>
                <ul>
                  <li><strong>Import</strong> — Load a <code>.md</code> file from disk into the editor.</li>
                  <li><strong>Export</strong> — Save the current content as a <code>.md</code> file.</li>
                  <li><strong>Copy MD</strong> — Copy the raw markdown to the clipboard.</li>
                </ul>

                <h3>Code View</h3>
                <p>
                  Toggle between the visual (WYSIWYG) editor and a raw markdown code editor.
                  Changes in either mode are synced when you switch. Use <kbd>{mod}+Shift+M</kbd> or
                  the <strong>Code / Visual</strong> button in the toolbar.
                </p>

                <h3>Themes</h3>
                <p>
                  The editor automatically detects your system theme (light or dark). You can manually
                  override it using the sun/moon toggle in the top-right corner of the header.
                </p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
