import type { Editor } from '@tiptap/react';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Tooltip,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Input,
  Label,
} from '@fluentui/react-components';
import {
  TextBold24Regular,
  TextItalic24Regular,
  TextUnderline24Regular,
  TextStrikethrough24Regular,
  TextHeader124Regular,
  TextHeader224Regular,
  TextHeader324Regular,
  TextBulletListLtr24Regular,
  TextNumberListLtr24Regular,
  Link24Regular,
  Image24Regular,
  Code24Regular,
  TextQuoteRegular,
  ArrowUndo24Regular,
  ArrowRedo24Regular,
  TableSimple24Regular,
  TextAlignLeft24Regular,
  TextAlignCenter24Regular,
  TextAlignRight24Regular,
  ArrowDownload24Regular,
  ArrowUpload24Regular,
  Copy24Regular,
  TaskListLtr24Regular,
  Highlight24Regular,
  DismissRegular,
  LineHorizontal124Regular,
  ChevronDown24Regular,
} from '@fluentui/react-icons';
import { useState, useCallback } from 'react';
import './EditorToolbar.css';

interface EditorToolbarProps {
  editor: Editor;
  isCodeView: boolean;
  onToggleCodeView: () => void;
  onExportMarkdown: () => void;
  onImportMarkdown: () => void;
  onCopyMarkdown: () => void;
}

export function EditorToolbar({
  editor,
  isCodeView,
  onToggleCodeView,
  onExportMarkdown,
  onImportMarkdown,
  onCopyMarkdown,
}: EditorToolbarProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const handleSetLink = useCallback(() => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      if (linkText && editor.state.selection.empty) {
        editor.chain().focus().insertContent(linkText).run();
      }
    }
    setLinkUrl('');
    setLinkText('');
    setLinkDialogOpen(false);
  }, [editor, linkUrl, linkText]);

  const handleInsertImage = useCallback(() => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
    }
    setImageUrl('');
    setImageAlt('');
    setImageDialogOpen(false);
  }, [editor, imageUrl, imageAlt]);

  return (
    <>
      <div className="toolbar-container">
        <Toolbar aria-label="Editor formatting" size="small">
          {/* Undo / Redo */}
          <Tooltip content="Undo (Ctrl+Z)" relationship="label">
            <ToolbarButton
              icon={<ArrowUndo24Regular />}
              onClick={() => editor.chain().focus().undo().run()}
              disabled={isCodeView || !editor.can().undo()}
            />
          </Tooltip>
          <Tooltip content="Redo (Ctrl+Y)" relationship="label">
            <ToolbarButton
              icon={<ArrowRedo24Regular />}
              onClick={() => editor.chain().focus().redo().run()}
              disabled={isCodeView || !editor.can().redo()}
            />
          </Tooltip>

          <ToolbarDivider />

          {/* Headings dropdown */}
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Tooltip content="Headings" relationship="label">
                <ToolbarButton
                  icon={<TextHeader124Regular />}
                  disabled={isCodeView}
                >
                  <ChevronDown24Regular style={{ width: 12, height: 12 }} />
                </ToolbarButton>
              </Tooltip>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem
                  icon={<TextHeader124Regular />}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  Heading 1
                </MenuItem>
                <MenuItem
                  icon={<TextHeader224Regular />}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  Heading 2
                </MenuItem>
                <MenuItem
                  icon={<TextHeader324Regular />}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  Heading 3
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    editor.chain().focus().setParagraph().run()
                  }
                >
                  Paragraph
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>

          <ToolbarDivider />

          {/* Text formatting */}
          <Tooltip content="Bold (Ctrl+B)" relationship="label">
            <ToolbarButton
              icon={<TextBold24Regular />}
              className={editor.isActive('bold') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Italic (Ctrl+I)" relationship="label">
            <ToolbarButton
              icon={<TextItalic24Regular />}
              className={editor.isActive('italic') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Underline (Ctrl+U)" relationship="label">
            <ToolbarButton
              icon={<TextUnderline24Regular />}
              className={editor.isActive('underline') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Strikethrough" relationship="label">
            <ToolbarButton
              icon={<TextStrikethrough24Regular />}
              className={editor.isActive('strike') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Highlight" relationship="label">
            <ToolbarButton
              icon={<Highlight24Regular />}
              className={editor.isActive('highlight') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Inline Code" relationship="label">
            <ToolbarButton
              icon={<Code24Regular />}
              className={editor.isActive('code') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={isCodeView}
            />
          </Tooltip>

          <ToolbarDivider />

          {/* Text alignment */}
          <Tooltip content="Align Left" relationship="label">
            <ToolbarButton
              icon={<TextAlignLeft24Regular />}
              className={editor.isActive({ textAlign: 'left' }) ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Align Center" relationship="label">
            <ToolbarButton
              icon={<TextAlignCenter24Regular />}
              className={editor.isActive({ textAlign: 'center' }) ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Align Right" relationship="label">
            <ToolbarButton
              icon={<TextAlignRight24Regular />}
              className={editor.isActive({ textAlign: 'right' }) ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              disabled={isCodeView}
            />
          </Tooltip>

          <ToolbarDivider />

          {/* Lists */}
          <Tooltip content="Bullet List" relationship="label">
            <ToolbarButton
              icon={<TextBulletListLtr24Regular />}
              className={editor.isActive('bulletList') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Numbered List" relationship="label">
            <ToolbarButton
              icon={<TextNumberListLtr24Regular />}
              className={editor.isActive('orderedList') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Task List" relationship="label">
            <ToolbarButton
              icon={<TaskListLtr24Regular />}
              className={editor.isActive('taskList') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              disabled={isCodeView}
            />
          </Tooltip>

          <ToolbarDivider />

          {/* Block elements */}
          <Tooltip content="Blockquote" relationship="label">
            <ToolbarButton
              icon={<TextQuoteRegular />}
              className={editor.isActive('blockquote') ? 'toolbar-btn-active' : ''}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Code Block" relationship="label">
            <ToolbarButton
              icon={<Code24Regular />}
              onClick={() =>
                editor.chain().focus().toggleCodeBlock().run()
              }
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Horizontal Rule" relationship="label">
            <ToolbarButton
              icon={<LineHorizontal124Regular />}
              onClick={() =>
                editor.chain().focus().setHorizontalRule().run()
              }
              disabled={isCodeView}
            />
          </Tooltip>

          <ToolbarDivider />

          {/* Insert elements */}
          <Tooltip content="Insert Link" relationship="label">
            <ToolbarButton
              icon={<Link24Regular />}
              onClick={() => {
                const { from, to } = editor.state.selection;
                const selectedText = editor.state.doc.textBetween(from, to);
                setLinkText(selectedText);
                setLinkUrl(editor.getAttributes('link').href || '');
                setLinkDialogOpen(true);
              }}
              disabled={isCodeView}
            />
          </Tooltip>
          {editor.isActive('link') && (
            <Tooltip content="Remove Link" relationship="label">
              <ToolbarButton
                icon={<DismissRegular />}
                onClick={() =>
                  editor.chain().focus().unsetLink().run()
                }
                disabled={isCodeView}
              />
            </Tooltip>
          )}
          <Tooltip content="Insert Image" relationship="label">
            <ToolbarButton
              icon={<Image24Regular />}
              onClick={() => setImageDialogOpen(true)}
              disabled={isCodeView}
            />
          </Tooltip>
          <Tooltip content="Insert Table" relationship="label">
            <ToolbarButton
              icon={<TableSimple24Regular />}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              disabled={isCodeView}
            />
          </Tooltip>
        </Toolbar>

        {/* Secondary toolbar row with file actions and view toggle */}
        <div className="toolbar-secondary">
          <div className="toolbar-secondary-left">
            <Tooltip content="Import Markdown File" relationship="label">
              <Button
                icon={<ArrowUpload24Regular />}
                appearance="subtle"
                size="small"
                onClick={onImportMarkdown}
              >
                Import
              </Button>
            </Tooltip>
            <Tooltip content="Export as Markdown" relationship="label">
              <Button
                icon={<ArrowDownload24Regular />}
                appearance="subtle"
                size="small"
                onClick={onExportMarkdown}
              >
                Export
              </Button>
            </Tooltip>
            <Tooltip content="Copy as Markdown" relationship="label">
              <Button
                icon={<Copy24Regular />}
                appearance="subtle"
                size="small"
                onClick={onCopyMarkdown}
              >
                Copy MD
              </Button>
            </Tooltip>
          </div>
          <div className="toolbar-secondary-right">
            <Tooltip
              content={isCodeView ? 'Switch to Visual Editor' : 'Switch to Markdown Source (Ctrl+Shift+M)'}
              relationship="label"
            >
              <Button
                appearance={isCodeView ? 'primary' : 'subtle'}
                size="small"
                icon={<Code24Regular />}
                onClick={onToggleCodeView}
              >
                {isCodeView ? 'Visual' : 'Code'}
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={(_e, data) => setLinkDialogOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    value={linkUrl}
                    onChange={(_e, data) => setLinkUrl(data.value)}
                    placeholder="https://..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <Label htmlFor="link-text">Display Text (optional)</Label>
                  <Input
                    id="link-text"
                    value={linkText}
                    onChange={(_e, data) => setLinkText(data.value)}
                    placeholder="Link text"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
              <Button appearance="primary" onClick={handleSetLink}>
                Insert
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={(_e, data) => setImageDialogOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    value={imageUrl}
                    onChange={(_e, data) => setImageUrl(data.value)}
                    placeholder="https://..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <Label htmlFor="image-alt">Alt Text</Label>
                  <Input
                    id="image-alt"
                    value={imageAlt}
                    onChange={(_e, data) => setImageAlt(data.value)}
                    placeholder="Description of image"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
              <Button appearance="primary" onClick={handleInsertImage}>
                Insert
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
}
