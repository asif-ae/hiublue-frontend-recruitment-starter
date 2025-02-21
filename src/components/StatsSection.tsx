'use client';

import { DashboardSummary } from '@/services/dashboardService';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';
import StatsCard from './StatsCard';

const StatsSection: React.FC<{ dashboardSummary: DashboardSummary | null }> = ({
  dashboardSummary,
}) => {
  if (!dashboardSummary) return null;

  const { current, previous } = dashboardSummary;

  // Function to calculate percentage change
  const calculateChange = (currentValue: number, previousValue: number) => {
    if (previousValue === 0) return '0%'; // Avoid division by zero
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return `${change.toFixed(1)}%`;
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={3} mt="20px">
      <StatsCard
        title="Total active users"
        value={`${current.active_users / 1000}k`}
        change={calculateChange(current.active_users, previous.active_users)}
        isIncrease={current.active_users >= previous.active_users}
        icon={
          current.active_users >= previous.active_users ? (
            <ArrowUpwardIcon />
          ) : (
            <ArrowDownwardIcon />
          )
        }
      />
      <StatsCard
        title="Total clicks"
        value={`${current.clicks / 1000}k`}
        change={calculateChange(current.clicks, previous.clicks)}
        isIncrease={current.clicks >= previous.clicks}
        icon={
          current.clicks >= previous.clicks ? (
            <ArrowUpwardIcon />
          ) : (
            <ArrowDownwardIcon />
          )
        }
      />
      <StatsCard
        title="Total appearances"
        value={`${current.appearance / 1000}k`}
        change={calculateChange(current.appearance, previous.appearance)}
        isIncrease={current.appearance >= previous.appearance}
        icon={
          current.appearance >= previous.appearance ? (
            <ArrowUpwardIcon />
          ) : (
            <ArrowDownwardIcon />
          )
        }
      />
    </Box>
  );
};

export default StatsSection;
