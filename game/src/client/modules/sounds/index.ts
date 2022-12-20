import { UI } from '@modules/ui';

let _sounds: number[];

const playFrontend = ({ audioName, audioRef, p3 = true }): void => {
  const soundId = GetSoundId();

  PlaySoundFrontend(soundId, audioName, audioRef, p3);

  _sounds.push(soundId);
};

const stop = (): void => {
  const soundId = _sounds.pop();

  if (soundId !== undefined) {
    ReleaseSoundId(soundId);
    StopSound(soundId);
  }
};

const stopAllSounds = (): void => {
  while (_sounds.length > 0) {
    stop();
  }
};

const start = (): void => {
  _sounds = [];

  UI.register('sound:stop', Sound.stop);
  UI.register('sound:frontend:play', Sound.playFrontend);
};

const shutdown = (): void => {
  stopAllSounds();

  _sounds = undefined;
};

export const Sound = {
  playFrontend,
  stop,

  start,
  shutdown,
};
