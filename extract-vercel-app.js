const https = require('https');
const fs = require('fs');
const path = require('path');

const deploymentUrl = 'https://firebase-deploy-mrlcb34cm-renatos-projects-ef7b1af8.vercel.app';

// Try to extract any publicly accessible resources
const publicRoutes = [
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main.js', 
  '/_next/static/chunks/pages/_app.js',
  '/_next/static/chunks/pages/index.js',
  '/_next/static/css/app.css',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/.well-known/vercel.json',
  '/api/health',
  '/manifest.json'
];

async function fetchResource(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { 
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VercelExtractor/1.0)',
        'Accept': '*/*'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          data: data,
          size: data.length
        });
      });
    });
    
    req.on('error', (err) => {
      resolve({ url, error: err.message });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ url, error: 'Timeout' });
    });
  });
}

async function extractVercelApp() {
  console.log('🔍 Extracting Vercel deployment information...\n');
  
  const results = {};
  
  // First, try the main page to understand the structure
  console.log('Fetching main page...');
  const mainPage = await fetchResource(deploymentUrl);
  results.mainPage = mainPage;
  
  if (mainPage.data && !mainPage.error) {
    console.log(`✅ Main page: ${mainPage.status} (${mainPage.size} bytes)`);
    
    // Extract any script/css references
    const scriptMatches = mainPage.data.match(/_next\/static\/[^"'\s]+/g) || [];
    const cssMatches = mainPage.data.match(/\.css[^"'\s]*/g) || [];
    
    console.log(`Found ${scriptMatches.length} script references`);
    console.log(`Found ${cssMatches.length} CSS references`);
    
    // Try to fetch these resources
    const foundResources = [...new Set([...scriptMatches, ...cssMatches])];
    for (const resource of foundResources.slice(0, 5)) { // Limit to first 5
      const fullUrl = resource.startsWith('http') ? resource : deploymentUrl + '/' + resource;
      console.log(`Trying: ${resource}`);
      const result = await fetchResource(fullUrl);
      results[resource] = result;
    }
  }
  
  // Try public routes
  console.log('\nTrying public routes...');
  for (const route of publicRoutes) {
    const result = await fetchResource(deploymentUrl + route);
    results[route] = result;
    
    if (!result.error && result.status < 400) {
      console.log(`✅ ${route}: ${result.status} (${result.size} bytes)`);
    } else {
      console.log(`❌ ${route}: ${result.error || result.status}`);
    }
  }
  
  // Save all results
  fs.writeFileSync('vercel-extraction.json', JSON.stringify(results, null, 2));
  
  console.log('\n📊 Extraction Summary:');
  console.log('=====================');
  
  const accessible = Object.entries(results).filter(([_, data]) => 
    !data.error && data.status && data.status < 400
  );
  
  const protected = Object.entries(results).filter(([_, data]) => 
    data.status === 401 || (data.data && data.data.includes('Authentication Required'))
  );
  
  console.log(`✅ Accessible resources: ${accessible.length}`);
  console.log(`🔒 Protected resources: ${protected.length}`);
  
  if (accessible.length > 0) {
    console.log('\nAccessible resources:');
    accessible.forEach(([route, data]) => {
      console.log(`  - ${route} (${data.size} bytes)`);
    });
  }
  
  return results;
}

// Also create the local app structure
function createLocalApp() {
  console.log('\n🏗️  Creating local app structure...');
  
  // Ensure all necessary directories exist
  const dirs = [
    'app/components',
    'app/api/questionnaire',
    'app/api/color-analysis', 
    'app/api/create-payment',
    'lib/supabase',
    'components/ui',
    'public'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created: ${dir}`);
    }
  });
  
  console.log('✅ Local structure ready');
}

extractVercelApp()
  .then(() => createLocalApp())
  .catch(console.error);