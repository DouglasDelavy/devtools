import { WorldDensity } from './density';
import { WorldTime } from './time';
import { WorldWeather } from './weather';

const start = (): void => {
  WorldDensity.start();
  WorldWeather.start();
  WorldTime.start();
};

const tick = (): void => {
  WorldDensity.tick();
  WorldTime.tick();
};

const shutdown = (): void => {
  WorldDensity.shutdown();
  WorldWeather.shutdown();
  WorldTime.shutdown();
};

export const World = {
  start,
  tick,
  shutdown,
};
