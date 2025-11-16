import { useMemo } from 'react';
import MiniSearch from 'minisearch';

interface Title {
    id: string;
    title: string;
    desc: string;
    photo_url: string;
}

export function useSearchTitles(titles: Title[]) {
    const miniSearch = useMemo(() => {
        const ms = new MiniSearch<Title>({
            fields: ['title', 'desc'],
            storeFields: ['id', 'title', 'desc', 'photo_url'],
            searchOptions: {
                boost: { title: 2 },
                fuzzy: 0.2,
                prefix: true,
            },
        });

        if (titles.length > 0) {
            ms.addAll(titles);
        }

        return ms;
    }, [titles]);

    const search = (query: string): Title[] => {
        if (!query.trim()) {
            return titles;
        }

        const results = miniSearch.search(query);
        return results.map((result) => result as unknown as Title);
    };

    return { search };
}
