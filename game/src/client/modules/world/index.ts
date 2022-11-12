import { WorldDensity } from './density';

const start = (): void => {
  WorldDensity.start();
};

const tick = (): void => {
  WorldDensity.tick();
};

const shutdown = (): void => {
  WorldDensity.shutdown();
};

export const World = {
  start,
  tick,
  shutdown,
};
