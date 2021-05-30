import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn:
    'https://8ccfc8268d3c42c4a349a2d190c4bb1f@o758666.ingest.sentry.io/5792440',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
