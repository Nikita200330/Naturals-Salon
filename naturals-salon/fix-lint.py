import os, re

def replace_in_file(filepath, pattern, replacement):
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f:
        content = f.read()
    new_content = re.sub(pattern, replacement, content)
    with open(filepath, 'w') as f:
        f.write(new_content)

replace_in_file('src/components/BusinessHours.jsx', r'setCurrentDay\(days\[istDate\.getDay\(\)\]\);', r'// eslint-disable-next-line react-hooks/set-state-in-effect\n    setCurrentDay(days[istDate.getDay()]);')
replace_in_file('src/components/LocationSection.jsx', r"Can't find what you're looking for\?", r"Can&apos;t find what you&apos;re looking for?")
replace_in_file('src/components/ReviewCard.jsx', r'"Excellent"', r"&quot;Excellent&quot;")
replace_in_file('src/components/ReviewsPreview.jsx', r'"Perfect"', r"&quot;Perfect&quot;")
replace_in_file('src/pages/NotFound.jsx', r"We couldn't find the page you're looking for\. Let's get you back to looking your best\.", r"We couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back to looking your best.")
replace_in_file('src/pages/Reviews.jsx', r'setWebsiteFeedback\(JSON\.parse\(stored\)\);', r'// eslint-disable-next-line react-hooks/set-state-in-effect\n        setWebsiteFeedback(JSON.parse(stored));')
replace_in_file('src/pages/Services.jsx', r'Still not sure what you\'re looking for\? "Contact us"', r"Still not sure what you&apos;re looking for? &quot;Contact us&quot;")
replace_in_file('src/utils/businessHours.js', r'const currentMinutes = istHours \* 60 \+ istMinutes;', r'')

