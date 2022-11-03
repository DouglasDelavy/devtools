import { UI } from '../ui';
import { AnimationFlag } from './animation-flags';

const loadDictionary = async (dictionary: string, timeInMS = 5000): Promise<boolean> => {
  if (!DoesAnimDictExist(dictionary)) return false;

  if (HasAnimDictLoaded(dictionary)) return true;

  const endAt = GetGameTimer() + timeInMS;

  return new Promise(resolve => {
    RequestAnimDict(dictionary);

    const tick = setTick(() => {
      if (GetGameTimer() > endAt) {
        clearTick(tick);
        resolve(false);
      }

      if (HasAnimDictLoaded(dictionary)) {
        clearTick(tick);
        resolve(true);
      }
    });
  });
};

const play = async (data: Animation.Task): Promise<void> => {
  const isDictionaryLoaded = await Animation.loadDictionary(data.dictionary);
  if (!isDictionaryLoaded) return;

  TaskPlayAnim(
    data.entity || PlayerPedId(),
    data.dictionary,
    data.name,
    data.blendInSpeed || 4.0,
    data.blendOutSpeed || -4.0,
    data.duration || -1,
    data.flags || AnimationFlag.None,
    data.playbackRate || 0,
    false,
    false,
    false,
  );
};

const stop = (entity?: number) => {
  ClearPedTasks(entity || PlayerPedId());
};

const start = (): void => {
  UI.register('animation:play', play);
  UI.register('animation:stop', stop);
};

const shutdown = (): void => {
  // Todo
};

export const Animation = {
  play,
  loadDictionary,
  start,
  shutdown,
};
