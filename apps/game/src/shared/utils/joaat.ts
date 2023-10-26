export const joaat = (key: string): number => {
  const skey = key.toLowerCase();
  const hash = new Uint32Array(1);

  for (let i = 0; i < skey.length; ++i) {
    hash[0] += skey.charCodeAt(i);
    hash[0] += hash[0] << 10;
    hash[0] ^= hash[0] >>> 6;
  }

  hash[0] += hash[0] << 3;
  hash[0] ^= hash[0] >>> 11;
  hash[0] += hash[0] << 15;

  return hash[0];
};

export const joaatString = (key: string): string => {
  return '0x' + joaat(key).toString(16).toUpperCase();
};
