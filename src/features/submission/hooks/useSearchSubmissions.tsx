import { useMemo } from 'react';
import MiniSearch from 'minisearch';
import type { components } from '~/lib/api-schema';

export function useSearchSubmissions(titles: components['schemas']['data-submission-short'][]) {
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch<components['schemas']['data-submission-short']>({
      fields: ['id'],
      storeFields: ['id', 'team_id', 'team_target_id'],
      searchOptions: {
        fuzzy: 0.1,
        prefix: true,
      },
    });

    if (titles.length > 0) {
      ms.addAll(titles);
    }

    return ms;
  }, [titles]);

  const search = (query: string): components['schemas']['data-submission-short'][] => {
    if (!query.trim()) {
      return titles;
    }

    const results = miniSearch.search(query);
    return results.map((result) => result as unknown as components['schemas']['data-submission-short']);
  };

  return { search };
}
