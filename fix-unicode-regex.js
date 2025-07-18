// Fix for Unicode Property Escape errors in Zod
const fs = require('fs');
const path = require('path');

// Path to node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');

// Path to zod emoji.js file
const zodEmojiPath = path.join(nodeModulesPath, 'zod', 'lib', 'types', 'string.js');

// Check if the file exists
if (fs.existsSync(zodEmojiPath)) {
  console.log('📝 Patching Zod emoji validation...');
  
  // Read the file
  let content = fs.readFileSync(zodEmojiPath, 'utf8');
  
  // Replace Unicode property escapes with a simpler emoji regex
  const originalRegex = /\\p{Extended_Pictographic}|\\p{Emoji_Component}/g;
  const replacementRegex = '[\\u{1F600}-\\u{1F64F}\\u{1F300}-\\u{1F5FF}\\u{1F680}-\\u{1F6FF}\\u{1F700}-\\u{1F77F}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}]';
  
  // Check if the file contains the problematic regex
  if (originalRegex.test(content)) {
    // Replace the regex
    content = content.replace(originalRegex, replacementRegex);
    
    // Write the file back
    fs.writeFileSync(zodEmojiPath, content, 'utf8');
    console.log('✅ Zod emoji validation patched successfully!');
  } else {
    console.log('ℹ️ No Unicode property escapes found in Zod.');
  }
} else {
  console.log('⚠️ Zod emoji.js file not found.');
}