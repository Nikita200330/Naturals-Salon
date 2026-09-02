import fs from 'fs';

const path = 'naturals-salon/src/pages/Reviews.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace localStorage loading with API loading
content = content.replace(/import \{ useState, useEffect, useMemo \} from 'react';/, 
  "import { useState, useEffect, useMemo, useCallback } from 'react';\nimport { getFeedback } from '../services/feedbackService';\nimport { RefreshCw, XCircle } from 'lucide-react';");

content = content.replace(/useEffect\(\(\) => \{\s+try \{\s+const stored = localStorage\.getItem\('naturals-salon-feedback'\);\s+if \(stored\) \{\s+\/\/\s*eslint-disable-next-line\s*react-hooks\/set-state-in-effect\s+setWebsiteFeedback\(JSON\.parse\(stored\)\);\s+\}\s+\} catch \(e\) \{\s+console\.error\('Failed to parse website feedback', e\);\s+\}\s+\}, \[\]\);/g, 
`
  const [loadingFeedback, setLoadingFeedback] = useState(true);
  const [feedbackError, setFeedbackError] = useState(null);
  const [feedbackStats, setFeedbackStats] = useState({ count: 0, averageRating: 0 });

  const loadFeedback = useCallback(async () => {
    setLoadingFeedback(true);
    setFeedbackError(null);
    try {
      const data = await getFeedback({ sort: webSortBy === 'Highest Rating' ? 'highest' : webSortBy === 'Lowest Rating' ? 'lowest' : 'newest' });
      setWebsiteFeedback(data.data?.items || []);
      setFeedbackStats({
        count: data.data?.count || 0,
        averageRating: data.data?.averageRating || 0
      });
    } catch (err) {
      setFeedbackError(err.message || 'Unable to load feedback right now.');
    } finally {
      setLoadingFeedback(false);
    }
  }, [webSortBy]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);
`);

// The sorting logic in the original file relies on useMemo. 
// We want to pass sort to the backend instead of local sort, but it's okay to let local sort do it if we are just mocking.
// Actually `loadFeedback` depends on `webSortBy`.

fs.writeFileSync(path, content);
