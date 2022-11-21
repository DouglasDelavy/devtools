import { vec3 } from 'gl-matrix';

const bytes = new ArrayBuffer(4);
const floatView = new Float32Array(bytes);
const intView = new Uint32Array(bytes);

const threehalfs = 1.5;

export const Q_rsqrt = (number: number): number => {
  const x2 = number * 0.5;
  floatView[0] = number;

  intView[0] = 0x5f3759df - (intView[0] >> 1);
  let y = floatView[0];
  y = y * (threehalfs - x2 * y * y);

  return y;
};

export const getScaleFromMatrix = (matrix: Float32Array): number[] => {
  return [
    vectorLength([matrix[0], matrix[1], matrix[2], matrix[3]]),
    vectorLength([matrix[4], matrix[5], matrix[6], matrix[7]]),
    vectorLength([matrix[8], matrix[9], matrix[10], matrix[11]]),
  ];
};

export const vectorLength = ([x, y, z = 0, w = 0]: number[]): number => {
  return 1 / Q_rsqrt(x ** 2 + y ** 2 + z ** 2 + w ** 2);
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const toDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

export const eulerToMatrix = (rotation: number[]): [vec3, vec3, vec3] => {
  const radX = toRadians(rotation[0]);
  const radY = toRadians(rotation[1]);
  const radZ = toRadians(rotation[2]);

  const sinX = Math.sin(radX);
  const sinY = Math.sin(radY);
  const sinZ = Math.sin(radZ);

  const cosX = Math.cos(radX);
  const cosY = Math.cos(radY);
  const cosZ = Math.cos(radZ);

  const vecX = vec3.fromValues(cosY * cosZ, cosY * sinZ, -sinY);
  const vecY = vec3.fromValues(cosZ * sinX * sinY - cosX * sinZ, cosX * cosZ - sinX * sinY * sinZ, cosY * sinX);
  const vecZ = vec3.fromValues(-cosX * cosZ * sinY + sinX * sinZ, -cosZ * sinX + cosX * sinY * sinZ, cosX * cosY);

  return [vecX, vecY, vecZ];
};
