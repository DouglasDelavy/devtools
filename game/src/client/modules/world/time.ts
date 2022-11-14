import { UI } from '../ui';

let _time: World.ClockTime;
let _freezed: boolean;

const setTime = ({ hours, minutes, seconds }: World.ClockTime): void => {
  NetworkOverrideClockTime(hours, minutes, seconds);
};

const freezeTime = (state: boolean): void => {
  _freezed = state;
  _time = { hours: GetClockHours(), minutes: GetClockMinutes(), seconds: GetClockSeconds() };
};

const freezeTick = (): void => {
  if (!_freezed) return;

  setTime(_time);
};

const start = (): void => {
  UI.register('world:setTime', setTime);
  UI.register('world:setFreeze', freezeTime);
};

const tick = (): void => {
  freezeTick();
};

const shutdown = (): void => {
  _time = undefined;
  _freezed = undefined;
};

export const WorldTime = {
  start,
  tick,
  shutdown,
};
