'use client';

import { AnalyticsData } from '@/services/dashboardService';
import { Box } from '@mui/material';
import BarChart from './BarChart';
import LineChart from './LineChart';

const ChartsSection: React.FC<{
  dashboardStat: AnalyticsData;
}> = ({ dashboardStat }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={3} mt="20px">
      <BarChart website_visits={dashboardStat.website_visits} />
      <LineChart offers_sent={dashboardStat.offers_sent} />
    </Box>
  );
};

export default ChartsSection;
