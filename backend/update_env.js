const fs = require('fs');
let env = fs.readFileSync('.env', 'utf-8');
env = env.replace(/DATABASE_URL=".+"/, 'DATABASE_URL="postgresql://nikita@localhost:5432/naturals_salon?schema=public"');
fs.writeFileSync('.env', env);
