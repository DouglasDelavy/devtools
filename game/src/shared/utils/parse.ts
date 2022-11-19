export const parseJSON = <T>(value: string): T | undefined => {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Parsing JSON', value, error);

    return undefined;
  }
};
