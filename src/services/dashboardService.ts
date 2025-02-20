import apiClient from './apiClient';

interface DashboardSummary {
  current: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
  previous: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
}

interface WebsiteVisits {
  [day: string]: {
    desktop: number;
    mobile: number;
  };
}

interface DashboardStat {
  website_visits: WebsiteVisits;
}

/**
 * Fetches the dashboard summary data.
 * @param {string} filter - The filter for the summary ('this-week' or 'prev-week').
 * @returns {Promise<DashboardSummary>} - Returns a promise with the response data.
 */
export const getDashboardSummary = async (
  filter: 'this-week' | 'prev-week' = 'this-week',
): Promise<DashboardSummary> => {
  try {
    const response = await apiClient.get<DashboardSummary>(
      '/dashboard/summary',
      {
        params: { filter },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    throw error;
  }
};

/**
 * Fetches the dashboard stat data.
 * @param {string} filter - The filter for the stat ('this-week' or 'prev-week').
 * @returns {Promise<DashboardStat>} - Returns a promise with the response data.
 */
export const getDashboardStat = async (
  filter: 'this-week' | 'prev-week' = 'this-week',
): Promise<DashboardStat> => {
  try {
    const response = await apiClient.get<DashboardStat>('/dashboard/stat', {
      params: { filter },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stat:', error);
    throw error;
  }
};
