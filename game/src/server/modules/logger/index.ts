const verbose = (message: string): void => {
  console.log(`^4 Verbose: ${message}^0`);
};

const debug = (message: string): void => {
  console.log(`^2 Debug: ${message}^0`);
};

const info = (message: string): void => {
  console.log(`Info: ${message}`);
};

const warn = (message: string): void => {
  console.warn(message);
};

const error = (message: string): void => {
  console.error(message);
};

export const Log = {
  verbose,
  debug,
  info,
  warn,
  error,
};
