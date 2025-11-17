import { queryOptions } from '@tanstack/react-query';
import { ApiClient } from '../api-client';

export function getCurrentPeriod() {
  return queryOptions({
    queryKey: ['current', 'period'],
    queryFn: async () => {
      const { data, error } = await ApiClient.GET('/config/period');
      if (error) {
        return null;
      }
      return data;
    },
  });
}
