import TurndownService from 'turndown';
import Showdown from 'showdown';

// HTML -> Markdown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
});

// Handle strikethrough
turndownService.addRule('strikethrough', {
  filter: ['del', 's'],
  replacement: (content) => `~~${content}~~`,
});

// Handle task lists
turndownService.addRule('taskListItem', {
  filter: (node) => {
    return (
      node.nodeName === 'LI' &&
      node.getAttribute('data-type') === 'taskItem'
    );
  },
  replacement: (content, node) => {
    const element = node as HTMLElement;
    const checked = element.getAttribute('data-checked') === 'true';
    return `${checked ? '- [x]' : '- [ ]'} ${content.trim()}\n`;
  },
});

// Handle tables
turndownService.addRule('tableCell', {
  filter: ['th', 'td'],
  replacement: (content) => ` ${content.trim()} |`,
});

turndownService.addRule('tableRow', {
  filter: 'tr',
  replacement: (content, node) => {
    const row = `|${content}\n`;
    const element = node as HTMLElement;
    const parent = element.parentElement;
    if (parent && parent.nodeName === 'THEAD') {
      const cells = element.querySelectorAll('th, td');
      const separator = `|${Array.from(cells).map(() => ' --- |').join('')}\n`;
      return row + separator;
    }
    return row;
  },
});

turndownService.addRule('table', {
  filter: 'table',
  replacement: (_content, node) => {
    const element = node as HTMLElement;
    const thead = element.querySelector('thead');
    const tbody = element.querySelector('tbody');
    let result = '';
    if (thead) {
      const rows = thead.querySelectorAll('tr');
      rows.forEach((row) => {
        result += `|`;
        row.querySelectorAll('th, td').forEach((cell) => {
          result += ` ${cell.textContent?.trim() || ''} |`;
        });
        result += '\n';
        result += `|`;
        row.querySelectorAll('th, td').forEach(() => {
          result += ' --- |';
        });
        result += '\n';
      });
    }
    if (tbody) {
      tbody.querySelectorAll('tr').forEach((row) => {
        result += `|`;
        row.querySelectorAll('th, td').forEach((cell) => {
          result += ` ${cell.textContent?.trim() || ''} |`;
        });
        result += '\n';
      });
    }
    return '\n' + result + '\n';
  },
});

// Handle highlight/mark
turndownService.addRule('highlight', {
  filter: 'mark',
  replacement: (content) => `==${content}==`,
});

export function htmlToMarkdown(html: string): string {
  return turndownService.turndown(html);
}

// Markdown -> HTML
const showdownConverter = new Showdown.Converter({
  tables: true,
  tasklists: true,
  strikethrough: true,
  ghCodeBlocks: true,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  openLinksInNewWindow: true,
  emoji: true,
  underline: true,
  simpleLineBreaks: false,
});

export function markdownToHtml(markdown: string): string {
  return showdownConverter.makeHtml(markdown);
}
