import React from 'react';

import { isDevelopment } from './lib/env';
import { Events } from './lib/events';
import { fetchNui } from './lib/nui';

import { resources, initialResources } from './resources';

import './styles/index.scss';

export const App = () => {
  const [renderedResources, setRenderedResources] = React.useState<BaseResource[]>(
    isDevelopment() ? initialResources : [],
  );

  const onRenderResource = (name: string, render: boolean) => {
    const resource = resources.find(res => res.name === name);
    if (!resource) return;

    if (render) {
      setRenderedResources(prevResources => [...prevResources.filter(x => x.name !== name), resource]);
    } else {
      setRenderedResources(resources.filter(x => x.name !== name));
    }
  };

  React.useEffect(() => {
    Events.on('renderResource', onRenderResource);

    fetchNui('ui:loaded').catch(console.error);

    return () => {
      Events.off('renderResource', onRenderResource);
    };
  }, []);

  return (
    <>
      <div
        className={`w-screen h-screen ${
          isDevelopment() ? "bg-[url('../assets/images/background.jpg')] bg-cover bg-center" : ''
        } `}
      >
        {renderedResources.map(({ name, component: Component }) => (
          <Component key={name} />
        ))}
      </div>
    </>
  );
};
