import { UI } from '../ui';

import { EntityPhysics } from './physics';
import { EntityTransform } from './transform';

const getAlpha = (entity: number): number => {
  return GetEntityAlpha(entity);
};

const setAlpha = ({ entity, alpha }): void => {
  SetEntityAlpha(entity, alpha, false);
};

const deleteEntity = (entity: number): void => {
  if (!DoesEntityExist(entity) || entity === PlayerPedId()) return;

  if (!NetworkGetEntityIsNetworked(entity)) {
    SetEntityAsMissionEntity(entity, false, true);

    DeleteEntity(entity);
  } else {
    emitNet('devtools:server:deleteEntity', NetworkGetNetworkIdFromEntity(entity));
  }
};

const start = (): void => {
  EntityTransform.start();
  EntityPhysics.start();

  UI.register('entity:getAlpha', getAlpha);
  UI.register('entity:setAlpha', setAlpha);

  UI.register('entity:delete', deleteEntity);
};

const shutdown = (): void => {
  EntityTransform.shutdown();
  EntityPhysics.shutdown();
};

export const Entity = {
  start,
  shutdown,
};
