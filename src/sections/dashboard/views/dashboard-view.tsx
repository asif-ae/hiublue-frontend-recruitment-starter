'use client';

import DashboardLayout from '@/components/_template/DashboardLayout';
import ChartsSection from '@/components/ChartsSection';
import DashboardHeader from '@/components/DashboardHeader';
import OfferList from '@/components/OfferList';
import StatsSection from '@/components/StatsSection';
import {
  AnalyticsData,
  DashboardSummary,
  getDashboardStat,
  getDashboardSummary,
} from '@/services/dashboardService';
import { useEffect, useState } from 'react';

export default function DashboardView() {
  const [dashboardSummary, setDashboardSummary] =
    useState<DashboardSummary | null>(null);
  const [dashboardStat, setDashboardStat] = useState<AnalyticsData | null>(
    null,
  );
  useEffect(() => {
    (async () => {
      try {
        getDashboardSummary().then((response) => {
          setDashboardSummary(response);
        });
        getDashboardStat().then((response) => {
          setDashboardStat(response);
        });
      } catch (error) {
        console.error('Error fetching dashboard summary:', error);
      }
    })();
  }, []);
  return (
    <DashboardLayout>
      <DashboardHeader />
      <StatsSection dashboardSummary={dashboardSummary} />
      {dashboardStat && <ChartsSection dashboardStat={dashboardStat} />}
      <OfferList />
    </DashboardLayout>
  );
}
