'use client';

import { OffersSent } from '@/services/dashboardService';
import { Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Styled Card Component
const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: '1',
  padding: '24px',
  height: '416px',
  borderRadius: '16px',
  boxShadow:
    '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
});

const lineChartOptions: ApexOptions = {
  chart: { type: 'line', height: 300, toolbar: { show: false } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#1C252E'],
  xaxis: { categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
  yaxis: { labels: { formatter: (val) => val.toFixed(0) } },
  dataLabels: { enabled: false },
};

const LineChart: React.FC<{
  offers_sent: OffersSent;
}> = ({ offers_sent }) => {
  const lineChartSeries = [
    { name: 'Offers Sent', data: Object.values(offers_sent) },
  ];
  return (
    <StyledCard>
      <Typography variant="h6" fontWeight="600" color="text.primary">
        Offers sent
      </Typography>
      <Box width="100%" height="100%" mt={2}>
        <Chart
          options={lineChartOptions}
          series={lineChartSeries}
          type="line"
          height={300}
        />
      </Box>
    </StyledCard>
  );
};

export default LineChart;
