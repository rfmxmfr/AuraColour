/**
 * Frontend Framework Configuration
 * 
 * This file documents the frontend technology choices for the AuraColor app.
 */

module.exports = {
  // Framework selection
  framework: 'next',
  version: '14.x',
  
  // Routing configuration
  routing: {
    type: 'app-router',
    dynamicRoutes: true,
    middleware: true
  },
  
  // Build tools
  buildTools: {
    bundler: 'webpack',
    transpiler: 'swc',
    cssProcessor: 'postcss'
  },
  
  // UI components
  ui: {
    library: 'shadcn/ui',
    styling: 'tailwind',
    icons: 'lucide-react'
  }
};