import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Dashboard } from 'src/api/dashboard';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits'; // Re-added component

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const [dashStats, setDashStats] = useState<any>();

  const fetchStats = async () => {
    const response = await Dashboard.stats();
    if (response) {
      setDashStats(response.data);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []); // Empty dependency array to run only on mount

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Orders"
            percent={0} // You can update it based on your data if needed
            total={dashStats?.totalOrders || 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: dashStats?.monthlySales || [], // Using monthlySales data for the series
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Sales"
            percent={0} // You can update it based on your data if needed
            total={dashStats?.totalSales || 0}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: dashStats?.monthlySales || [], // Using monthlySales data for the series
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Trending Books"
            percent={0} // You can update it based on your data if needed
            total={dashStats?.trendingBooks || 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: dashStats?.monthlySales || [], // Using monthlySales data for the series
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Books"
            percent={0} // You can update it based on your data if needed
            total={dashStats?.totalBooks || 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: dashStats?.monthlySales || [], // Using monthlySales data for the series
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>

        {/* Re-added Website Visits Widget */}
        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: dashStats?.monthlySales || [] }, // Using monthlySales for Team A
                { name: 'Team B', data: dashStats?.monthlySales || [] }, // Using monthlySales for Team B
              ],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
