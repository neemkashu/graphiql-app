import { tags as t } from '@lezer/highlight';
import { createTheme, CreateThemeOptions } from '@uiw/codemirror-themes';

export const customTheme = createTheme({
  theme: 'dark',
  settings: {
    background: 'transparent',
    caret: '#6bc2fc',
    foreground: '#9293a0',
    gutterBackground: '#181922',
    selection: '#181922',
    selectionMatch: '#181922',
    lineHighlight: '#181922',
    gutterForeground: '#9293a0',
  },
  styles: [
    { tag: t.keyword, color: '#bb9af7' },
    { tag: [t.name, t.deleted, t.character, t.macroName], color: '#c0caf5' },
    { tag: [t.propertyName], color: '#6bc2fc' },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: '#9ece6a',
    },
    { tag: [t.function(t.variableName), t.labelName], color: '#6bc2fc' },
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#bb9af7' },
    { tag: [t.definition(t.name), t.separator], color: '#c0caf5' },
    { tag: [t.className], color: '#c0caf5' },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: '#ff9e64',
    },
    { tag: [t.typeName], color: '#2ac3de', fontStyle: '#2ac3de' },
    { tag: [t.operator, t.operatorKeyword], color: '#bb9af7' },
    { tag: [t.url, t.escape, t.regexp, t.link], color: '#b4f9f8' },
    { tag: [t.meta, t.comment], color: '#9293a0' },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.link, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: '#89ddff' },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#c0caf5' },
    { tag: t.invalid, color: '#ff5370' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
  ],
});
