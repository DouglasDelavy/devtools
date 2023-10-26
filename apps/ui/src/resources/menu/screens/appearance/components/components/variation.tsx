import { ArrowInput } from '@lib/components/arrow-input';
import { fetchNui } from '@lib/nui';
import { useState } from 'react';

const COMPONENTS_SETTINGS: Record<number, { label: string }> = {
  [0]: { label: 'Head' },
  [1]: { label: 'Masks' },
  [2]: { label: 'Hair Styles' },
  [3]: { label: 'Torsos' },
  [4]: { label: 'Legs' },
  [5]: { label: 'Bags and Parachutes' },
  [6]: { label: 'Shoes' },
  [7]: { label: 'Accessories' },
  [8]: { label: 'Undershirts' },
  [9]: { label: 'Body Armors' },
  [10]: { label: 'Decals' },
  [11]: { label: 'Tops' },
};

type SetComponentResult = {
  maxTextures: number;
  componentName: string;
};

type ComponentVariationProps = {
  componentId: number;
  maxDrawables: number;

  initialDrawable: number;
  initialTexture: number;
  initialMaxTextures: number;
};

export const ComponentVariation = ({
  componentId,
  initialDrawable,
  initialTexture,
  initialMaxTextures,
  maxDrawables,
}: ComponentVariationProps) => {
  const [currentDrawable, setCurrentDrawable] = useState(initialDrawable);
  const [maxTextures, setMaxTextures] = useState(initialMaxTextures);
  const [componentName, setComponentName] = useState<string>();

  const setComponent = (drawable: number, texture: number): void => {
    fetchNui<SetComponentResult>('appearance:setComponent', { componentId, drawable, texture })
      .then(result => {
        if (!result) return;

        setMaxTextures(result.maxTextures);
        setComponentName(result.componentName);
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

  const component = COMPONENTS_SETTINGS[componentId];
  if (!component) return null;

  const name = componentName ? ` - ${componentName}` : null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-center">
        {component.label}
        {name}
      </p>
      <ArrowInput initialValue={initialDrawable} min={0} max={maxDrawables} onChange={handleChangeDrawable} />
      <ArrowInput initialValue={initialTexture} min={0} max={maxTextures} onChange={handleChangeTexture} />
    </div>
  );
};
