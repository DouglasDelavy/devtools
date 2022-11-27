const PREFIX = 'devtools';

const get = (key: string): string => {
  return GetResourceKvpString(`${PREFIX}:${key}`);
};

const set = (key: string, value: string): void => {
  SetResourceKvp(`${PREFIX}:${key}`, value);
};

const getInt = (key: string): number => {
  return GetResourceKvpInt(`${PREFIX}:${key}`);
};

const setInt = (key: string, value: number): void => {
  SetResourceKvpInt(`${PREFIX}:${key}`, value);
};

const getFloat = (key: string): number => {
  return GetResourceKvpFloat(`${PREFIX}:${key}`);
};

const setFloat = (key: string, value: number): void => {
  SetResourceKvpFloat(`${PREFIX}:${key}`, value);
};

const getBool = (key: string): boolean => {
  const value = getInt(key);

  return Boolean(value);
};

const setBool = (key: string, value: boolean): void => {
  SetResourceKvpInt(`${PREFIX}:${key}`, Number(value));
};

export const Settings = {
  get,
  set,
  getInt,
  setInt,
  getFloat,
  setFloat,
  getBool,
  setBool,
};
