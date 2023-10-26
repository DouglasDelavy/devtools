import { useState } from 'react';

import { fetchNui } from '@lib/nui';
import { ArrowInput } from '@lib/components/arrow-input';

const PROPS_SETTINGS: Record<number, { label: string }> = {
  [0]: { label: 'Hats' },
  [1]: { label: 'Glasses' },
  [2]: { label: 'Ears' },
  [6]: { label: 'Watches' },
  [7]: { label: 'Bracelets' },
};

type SetPropResult = {
  maxTextures: number;
  propName: string;
};

type PropVariationProps = {
  propId: number;
  maxDrawables: number;

  initialDrawable: number;
  initialTexture: number;
  initialMaxTextures: number;
};

export const PropVariation = ({
  propId,
  initialDrawable,
  initialTexture,
  initialMaxTextures,
  maxDrawables,
}: PropVariationProps) => {
  const [currentDrawable, setCurrentDrawable] = useState(initialDrawable);
  const [maxTextures, setMaxTextures] = useState(initialMaxTextures);
  const [propName, setPropName] = useState<string>();

  const setComponent = (drawable: number, texture: number): void => {
    fetchNui<SetPropResult>('appearance:setProp', { propId, drawable, texture })
      .then(result => {
        if (!result) return;

        setMaxTextures(result.maxTextures);
        setPropName(result.propName);
      })
      .catch(console.error);
  };

  const handleChangeDrawable = (drawable: number): void => {
    setComponent(drawable, 0);
    setCurrentDrawable(drawable);
  };

  const handleChangeTexture = (texture: number): void => {
    setComponent(currentDrawable, texture);
  };

  const component = PROPS_SETTINGS[propId];
  if (!component) return null;

  const name = propName ? ` - ${propName}` : null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-center">
        {component.label}
        {name}
      </p>
      <ArrowInput initialValue={initialDrawable} min={-1} max={maxDrawables} onChange={handleChangeDrawable} />
      <ArrowInput initialValue={initialTexture} min={0} max={maxTextures} onChange={handleChangeTexture} />
    </div>
  );
};
