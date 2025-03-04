import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AppLayout from './components/AppLayout';
import { lazy, Suspense } from 'react';
import Spinner from './components/Spinner';
import MyRecipes from './pages/MyRecipes';
import PublicRoute from './pages/PublicRoute';

const queryClient = new QueryClient();

const Home = lazy(() => import('./pages/Home'));
const OurMission = lazy(() => import('./pages/OurMission'));
const Recipe = lazy(() => import('./pages/Recipe'));
const Recipes = lazy(() => import('./pages/Recipes'));
const Login = lazy(() => import('./pages/Login'));
const Favourites = lazy(() => import('./pages/Favourites'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute'));

const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/ourmission',
        element: (
          <Suspense fallback={<Spinner />}>
            <OurMission />
          </Suspense>
        ),
      },
      {
        path: '/recipes',
        element: (
          <Suspense fallback={<Spinner />}>
            <Recipes />
          </Suspense>
        ),
      },
      {
        path: '/recipes/:id',
        element: (
          <Suspense fallback={<Spinner />}>
            <Recipe />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: <PublicRoute />,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'favourites',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<Spinner />}>
                <Favourites />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/profile',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <UserProfile />,
            children: [
              {
                path: 'myrecipes',
                element: <MyRecipes />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
