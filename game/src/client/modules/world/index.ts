import { WorldDensity } from './density';
import { WorldWeather } from './weather';

const start = (): void => {
  WorldDensity.start();
  WorldWeather.start();
};

const tick = (): void => {
  WorldDensity.tick();
};

const shutdown = (): void => {
  WorldDensity.shutdown();
  WorldWeather.shutdown();
};

export const World = {
  start,
  tick,
  shutdown,
};
