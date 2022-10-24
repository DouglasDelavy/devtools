import React from 'react';
import ReactDOM from 'react-dom/client';

import { isDevelopment } from './lib/env';
import { Events } from './lib/events';
import { EventListener } from './lib/components/event-listener';

import { App } from './app';

if (isDevelopment()) {
  window.emitEvent = Events.emit;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <EventListener />
  </React.StrictMode>,
);

