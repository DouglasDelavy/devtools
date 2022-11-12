import { UI } from '../ui';

const setWeather = ({ hours, minutes, seconds }: World.ClockTime): void => {
  NetworkOverrideClockTime(hours, minutes, seconds);
};

const start = (): void => {
  UI.register('world:setTime', setWeather);
};

const shutdown = (): void => {
  // TODO
};

export const WorldTime = {
  start,
  shutdown,
};
