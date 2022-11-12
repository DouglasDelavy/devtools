import { UI } from '../ui';

const setWeather = ({ weatherType, transitionTimeInSeconds }: World.Weather): void => {
  SetWeatherTypeOvertimePersist(weatherType, transitionTimeInSeconds);
};

const start = (): void => {
  UI.register('world:setWeather', setWeather);
};

const shutdown = (): void => {
  // TODO
};

export const WorldWeather = {
  start,
  shutdown,
};
