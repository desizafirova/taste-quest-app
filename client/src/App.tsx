import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router';
import OurMission from './pages/OurMission';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import Home from './pages/Home';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Favourites from './pages/Favourites';
import UserProfile from './pages/UserProfile';
import FallbackComponent from './components/FallbackComponent';

const queryClient = new QueryClient();

const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/ourmission', element: <OurMission /> },
      {
        path: '/recipes',
        element: <Recipes />,
      },
      { path: '/recipes/:id', element: <Recipe /> },
      { path: '/login', element: <Login /> },
      {
        path: 'favourites',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <Favourites /> }],
      },
      {
        path: '/profile',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <UserProfile /> }],
      },
      {
        path: '*',
        element: <FallbackComponent />,
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
