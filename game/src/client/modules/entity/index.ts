import { UI } from '../ui';

import { EntityPhysics } from './physics';
import { EntityTransform } from './transform';

const getAlpha = (entity: number): number => {
  return GetEntityAlpha(entity);
};

const setAlpha = ({ entity, alpha }): void => {
  SetEntityAlpha(entity, alpha, false);
};

const start = (): void => {
  EntityTransform.start();
  EntityPhysics.start();

  UI.register('entity:getAlpha', getAlpha);
  UI.register('entity:setAlpha', setAlpha);
};

const shutdown = (): void => {
  EntityTransform.shutdown();
  EntityPhysics.shutdown();
};

export const Entity = {
  start,
  shutdown,
};
