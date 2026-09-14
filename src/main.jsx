/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: main.jsx
 */
import { StrictMode } from 'react'
import './shared/i18n/i18n'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './shared/styles/global.css'
import App from './App.jsx'
import AppProviders from './app/providers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
