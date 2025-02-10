'use client';

import { useEffect, useState, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { DashboardContent } from 'src/layouts/dashboard';
import { Dashboard } from 'src/api/dashboard';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';

export function OverviewAnalyticsView() {
  const [dashStats, setDashStats] = useState<any>();

  const fetchStats = useCallback(async () => {
    const response = await Dashboard.stats();
    if (response) {
      setDashStats(response.data);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total books"
            percent={0}
            total={dashStats?.totalBooks || 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: dashStats?.monthlySales || [5, 3, 5, 7, 9, 11],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Authors"
            percent={0}
            total={dashStats?.totalAuthors || 0}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: dashStats?.monthlySales || [6, 1, 5, 7, 9, 11],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Pulishers"
            percent={0}
            total={dashStats?.totalPublishers || 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: dashStats?.monthlySales || [1, 8, 5, 7, 9, 11],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Categories"
            percent={0}
            total={dashStats?.totalCategories || 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: dashStats?.monthlySales || [1, 8, 5, 7, 9, 11],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: dashStats?.monthlySales || [1, 8, 5, 7, 9, 11] },
                { name: 'Team B', data: dashStats?.monthlySales || [1, 8, 5, 7, 9, 11] },
              ],
            }}
          />
        </Grid>
      </Grid>

      {/* New section for settings buttons */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: '100%', minHeight: 64 }}
            >
              Affiliate Stores Setting
            </Button>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ height: '100%', minHeight: 64 }}
            >
              Google Ads Settings
            </Button>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              sx={{ height: '100%', minHeight: 64 }}
            >
              SEO Settings
            </Button>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ height: '100%', minHeight: 64 }}
            >
              Master Settings
            </Button>
          </Grid>
        </Grid>
      </Box>
    </DashboardContent>
  );
}
