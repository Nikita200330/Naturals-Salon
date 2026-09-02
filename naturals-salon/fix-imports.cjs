const fs = require('fs');

let content = fs.readFileSync('src/components/Footer.jsx', 'utf8');
content = content.replace("import { Phone, MapPin, Star, Navigation } from 'lucide-react';", "import { Phone, MapPin, Navigation, Facebook, Instagram, CheckCircle } from 'lucide-react';");
fs.writeFileSync('src/components/Footer.jsx', content);

content = fs.readFileSync('src/components/ReviewCard.jsx', 'utf8');
content = content.replace("import { Star, User } from 'lucide-react';", "import { Star, Quote } from 'lucide-react';");
fs.writeFileSync('src/components/ReviewCard.jsx', content);

content = fs.readFileSync('src/pages/Services.jsx', 'utf8');
content = content.replace("import { Search, Info, Clock } from 'lucide-react';", "import { Search, Clock, Star, X, Sparkles, XCircle, Phone } from 'lucide-react';");
fs.writeFileSync('src/pages/Services.jsx', content);

