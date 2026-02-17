import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useState, useCallback, useEffect } from 'react';
import { Textarea } from '@fluentui/react-components';
import { EditorToolbar } from './EditorToolbar';
import { htmlToMarkdown, markdownToHtml } from '../utils/markdown';
import './Editor.css';

const lowlight = createLowlight(common);

interface EditorProps {
  initialContent?: string;
}

export function Editor({ initialContent }: EditorProps) {
  const [isCodeView, setIsCodeView] = useState(false);
  const [markdownSource, setMarkdownSource] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Color,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialContent
      ? markdownToHtml(initialContent)
      : '<p></p>',
    editorProps: {
      attributes: {
        class: 'editor-content',
      },
    },
  });

  // Sync markdown source when switching to code view
  const handleToggleCodeView = useCallback(() => {
    if (!editor) return;
    if (!isCodeView) {
      // Switching to code view: serialize current content to markdown
      const html = editor.getHTML();
      const md = htmlToMarkdown(html);
      setMarkdownSource(md);
    } else {
      // Switching back to visual: parse markdown into editor
      const html = markdownToHtml(markdownSource);
      editor.commands.setContent(html);
    }
    setIsCodeView(!isCodeView);
  }, [editor, isCodeView, markdownSource]);

  // Handle Ctrl+Shift+M to toggle code view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'm') {
        e.preventDefault();
        handleToggleCodeView();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleCodeView]);

  const handleExportMarkdown = useCallback(() => {
    if (!editor) return;
    const html = editor.getHTML();
    const md = htmlToMarkdown(html);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  }, [editor]);

  const handleImportMarkdown = useCallback(() => {
    if (!editor) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.markdown,.txt';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      const html = markdownToHtml(text);
      editor.commands.setContent(html);
    };
    input.click();
  }, [editor]);

  const handleCopyMarkdown = useCallback(() => {
    if (!editor) return;
    const html = editor.getHTML();
    const md = htmlToMarkdown(html);
    navigator.clipboard.writeText(md);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="editor-container">
      <EditorToolbar
        editor={editor}
        isCodeView={isCodeView}
        onToggleCodeView={handleToggleCodeView}
        onExportMarkdown={handleExportMarkdown}
        onImportMarkdown={handleImportMarkdown}
        onCopyMarkdown={handleCopyMarkdown}
      />
      <div className="editor-body">
        {isCodeView ? (
          <Textarea
            className="code-view"
            value={markdownSource}
            onChange={(_e, data) => setMarkdownSource(data.value)}
            resize="none"
            textarea={{ className: 'code-textarea' }}
            appearance="filled-lighter"
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
}
