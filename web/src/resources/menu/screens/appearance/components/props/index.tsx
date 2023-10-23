import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';

import { PropVariation } from './variation';

type Prop = {
  id: number;

  drawable: number;
  texture: number;

  maxDrawables: number;
  maxTextures: number;
};

export const Props = () => {
  const [props, setProps] = useState<Prop[]>([]);

  const fetchProps = (): void => {
    fetchNui<Prop[]>('appearance:getProps')
      .then(result => {
        if (!result) return;

        setProps(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchProps();
  }, []);

  return (
    <div className="flex flex-col gap-2 pb-1">
      {props.map(prop => (
        <PropVariation
          propId={prop.id}
          initialDrawable={prop.drawable}
          initialTexture={prop.texture}
          maxDrawables={prop.maxDrawables}
          initialMaxTextures={prop.maxTextures}
        />
      ))}
    </div>
  );
};
