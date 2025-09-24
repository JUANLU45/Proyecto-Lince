module.exports = {
  semi: true,
  trailingComma: 'always-multiline',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  
  // OVERRIDES ESPECÍFICOS PARA DIFERENTES TIPOS DE ARCHIVO
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        parser: 'typescript',
        printWidth: 80,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        trailingComma: 'always-multiline',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'avoid',
      },
    },
    {
      files: '*.{css,scss,less}',
      options: {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
};