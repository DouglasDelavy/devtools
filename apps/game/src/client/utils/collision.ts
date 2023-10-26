export const loadColisionAroundEntity = (entity: number, timeoutInMs = 1000): Promise<boolean> => {
  return new Promise(resolve => {
    const startedAt = GetGameTimer();

    const tick = setTick(() => {
      const timeoutOccurred = GetGameTimer() - startedAt > timeoutInMs;
      const isCollisionLoaded = HasCollisionLoadedAroundEntity(entity);

      if (isCollisionLoaded || timeoutOccurred) {
        clearTick(tick);
        resolve(isCollisionLoaded);
      }
    });
  });
};
