import { UI } from '../ui';

import { EntityPhysics } from './physics';
import { EntityTransform } from './transform';

const getAlpha = (entity: number): number => {
  return GetEntityAlpha(entity);
};

const setAlpha = ({ entity, alpha }): void => {
  SetEntityAlpha(entity, alpha, false);
};

const setHealth = ({ entity, value }): void => {
  SetEntityHealth(entity, value);
};

const getHealth = (entity: number): number => {
  return GetEntityHealth(entity);
};

const setMaxHealth = ({ entity, value }): void => {
  if (!DoesEntityExist(entity)) return;

  SetEntityMaxHealth(entity, value);

  if (IsEntityAPed(entity)) {
    SetPedMaxHealth(entity, value);
  }
};

const getMaxHealth = (entity: number): number => {
  return GetEntityMaxHealth(entity);
};

const setFreeze = ({ entity, value }): void => {
  FreezeEntityPosition(entity, value);
};

const getFreeze = (entity: number): boolean => {
  return IsEntityPositionFrozen(entity);
};

const setVisible = ({ entity, value }): void => {
  SetEntityVisible(entity, value, false);
};

const getVisible = (entity: number): boolean => {
  return IsEntityVisible(entity);
};

const setCollision = ({ entity, value }): void => {
  SetEntityCollision(entity, value, value);
};

const getCollision = (entity: number): boolean => {
  return GetEntityCollisionDisabled(entity);
};

const setLodDistance = ({ entity, value }): void => {
  SetEntityLodDist(entity, value);
};

const getLodDistance = (entity: number): number => {
  return GetEntityLodDist(entity);
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

  UI.register('entity:delete', deleteEntity);

  UI.register('entity:setVisible', setVisible);
  UI.register('entity:getVisible', getVisible);

  UI.register('entity:setFreeze', setFreeze);
  UI.register('entity:getFreeze', getFreeze);

  UI.register('entity:setCollision', setCollision);
  UI.register('entity:getCollision', getCollision);

  UI.register('entity:setLodDistance', setLodDistance);
  UI.register('entity:getLodDistance', getLodDistance);

  UI.register('entity:getAlpha', getAlpha);
  UI.register('entity:setAlpha', setAlpha);

  UI.register('entity:getHealth', getHealth);
  UI.register('entity:setHealth', setHealth);

  UI.register('entity:getMaxHealth', getMaxHealth);
  UI.register('entity:setMaxHealth', setMaxHealth);
};

const shutdown = (): void => {
  EntityTransform.shutdown();
  EntityPhysics.shutdown();
};

export const Entity = {
  start,
  shutdown,
};
