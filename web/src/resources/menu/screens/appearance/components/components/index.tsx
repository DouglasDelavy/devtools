import { useEffect, useState } from 'react';

import { ComponentVariation } from './variation';
import { fetchNui } from '@lib/nui';

type Component = {
  id: number;

  drawable: number;
  texture: number;

  maxDrawables: number;
  maxTextures: number;
};

export const Components = () => {
  const [components, setComponents] = useState<Component[]>([]);

  const fetchComponents = (): void => {
    fetchNui<Component[]>('appearance:getComponents')
      .then(result => {
        if (!result) return;

        setComponents(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return (
    <div className="flex flex-col gap-2 pb-1">
      {components.map(component => (
        <ComponentVariation
          componentId={component.id}
          initialDrawable={component.drawable}
          initialTexture={component.texture}
          maxDrawables={component.maxDrawables}
          initialMaxTextures={component.maxTextures}
        />
      ))}
    </div>
  );
};
