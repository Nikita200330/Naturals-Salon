const fs = require('fs');

function restoreAndFix() {
  // Let's just fix the exact lines by reading them and regex replacing
  let content = fs.readFileSync('src/components/Footer.jsx', 'utf8');
  content = content.replace(/import \{.*?\} from 'lucide-react';/, "import { Phone, MapPin, Star, Navigation } from 'lucide-react';");
  fs.writeFileSync('src/components/Footer.jsx', content);

  content = fs.readFileSync('src/components/LocationSection.jsx', 'utf8');
  content = content.replace(/Can't find what you're looking for\?/g, "Can&apos;t find what you&apos;re looking for?");
  fs.writeFileSync('src/components/LocationSection.jsx', content);

  content = fs.readFileSync('src/components/ReviewCard.jsx', 'utf8');
  content = content.replace(/import \{.*?\} from 'lucide-react';/, "import { Star, User } from 'lucide-react';");
  content = content.replace(/"Excellent"/g, "&quot;Excellent&quot;");
  fs.writeFileSync('src/components/ReviewCard.jsx', content);

  content = fs.readFileSync('src/components/ReviewsPreview.jsx', 'utf8');
  content = content.replace(/"Perfect"/g, "&quot;Perfect&quot;");
  fs.writeFileSync('src/components/ReviewsPreview.jsx', content);

  content = fs.readFileSync('src/pages/NotFound.jsx', 'utf8');
  content = content.replace(/We couldn't find the page you're looking for\. Let's get you back to looking your best\./g, "We couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back to looking your best.");
  fs.writeFileSync('src/pages/NotFound.jsx', content);

  content = fs.readFileSync('src/pages/Services.jsx', 'utf8');
  content = content.replace(/import \{.*?\} from 'lucide-react';/, "import { Search, Info, Clock } from 'lucide-react';");
  content = content.replace(/Still not sure what you're looking for\? "Contact us"/g, "Still not sure what you&apos;re looking for? &quot;Contact us&quot;");
  fs.writeFileSync('src/pages/Services.jsx', content);

  content = fs.readFileSync('src/utils/businessHours.js', 'utf8');
  content = content.replace(/const currentMinutes = istHours \* 60 \+ istMinutes;/g, '');
  fs.writeFileSync('src/utils/businessHours.js', content);
}
restoreAndFix();
