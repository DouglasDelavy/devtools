const FLOATS_REGEX = /[+-]?\d*\.\d*/g;

export const parseFloatArray = (str: string): number[] => {
  return str.match(FLOATS_REGEX)?.map(parseFloat) || [0, 0, 0];
};
