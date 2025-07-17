module.exports = {
  extends: [
    'next/core-web-vitals',
  ],
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    // Spacing & formatting rules
    'arrow-spacing': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'indent': ['error', 2],
    
    // Console & debugging
    'no-console': 'warn',
    'no-debugger': 'error',
    
    // React & JSX-specific issues
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/self-closing-comp': 'error',
    'react-hooks/exhaustive-deps': 'warn',
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