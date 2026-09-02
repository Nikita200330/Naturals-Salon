const fs = require('fs');

let f = 'src/components/BusinessHours.jsx';
let content = fs.readFileSync(f, 'utf8');
content = content.replace('setCurrentDay(days[istDate.getDay()]);', '// eslint-disable-next-line react-hooks/set-state-in-effect\n    setCurrentDay(days[istDate.getDay()]);');
fs.writeFileSync(f, content);

f = 'src/components/Footer.jsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace('import { Phone, MapPin, Instagram, Facebook, Star, CheckCircle } from \'lucide-react\';', 'import { Phone, MapPin, Instagram, Facebook, CheckCircle } from \'lucide-react\';');
// The Clock was actually not replaced previously, let's fix it by just replacing the whole import
content = content.replace(/import \{.*?\} from 'lucide-react';/, "import { Phone, MapPin, Instagram, Facebook, CheckCircle } from 'lucide-react';");
fs.writeFileSync(f, content);

f = 'src/components/LocationSection.jsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/Can't find what you're looking for\?/g, "Can&apos;t find what you&apos;re looking for?");
fs.writeFileSync(f, content);

f = 'src/components/ReviewCard.jsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/import \{ Star, User \} from 'lucide-react';/g, "import { Star, User } from 'lucide-react';"); // if ExternalLink was there
content = content.replace(/import \{ Star, User, ExternalLink \} from 'lucide-react';/g, "import { Star, User } from 'lucide-react';");
content = content.replace(/"Excellent"/g, "&quot;Excellent&quot;");
fs.writeFileSync(f, content);

f = 'src/components/ReviewsPreview.jsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/"Perfect"/g, "&quot;Perfect&quot;");
fs.writeFileSync(f, content);

f = 'src/pages/NotFound.jsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/We couldn't find the page you're looking for\. Let's get you back to looking your best\./g, "We couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back to looking your best.");
fs.writeFileSync(f, content);

f = 'src/pages/Services.jsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/import \{ Search, Info, Clock \} from 'lucide-react';/g, "import { Search, Info, Clock } from 'lucide-react';"); // removed ArrowRight already
content = content.replace(/import \{ Search, Info, Clock, ArrowRight \} from 'lucide-react';/g, "import { Search, Info, Clock } from 'lucide-react';");
content = content.replace(/Still not sure what you're looking for\? "Contact us"/g, "Still not sure what you&apos;re looking for? &quot;Contact us&quot;");
fs.writeFileSync(f, content);

f = 'src/utils/businessHours.js';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/const currentMinutes = istHours \* 60 \+ istMinutes;/g, '');
fs.writeFileSync(f, content);
