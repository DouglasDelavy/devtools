import { UI } from '../ui';

let _time: World.ClockTime;
let _freezed: boolean;

const setTime = (time: World.ClockTime): void => {
  if (_freezed) {
    _time = time;
    return;
  }

  NetworkOverrideClockTime(time.hours, time.minutes, time.seconds);
};

const freezeTime = (state: boolean): void => {
  _freezed = state;
  _time = { hours: GetClockHours(), minutes: GetClockMinutes(), seconds: GetClockSeconds() };
};

const freezeTick = (): void => {
  if (!_freezed) return;

  NetworkOverrideClockTime(_time.hours, _time.minutes, _time.seconds);
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
