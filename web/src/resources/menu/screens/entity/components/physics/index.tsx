import { useState } from 'react';

import { fetchNui } from '@lib/nui';
import { NumberInput } from '@lib/components/number-input';

import { useEntityContext } from '../../context';

const INITIAL_STATE = {
  velocity: [0, 0, 0],
  angularVelocity: [0, 0, 0],
};

type Physics = typeof INITIAL_STATE;

export const EntityPhysics = () => {
  const { entity } = useEntityContext();

  const [physics, setPhysics] = useState<Physics>(INITIAL_STATE);

  const setVelocity = (x: number, y: number, z: number): void => {
    physics.velocity[0] = x;
    physics.velocity[1] = y;
    physics.velocity[2] = z;

    setPhysics(state => ({ ...state, velocity: physics.velocity }));
    fetchNui('entity:setVelocity', { entity, velocity: physics.velocity }).catch(console.error);
  };

  const setAngularVelocity = (x: number, y: number, z: number): void => {
    physics.angularVelocity[0] = x;
    physics.angularVelocity[1] = y;
    physics.angularVelocity[2] = z;

    setPhysics(state => ({ ...state, angularVelocity: physics.angularVelocity }));
    fetchNui('entity:setAngularVelocity', { entity, angularVelocity: physics.angularVelocity }).catch(console.error);
  };

  return (
    <main className="flex mt-2 flex-col">
      <div className="w-full flex items-center gap-1">
        <p className="w-1/2 text-xs">Velocity</p>

        <div className="flex gap-1">
          <NumberInput
            label="X"
            value={physics.velocity[0]}
            onChange={value => setVelocity(value, physics.velocity[1], physics.velocity[2])}
          />
          <NumberInput
            label="Y"
            value={physics.velocity[1]}
            onChange={value => setVelocity(physics.velocity[0], value, physics.velocity[2])}
          />
          <NumberInput
            label="Z"
            value={physics.velocity[2]}
            onChange={value => setVelocity(physics.velocity[0], physics.velocity[1], value)}
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-1">
        <p className="w-1/2 text-xs">Angular Velocity</p>

        <div className="flex gap-1">
          <NumberInput
            label="X"
            value={physics.angularVelocity[0]}
            onChange={value => setAngularVelocity(value, physics.angularVelocity[1], physics.angularVelocity[2])}
          />
          <NumberInput
            label="Y"
            value={physics.angularVelocity[1]}
            onChange={value => setAngularVelocity(physics.angularVelocity[0], value, physics.angularVelocity[2])}
          />
          <NumberInput
            label="Z"
            value={physics.angularVelocity[2]}
            onChange={value => setAngularVelocity(physics.angularVelocity[0], physics.angularVelocity[1], value)}
          />
        </div>
      </div>
    </main>
  );
};
