import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import OurMission from './pages/OurMission';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import Home from './pages/Home';

const queryClient = new QueryClient();

const Router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/ourmission', element: <OurMission /> },
  {
    path: '/recipes',
    element: <Recipes />,
    children: [{ path: '/recipes/:id', element: <Recipe /> }],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
