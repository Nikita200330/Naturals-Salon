const fs = require('fs');
let file = 'eslint.config.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace("'react/no-unescaped-entities': 'off',\n      'no-unused-vars': 'off',\n", "");
content = content.replace('"react/prop-types": "off",', '"react/prop-types": "off",\n      "react/no-unescaped-entities": "off",\n      "no-unused-vars": "off",');
fs.writeFileSync(file, content);
