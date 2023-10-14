const REPLACE_PATTERN = /\u0000/g;

export const getString = (buffer: ArrayBuffer, offset: number, length = 64): string => {
  return String.fromCharCode.apply(null, new Uint8Array(buffer, offset, length)).replace(REPLACE_PATTERN, '');
};
