module.exports = {
  root: true,
  extends: [
    'expo',
    '@react-native-community',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    'react-hooks',
    'react-native',
    '@typescript-eslint',
    'import',
    'jsx-a11y',
  ],
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      alias: {
        '@': './src',
        '@assets': './assets',
        '@components': './src/components',
        '@screens': './src/screens',
        '@services': './src/services',
        '@stores': './src/store',
        '@types': './src/types',
        '@utils': './src/utils',
        '@constants': './src/constants',
      },
    },
  },
  rules: {
    // REGLAS CRÍTICAS PARA PROYECTO LINCE
    
    // PROHIBIDO: Código placebo y temporal
    'no-console': 'error', // Prohibido console.log en producción
    'no-debugger': 'error', // Prohibido debugger
    'no-alert': 'error', // Prohibido alert()
    'no-todo-comments': 'error', // Prohibido TODO comments
    'no-unused-vars': 'error', // Variables no usadas
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unreachable': 'error', // Código inalcanzable
    'no-dead-code': 'error', // Código muerto
    
    // COMPLEJIDAD MÁXIMA: 15
    'complexity': ['error', { max: 15 }],
    'max-depth': ['error', 4], // Máximo 4 niveles de anidación
    'max-nested-callbacks': ['error', 3], // Máximo 3 callbacks anidados
    'max-params': ['error', 5], // Máximo 5 parámetros por función
    
    // TAMAÑO DE ARCHIVOS: 300 líneas máximo
    'max-lines': ['error', { 
      max: 300, 
      skipBlankLines: true, 
      skipComments: true 
    }],
    'max-lines-per-function': ['error', { 
      max: 50, 
      skipBlankLines: true, 
      skipComments: true 
    }],
    
    // TYPESCRIPT ESTRICTO
    '@typescript-eslint/no-any': 'error', // Prohibido 'any'
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    
    // IMPORTS Y EXPORTS
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/no-duplicates': 'error',
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
      ],
      'newlines-between': 'always',
      alphabetize: { order: 'asc' },
    }],
    'import/no-unused-modules': 'error',
    
    // REACT ESPECÍFICO
    'react/prop-types': 'off', // Usamos TypeScript
    'react/react-in-jsx-scope': 'off', // React 17+
    'react/display-name': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-bind': 'error', // Performance
    'react/jsx-no-leaked-render': 'error',
    
    // REACT HOOKS
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    
    // REACT NATIVE ESPECÍFICO
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'error', // Usar StyleSheet
    'react-native/no-color-literals': 'error', // Usar colors centralizados
    'react-native/no-raw-text': 'error', // Texto en componentes Text
    
    // ACCESIBILIDAD (CRÍTICO PARA SÍNDROME DE DOWN)
    'jsx-a11y/accessible-emoji': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    
    // PERFORMANCE
    'no-await-in-loop': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    
    // CALIDAD DE CÓDIGO
    'eqeqeq': ['error', 'always'], // === siempre
    'curly': ['error', 'all'], // Llaves siempre
    'no-eval': 'error', // Prohibido eval
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-return-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'prefer-promise-reject-errors': 'error',
    'require-await': 'error',
    
    // ESTILO CONSISTENTE
    'array-bracket-spacing': ['error', 'never'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'lines-between-class-members': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'semi-spacing': ['error', { before: false, after: true }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    
    // NAMING CONVENTIONS
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        'max-lines-per-function': 'off', // Tests pueden ser más largos
      },
    },
    {
      files: ['babel.config.js', 'metro.config.js', '.eslintrc.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.expo/',
    'ios/',
    'android/',
    '*.config.js',
  ],
};
