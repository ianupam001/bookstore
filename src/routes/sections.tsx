import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { useAuth } from 'src/hooks/useAuth';
import { ProtectedRoute } from 'src/containers/ProtectedRoute';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ProductDetails = lazy(() => import('src/sections/product/product-details'));
export const ComingSoon = lazy(() => import('src/sections/coming-soon/coming-soon'));
export const HomePageBanners = lazy(() => import('src/pages/home-banner'));
export const ProductPageBanners = lazy(() => import('src/pages/product-banner'));
export const AuthorsPageView = lazy(() => import('src/pages/authors'));
export const PublishersPageView = lazy(() => import('src/pages/publishers'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  const { user } = useAuth();

  return useRoutes([
    {
      path: 'sign-in',
      element: user ? (
        <Navigate to="/" replace />
      ) : (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      element: <ProtectedRoute />, // Protects the dashboard routes
      children: [
        {
          element: (
            <DashboardLayout>
              <Suspense fallback={renderFallback}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ),
          children: [
            { element: <HomePage />, index: true },
            { path: 'user', element: <UserPage /> },
            { path: 'books', element: <ProductsPage /> },
            { path: 'blog', element: <BlogPage /> },
            { path: 'import', element: <ComingSoon /> },
            { path: 'books/:id', element: <ProductDetails /> },
            { path: 'promotions/home-banners', element: <HomePageBanners /> },
            { path: 'promotions/product-banners', element: <ProductPageBanners /> },
            { path: 'authors', element: <AuthorsPageView /> },
            { path: 'publishers', element: <PublishersPageView /> },
          ],
        },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
