#!/bin/bash
sed -i '' "s/Can't/Can\&apos;t/g" src/components/LocationSection.jsx
sed -i '' 's/"Excellent"/\&quot;Excellent\&quot;/g' src/components/ReviewCard.jsx
sed -i '' 's/"Perfect"/\&quot;Perfect\&quot;/g' src/components/ReviewsPreview.jsx
sed -i '' "s/couldn't/couldn\&apos;t/g" src/pages/NotFound.jsx
sed -i '' "s/you're/you\&apos;re/g" src/pages/NotFound.jsx
sed -i '' "s/Let's/Let\&apos;s/g" src/pages/NotFound.jsx
sed -i '' "s/you're/you\&apos;re/g" src/pages/Services.jsx
sed -i '' 's/"Contact us"/\&quot;Contact us\&quot;/g' src/pages/Services.jsx

# Unused var
sed -i '' 's/const currentMinutes = istHours \* 60 + istMinutes;//g' src/utils/businessHours.js

# ESLint disable warnings
sed -i '' 's/\/\/ eslint-disable-next-line react-hooks\/set-state-in-effect//g' src/components/BusinessHours.jsx
sed -i '' 's/\/\/ eslint-disable-next-line react-hooks\/set-state-in-effect//g' src/components/Header.jsx
sed -i '' 's/\/\/ eslint-disable-next-line react-hooks\/set-state-in-effect//g' src/pages/Reviews.jsx

