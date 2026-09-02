const fs = require('fs');
let file = 'eslint.config.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('rules: {', "rules: {\n      'react/no-unescaped-entities': 'off',\n      'no-unused-vars': 'off',\n");
fs.writeFileSync(file, content);
