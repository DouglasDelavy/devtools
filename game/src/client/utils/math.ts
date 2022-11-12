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
