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
  
  // Replace 'bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding' 
  // with 'bg-gradient-to-br from-primary/5 via-white to-accent/5 page-header'
  content = content.replace(/bg-gradient-to-br from-primary\/5 via-white to-accent\/5 section-padding/g, 'bg-gradient-to-br from-primary/5 via-white to-accent/5 page-header');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    changedCount++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`Replaced header padding in ${changedCount} files.`);
