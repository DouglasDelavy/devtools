import { UI } from '../ui';

const setVelocity = ({ entity, velocity }): void => {
  SetEntityVelocity(entity, velocity[0], velocity[1], velocity[2]);
};

const setAngularVelocity = ({ entity, angularVelocity }): void => {
  SetEntityAngularVelocity(entity, angularVelocity[0], angularVelocity[1], angularVelocity[2]);
};

const start = (): void => {
  UI.register('entity:setVelocity', setVelocity);
  UI.register('entity:setAngularVelocity', setAngularVelocity);
};

const shutdown = (): void => {
  // TODO
};

export const EntityPhysics = {
  start,
  shutdown,
};
