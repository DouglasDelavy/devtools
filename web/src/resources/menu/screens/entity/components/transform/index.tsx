import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { NumberInput } from '@lib/components/number-input';

import { useEntityContext } from '../../context';

const INITIAL_TRANSFORM = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [0, 0, 0],
};

type Transform = typeof INITIAL_TRANSFORM;

export const EntityTransform = () => {
  const { entity } = useEntityContext();

  const [transform, setTransform] = useState(INITIAL_TRANSFORM);

  useEffect(() => {
    fetchNui<Transform>('entity:getTransform', entity).then(result => {
      if (!result) return;

      setTransform(result);
    });
  }, [entity]);

  const emit = (event: string, data = {}): void => {
    fetchNui(event, data).catch(console.error);
  };

  const setPosition = (x: number, y: number, z: number): void => {
    transform.position[0] = x;
    transform.position[1] = y;
    transform.position[2] = z;

    setTransform(state => ({ ...state, position: transform.position }));
    emit('entity:setTransformPosition', { entity, position: transform.position });
  };

  const setRotation = (x: number, y: number, z: number): void => {
    transform.rotation[0] = x;
    transform.rotation[1] = y;
    transform.rotation[2] = z;

    setTransform(state => ({ ...state, rotation: transform.rotation }));
    emit('entity:setTransformRotation', { entity, rotation: transform.rotation });
  };

  const setScale = (x: number, y: number, z: number): void => {
    transform.scale[0] = x;
    transform.scale[1] = y;
    transform.scale[2] = z;

    setTransform(state => ({ ...state, scale: transform.scale }));
    emit('entity:setTransformScale', { entity, scale: transform.scale });
  };

  return (
    <main className="flex mt-2 flex-col gap-1">
      <div className="w-full flex items-center gap-1">
        <p className="w-1/2 text-xs">Position</p>

        <div className="flex gap-1">
          <NumberInput
            label="X"
            value={transform.position[0]}
            onChange={value => setPosition(value, transform.position[1], transform.position[2])}
          />
          <NumberInput
            label="Y"
            value={transform.position[1]}
            onChange={value => setPosition(transform.position[0], value, transform.position[2])}
          />
          <NumberInput
            label="Z"
            value={transform.position[2]}
            onChange={value => setPosition(transform.position[0], transform.position[1], value)}
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-1">
        <p className="w-1/2 text-xs">Rotation</p>

        <div className="flex gap-1">
          <NumberInput
            label="X"
            value={transform.rotation[0]}
            onChange={value => setRotation(value, transform.rotation[1], transform.rotation[2])}
          />
          <NumberInput
            label="Y"
            value={transform.rotation[1]}
            onChange={value => setRotation(transform.rotation[0], value, transform.rotation[2])}
          />
          <NumberInput
            label="Z"
            value={transform.rotation[2]}
            onChange={value => setRotation(transform.rotation[0], transform.rotation[1], value)}
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-1">
        <p className="w-1/2 text-xs">Scale</p>

        <div className="flex gap-1">
          <NumberInput
            label="X"
            value={transform.scale[0]}
            onChange={value => setScale(value, transform.scale[1], transform.scale[2])}
          />
          <NumberInput
            label="Y"
            value={transform.scale[1]}
            onChange={value => setScale(transform.scale[0], value, transform.scale[2])}
          />
          <NumberInput
            label="Z"
            value={transform.scale[2]}
            onChange={value => setScale(transform.scale[0], transform.scale[1], value)}
          />
        </div>
      </div>
    </main>
  );
};
