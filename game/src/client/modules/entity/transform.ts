import { UI } from '../ui';

import { getScaleFromMatrix } from '../../utils/math';

const getMatrix = (entity: number): Float32Array => {
  const [f, r, u, a] = GetEntityMatrix(entity);

  return new Float32Array([r[0], r[1], r[2], 0, f[0], f[1], f[2], 0, u[0], u[1], u[2], 0, a[0], a[1], a[2], 1]);
};

const getScale = (entity: number): number[] => {
  const matrix = getMatrix(entity);

  return getScaleFromMatrix(matrix);
};

const getTransform = (entity: number): Transform => {
  const position = GetEntityCoords(entity, false);
  const rotation = GetEntityRotation(entity, 2);
  const scale = getScale(entity);

  return { position, rotation, scale };
};

const setPosition = ({ entity, position }): void => {
  SetEntityCoords(entity, position[0], position[1], position[2], false, false, false, false);
};

const setRotation = ({ entity, rotation }): void => {
  SetEntityRotation(entity, rotation[0], rotation[1], rotation[2], 2, false);
};

const setScale = ({ entity, scale }): void => {
  const matrix = getMatrix(entity);
  const realScale = getScale(entity);

  const [x, y, z] = [scale[0] / realScale[0], scale[1] / realScale[1], scale[2] / realScale[2]];

  matrix[0] *= x;
  matrix[1] *= x;
  matrix[2] *= x;
  matrix[3] *= x;

  matrix[4] *= y;
  matrix[5] *= y;
  matrix[6] *= y;
  matrix[7] *= y;

  matrix[8] *= z;
  matrix[9] *= z;
  matrix[10] *= z;
  matrix[11] *= z;

  SetEntityMatrix(
    entity,
    matrix[4],
    matrix[5],
    matrix[6],
    matrix[0],
    matrix[1],
    matrix[2],
    matrix[8],
    matrix[9],
    matrix[10],
    matrix[12],
    matrix[13],
    matrix[14],
  );
};

const start = (): void => {
  UI.register('entity:getTransform', getTransform);

  UI.register('entity:setTransformPosition', setPosition);
  UI.register('entity:setTransformRotation', setRotation);
  UI.register('entity:setTransformScale', setScale);
};

const shutdown = (): void => {
  // TODO
};

export const EntityTransform = {
  start,
  shutdown,
};
