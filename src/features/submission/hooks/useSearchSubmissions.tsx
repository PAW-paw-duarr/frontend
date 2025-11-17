import type { components } from '~/lib/api-schema';

export function useSearchSubmissions(titles: components['schemas']['data-submission-short'][]) {
  const search = (query: string): components['schemas']['data-submission-short'][] => {
    if (!query.trim()) {
      return titles;
    }
    const normalizedQuery = query.trim().toLowerCase();
    return titles.filter((t) => t.id.toLowerCase().startsWith(normalizedQuery));
  };

  return { search };
}
