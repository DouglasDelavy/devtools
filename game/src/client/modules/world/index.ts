import { WorldDensity } from './density';
import { WorldTime } from './time';
import { WorldTimecycle } from './timecycle';
import { WorldWeather } from './weather';

const start = (): void => {
  WorldDensity.start();
  WorldWeather.start();
  WorldTime.start();
  WorldTimecycle.start();
};

const tick = (): void => {
  WorldDensity.tick();
  WorldTime.tick();
};

const shutdown = (): void => {
  WorldDensity.shutdown();
  WorldWeather.shutdown();
  WorldTime.shutdown();
  WorldTimecycle.shutdown();
};

export const World = {
  start,
  tick,
  shutdown,
};
