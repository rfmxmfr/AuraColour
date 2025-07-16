const https = require('https');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://firebase-deploy-mrlcb34cm-renatos-projects-ef7b1af8.vercel.app';

// Common routes to check
const routes = [
  '/',
  '/services',
  '/about', 
  '/contact',
  '/questionnaire',
  '/admin',
  '/login',
  '/api/questionnaire',
  '/api/color-analysis',
  '/api/create-payment',
  '/_next/static/css',
  '/_next/static/js'
];

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function analyzeDeployment() {
  console.log('🔍 Analyzing Vercel deployment...\n');
  
  const results = {};
  
  for (const route of routes) {
    const url = baseUrl + route;
    try {
      console.log(`Fetching: ${route}`);
      const result = await fetchPage(url);
      results[route] = {
        status: result.status,
        contentType: result.headers['content-type'],
        size: result.data.length,
        hasReact: result.data.includes('__NEXT_DATA__'),
        hasAuth: result.data.includes('Authentication Required'),
        preview: result.data.substring(0, 200)
      };
    } catch (error) {
      results[route] = { error: error.message };
    }
  }
  
  // Save analysis
  fs.writeFileSync('vercel-analysis.json', JSON.stringify(results, null, 2));
  
  console.log('\n📊 Analysis Results:');
  console.log('===================');
  
  Object.entries(results).forEach(([route, data]) => {
    if (data.error) {
      console.log(`❌ ${route}: ERROR - ${data.error}`);
    } else {
      console.log(`✅ ${route}: ${data.status} (${data.size} bytes)`);
      if (data.hasAuth) console.log(`   🔒 Authentication required`);
      if (data.hasReact) console.log(`   ⚛️  Next.js app detected`);
    }
  });
  
  return results;
}

analyzeDeployment().catch(console.error);