const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\bhard\\.gemini\\antigravity-ide\\brain\\d2a5c004-b087-416f-ae18-5afb25c9ab7c\\.system_generated\\logs\\transcript.jsonl', 'utf-8');
const lines = data.trim().split('\n');
for (let i = lines.length - 1; i >= 0; i--) {
  try {
    const obj = JSON.parse(lines[i]);
    if (obj.type === 'USER_INPUT') {
      fs.writeFileSync('last-prompt.txt', obj.content, 'utf-8');
      console.log('Saved to last-prompt.txt');
      break;
    }
  } catch(e) {}
}
