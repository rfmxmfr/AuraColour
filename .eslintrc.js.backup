module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
  ],
  plugins: [
    'react',
    'react-hooks',
    'import',
    'jsx-a11y',
  ],
  rules: {
    // Spacing & formatting rules
    'arrow-spacing': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'indent': ['error', 2],
    
    // Import hygiene
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
        'newlines-between': 'always',
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    
    // Unused & duplicate code
    'no-unused-vars': 'error',
    'no-duplicate-case': 'error',
    'default-case-last': 'error',
    
    // Console & debugging
    'no-console': 'warn',
    'no-debugger': 'error',
    
    // React & JSX-specific issues
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/self-closing-comp': 'error',
    'react/no-unused-prop-types': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Accessibility
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/no-static-element-interactions': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        'no-unused-vars': 'off',
      },
    },
  ],
};