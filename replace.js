const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      if (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.md') || f.endsWith('.json') || f.endsWith('.js')) {
        callback(path.join(dir, f));
      }
    }
  });
}

walkDir(__dirname, function(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  if (content.includes('@/lib/db')) {
    content = content.replace(/@\/lib\/prisma/g, '@/lib/db');
    changed = true;
  }
  if (filePath.replace(/\\/g, '/').includes('/app/api/applications/route.ts') && content.includes('transcriptsUrls: []')) {
    content = content.replace(/transcriptsUrls:\s*\[\]/g, 'transcriptsUrls: "{}"');
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
