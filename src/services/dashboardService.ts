import apiClient from './apiClient';

export interface DashboardSummary {
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

type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type WebsiteVisits = {
  [key in DayOfWeek]: {
    desktop: number;
    mobile: number;
  };
};

export type OffersSent = {
  [key in DayOfWeek]: number;
};

export type AnalyticsData = {
  website_visits: WebsiteVisits;
  offers_sent: OffersSent;
};

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
 * @returns {Promise<AnalyticsData>} - Returns a promise with the response data.
 */
export const getDashboardStat = async (
  filter: 'this-week' | 'prev-week' = 'this-week',
): Promise<AnalyticsData> => {
  try {
    const response = await apiClient.get<AnalyticsData>('/dashboard/stat', {
      params: { filter },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stat:', error);
    throw error;
  }
};
