'use client';

import { AnalyticsData, WebsiteVisits } from '@/services/dashboardService';
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
  alignItems: 'flex-start',
  flex: '1',
  padding: '24px',
  height: '416px',
  borderRadius: '16px',
  boxShadow:
    '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
});

// Styled Legend Container
const LegendContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  alignContent: 'flex-end',
  gap: '16px',
  width: '100%',
  height: '22px',
});

// Styled Legend Item
const LegendItem = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0px',
  gap: '6px',
});

// Styled Legend Text
const LegendText = styled(Typography)({
  fontFamily: "'Public Sans', sans-serif",
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '22px',
  color: '#1C252E',
});

// Mapping for days
const dayMapping: Record<string, string> = {
  sunday: 'Sun',
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
};

// Function to transform data for the chart
const getChartData = (data: WebsiteVisits) => {
  const categories = Object.keys(data).map((day) => dayMapping[day]);
  const desktopData = Object.values(data).map((day) => day.desktop);
  const mobileData = Object.values(data).map((day) => day.mobile);

  const chartOptions: ApexOptions = {
    // ✅ Explicitly define type here
    chart: { type: 'bar', height: 300, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: '40%' } },
    colors: ['#007867', '#FFAB00'],
    dataLabels: { enabled: false },
    xaxis: { categories },
    yaxis: { labels: { formatter: (val: number) => val.toFixed(0) } },
    legend: { show: false }, // ✅ Hide ApexCharts default legend
  };

  const chartSeries = [
    { name: 'Desktop', data: desktopData },
    { name: 'Mobile', data: mobileData },
  ];

  return { chartOptions, chartSeries };
};

const BarChart: React.FC<{ website_visits: WebsiteVisits }> = ({
  website_visits,
}) => {
  // Get transformed data
  const { chartOptions, chartSeries } = getChartData(website_visits);

  return (
    <StyledCard>
      <Typography variant="h6" fontWeight="600" color="text.primary">
        Website visits
      </Typography>

      {/* Custom Legend */}
      <LegendContainer>
        <LegendItem>
          <Box
            sx={{
              width: '12px',
              height: '12px',
              backgroundColor: '#007867',
              borderRadius: '500px',
            }}
          />
          <LegendText>Desktop</LegendText>
        </LegendItem>
        <LegendItem>
          <Box
            sx={{
              width: '12px',
              height: '12px',
              backgroundColor: '#FFAB00',
              borderRadius: '500px',
              opacity: 0.8,
            }}
          />
          <LegendText>Mobile</LegendText>
        </LegendItem>
      </LegendContainer>

      {/* Chart */}
      <Box width="100%" height="100%" mt={2}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={300}
        />
      </Box>
    </StyledCard>
  );
};

export default BarChart;
