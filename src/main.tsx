import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

declare global {
  interface Window {
    mgt?: {
      clearMarks?: () => void;
      [key: string]: unknown;
    };
  }
}

window.mgt ??= {};
if (typeof window.mgt.clearMarks !== 'function') {
  window.mgt.clearMarks = () => {};
}

window.addEventListener(
  'error',
  (event) => {
    if (String(event.message).includes('mgt.clearMarks is not a function')) {
      event.preventDefault();
    }
  },
  true,
);

window.addEventListener('unhandledrejection', (event) => {
  if (String(event.reason).includes('mgt.clearMarks is not a function')) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
