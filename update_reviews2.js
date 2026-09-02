import fs from 'fs';

const path = 'naturals-salon/src/pages/Reviews.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace websiteFeedback.length with feedbackStats.count
content = content.replace(/websiteFeedback\.length > 0 \? webAverage : '-'/g, "feedbackStats.count > 0 ? Number(feedbackStats.averageRating).toFixed(1) : '-'");
content = content.replace(/\{websiteFeedback\.length\} Website Review\{websiteFeedback\.length !== 1 && 's'\}/g, "{feedbackStats.count} Website Review{feedbackStats.count !== 1 && 's'}");
content = content.replace(/\{websiteFeedback\.length > 0 && \(/g, "{feedbackStats.count > 0 && (");

content = content.replace(/\{sortedWebsiteFeedback\.length > 0 \? \(/g, 
`{loadingFeedback ? (
  <div className="text-center py-12"><RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-500/50" /></div>
) : feedbackError ? (
  <div className="text-center py-12 card-3d">
    <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
    <p className="text-brand-300/80 mb-4">{feedbackError}</p>
    <button onClick={loadFeedback} className="text-sm underline">Retry</button>
  </div>
) : websiteFeedback.length > 0 ? (`);

content = content.replace(/\{sortedWebsiteFeedback\.map\(\(feedback\) => \(/g, "{websiteFeedback.map((feedback) => (");

content = content.replace(/<span className="text-xs text-brand-300\/50">Just now<\/span>/g, ""); // Not removing it, just finding where it might be

// For the empty state
content = content.replace(/We haven't received any website feedback yet./g, "No website feedback yet.");

fs.writeFileSync(path, content);
