import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/shared/styles/global.css';
import '../src/shared/i18n/i18n';
import MockDate from 'mockdate';
import { mswLoader } from 'msw-storybook-addon/csf3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MemoryRouter } from 'react-router-dom';
import { mswHandlers } from './msw-handlers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
  loaders: [mswLoader()],
  decorators: [
    (Story) => (
      <GoogleOAuthProvider clientId="storybook-google-client-id">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-main)' }}>
              <Story />
            </div>
          </MemoryRouter>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    ),
  ],
  async beforeEach({ msw }) {
    if (msw) {
      msw.use(...mswHandlers);
    }
    localStorage.setItem('researchpulse_lang', 'vi');
    MockDate.set('2025-01-01T12:00:00Z');
  },
};

export default preview;