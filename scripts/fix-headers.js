const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../app/(public)');

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Check if it already has PageHero to avoid double import
      if (content.includes('PageHero')) continue;
      
      // Match the section tag
      const sectionRegex = /<section[^>]*page-header[^>]*>[\s\S]*?<\/section>/;
      const match = content.match(sectionRegex);

      if (match) {
        // Extract title and subtitle roughly
        const titleMatch = match[0].match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
        const descMatch = match[0].match(/<p[^>]*text-lg[^>]*>([\s\S]*?)<\/p>/) || match[0].match(/<p[^>]*>([\s\S]*?)<\/p>/);

        const title = titleMatch ? titleMatch[1].trim().replace(/\n/g, ' ').replace(/\s{2,}/g, ' ') : 'EU American University';
        const subtitle = descMatch ? descMatch[1].trim().replace(/\n/g, ' ').replace(/\s{2,}/g, ' ') : '';

        // Import PageHero
        if (!content.includes(`import { PageHero }`)) {
          // Find the last import
          const lastImportIndex = content.lastIndexOf('import ');
          if (lastImportIndex !== -1) {
            const endOfLine = content.indexOf('\n', lastImportIndex);
            content = content.substring(0, endOfLine + 1) + `import { PageHero } from '@/components/ui/PageHero';\n` + content.substring(endOfLine + 1);
          } else {
            content = `import { PageHero } from '@/components/ui/PageHero';\n` + content;
          }
        }

        const heroTag = `<PageHero\n        title="${title}"\n        subtitle="${subtitle}"\n        breadcrumbs={[{ label: 'Home', href: '/' }, { label: '${title}' }]}\n      />`;
        
        content = content.replace(sectionRegex, heroTag);
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(publicDir);
console.log('Done replacing headers.');
