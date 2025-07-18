module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    // Arrow spacing - ensure exactly one space before and after the fat arrow
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    
    // Comma dangling - add trailing commas in multiline objects/arrays/functions
    'comma-dangle': ['error', 'always-multiline'],
    
    // Object curly spacing - use spaces inside braces
    'object-curly-spacing': ['error', 'always'],
    
    // Indent - conform to the 2-space indent standard
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'VariableDeclarator': 1,
      'outerIIFEBody': 1,
      'MemberExpression': 1,
      'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
      'FunctionExpression': { 'parameters': 1, 'body': 1 },
      'CallExpression': { 'arguments': 1 },
      'ArrayExpression': 1,
      'ObjectExpression': 1,
      'ImportDeclaration': 1,
      'flatTernaryExpressions': false,
      'ignoreComments': false
    }]
  }
};
