// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LoginProvider } from './contexts/LoginContext.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackComponent from './components/FallbackComponent.tsx';
import { FavouritesProvider } from './contexts/FavouritesContext.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <LoginProvider>
    <FavouritesProvider>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <App />
      </ErrorBoundary>
    </FavouritesProvider>
  </LoginProvider>
  // </StrictMode>
);
