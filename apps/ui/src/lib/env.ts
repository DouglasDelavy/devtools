export const isProduction = (): boolean => {
  return 'GetParentResourceName' in window;
};

export const isDevelopment = (): boolean => {
  return !isProduction();
};
