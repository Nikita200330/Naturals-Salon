const fs = require('fs');

let content = fs.readFileSync('src/components/Footer.jsx', 'utf8');
content = content.replace("import { Phone, MapPin, Navigation, Facebook, Instagram, CheckCircle } from 'lucide-react';", "import { Phone, MapPin, Navigation } from 'lucide-react';");
fs.writeFileSync('src/components/Footer.jsx', content);

content = fs.readFileSync('src/components/LocationSection.jsx', 'utf8');
content = content.replace(/Can't/g, "Can&apos;t").replace(/you're/g, "you&apos;re");
fs.writeFileSync('src/components/LocationSection.jsx', content);

content = fs.readFileSync('src/components/ReviewCard.jsx', 'utf8');
content = content.replace(/"Excellent"/g, "&quot;Excellent&quot;");
fs.writeFileSync('src/components/ReviewCard.jsx', content);

content = fs.readFileSync('src/components/ReviewsPreview.jsx', 'utf8');
content = content.replace(/"Perfect"/g, "&quot;Perfect&quot;");
fs.writeFileSync('src/components/ReviewsPreview.jsx', content);

content = fs.readFileSync('src/pages/NotFound.jsx', 'utf8');
content = content.replace(/couldn't/g, "couldn&apos;t").replace(/you're/g, "you&apos;re").replace(/Let's/g, "Let&apos;s");
fs.writeFileSync('src/pages/NotFound.jsx', content);

content = fs.readFileSync('src/pages/Services.jsx', 'utf8');
content = content.replace("import { Search, Clock, Star, X, Sparkles, XCircle, Phone } from 'lucide-react';", "import { Search, Star, X, Sparkles, XCircle, Phone } from 'lucide-react';");
content = content.replace(/you're/g, "you&apos;re").replace(/"Contact us"/g, "&quot;Contact us&quot;");
fs.writeFileSync('src/pages/Services.jsx', content);

