// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LoginProvider } from './contexts/LoginContext.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackComponent from './components/FallbackComponent.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <LoginProvider>
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <App />
    </ErrorBoundary>
  </LoginProvider>
  // </StrictMode>
);
