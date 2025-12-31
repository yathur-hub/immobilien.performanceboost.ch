import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

/**
 * Suppression of ResizeObserver loop errors.
 * These errors are common in Recharts and other layout-heavy libraries 
 * during window resizing or complex layout shifts. They are generally 
 * benign but can clutter logs or trigger development overlays.
 */
const suppressResizeObserverErrors = (event: ErrorEvent) => {
  const message = event.message || (event.error && event.error.message) || "";
  if (
    message.includes('ResizeObserver loop completed with undelivered notifications') ||
    message.includes('ResizeObserver loop limit exceeded')
  ) {
    // Prevent the error from propagating and being reported to the console as an error
    event.stopImmediatePropagation();
    event.preventDefault();
  }
};

window.addEventListener('error', suppressResizeObserverErrors);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);