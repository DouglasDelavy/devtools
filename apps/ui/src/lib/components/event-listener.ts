import React from 'react';

import { Events } from '../events';

export const EventListener = () => {
  React.useEffect(() => {
    window.addEventListener('message', Events.listener);

    return () => {
      window.removeEventListener('message', Events.listener);
    };
  }, []);

  return null;
};
