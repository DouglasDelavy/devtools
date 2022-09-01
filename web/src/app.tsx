import React from 'react';

import { isDevelopment } from './lib/env';
import { Events } from './lib/events';

import { resources, initialResources } from './resources';

const App = () => {
  const [renderedResources, setRenderedResources] = React.useState<BaseResource[]>(
    isDevelopment() ? initialResources : [],
  );

  const onRenderResource = (name: string, render: boolean) => {
    const resource = resources.find(res => res.name === name);
    if (!resource) return;

    if (render) {
      if (renderedResources.includes(resource)) return;

      setRenderedResources(prevResources => [...prevResources, resource]);
    } else {
      setRenderedResources(resources.filter(x => x.name !== name));
    }
  };

  React.useEffect(() => {
    Events.on('renderResource', onRenderResource);

    return () => {
      Events.off('renderResource', onRenderResource);
    };
  }, []);

  return (
    <>
      {renderedResources.map(({ name, component: Component }) => (
        <Component key={name} />
      ))}
    </>
  );
};

export default App;
