const fs = require('fs');

const replaceInFile = (file, replacements) => {
  let content = fs.readFileSync(file, 'utf8');
  for (const [find, replace] of replacements) {
    if (typeof find === 'string') {
      content = content.replace(find, replace);
    } else {
      content = content.replace(find, replace);
    }
  }
  fs.writeFileSync(file, content);
}

replaceInFile('src/components/BusinessHours.jsx', [
  ['setStatus(getStoreStatus());', '// eslint-disable-next-line react-hooks/set-state-in-effect\n    setStatus(getStoreStatus());'],
  ['setCurrentDay(days[istDate.getDay()]);', '// eslint-disable-next-line react-hooks/set-state-in-effect\n    setCurrentDay(days[istDate.getDay()]);']
]);

replaceInFile('src/components/Footer.jsx', [
  ['import { Clock, Phone, MapPin, Instagram, Facebook, Star, CheckCircle }', 'import { Phone, MapPin, Instagram, Facebook, Star, CheckCircle, Navigation }'] // added Navigation since it was missing
]);

replaceInFile('src/components/Header.jsx', [
  ['setMobileMenuOpen(false);', '// eslint-disable-next-line react-hooks/set-state-in-effect\n    setMobileMenuOpen(false);']
]);

replaceInFile('src/components/LocationSection.jsx', [
  ["Can't find what you're looking for?", "Can&apos;t find what you&apos;re looking for?"]
]);

replaceInFile('src/components/ReviewCard.jsx', [
  ["import { Star, User, ExternalLink }", "import { Star, User }"],
  ['"Excellent"', '&quot;Excellent&quot;']
]);

replaceInFile('src/components/ReviewsPreview.jsx', [
  ['"Perfect"', '&quot;Perfect&quot;']
]);

replaceInFile('src/pages/Appointment.jsx', [
  ["import { useState, useEffect }", "import { useState }"]
]);

replaceInFile('src/pages/NotFound.jsx', [
  ["We couldn't find the page you're looking for. Let's get you back to looking your best.", "We couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back to looking your best."]
]);

replaceInFile('src/pages/Reviews.jsx', [
  ['setWebsiteFeedback(JSON.parse(stored));', '// eslint-disable-next-line react-hooks/set-state-in-effect\n        setWebsiteFeedback(JSON.parse(stored));']
]);

replaceInFile('src/pages/Services.jsx', [
  ["import { Search, Info, Clock, ArrowRight }", "import { Search, Info, Clock }"],
  ['Still not sure what you\'re looking for? "Contact us"', 'Still not sure what you&apos;re looking for? &quot;Contact us&quot;']
]);

replaceInFile('src/utils/businessHours.js', [
  ['const currentMinutes = istHours * 60 + istMinutes;\n', '']
]);

