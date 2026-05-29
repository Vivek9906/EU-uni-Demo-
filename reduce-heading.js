const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'app'));
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;
  
  // Find the page-header block
  if (content.includes('page-header')) {
    // Replace the large heading sizes
    content = content.replace(/text-4xl lg:text-5xl/g, 'text-3xl lg:text-4xl');
    content = content.replace(/text-4xl md:text-5xl lg:text-\[52px\]/g, 'text-4xl md:text-5xl'); // just in case
    // We only want to replace mb-6 inside the header, but a global replace for "font-heading font-bold text-foreground mb-6" is safer
    content = content.replace(/font-heading font-bold text-foreground mb-6/g, 'font-heading font-bold text-foreground mb-4');
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    changedCount++;
    console.log(`Reduced heading in: ${file}`);
  }
});

console.log(`Changed ${changedCount} files.`);
