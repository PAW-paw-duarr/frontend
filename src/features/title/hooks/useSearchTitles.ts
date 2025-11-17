import { useMemo } from 'react';
import Fuse from 'fuse.js';

interface Title {
  id: string;
  title: string;
  desc: string;
  photo_url: string;
}

export function useSearchTitles(titles: Title[]) {
  const fuse = useMemo(() => {
    if (!Array.isArray(titles) || titles.length === 0) return null;
    const options = {
      keys: ['title', 'desc'],
      threshold: 0.9,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2,
      findAllMatches: true,
      useExtendedSearch: true,
    };
    return new Fuse(titles, options);
  }, [titles]);

  const search = (query: string): Title[] => {
    const q = query.trim();
    if (!q || !fuse) {
      return titles;
    }

    let searchTerm = q;
    if (q.includes('-')) {
      const hasDigitsAfterLastHyphen = /-\d+$/.test(q);
      searchTerm = hasDigitsAfterLastHyphen ? `="${q}"` : `^${q}`;
    }

    const results = fuse.search(searchTerm);
    return results.map((r) => r.item);
  };

  return { search };
}
