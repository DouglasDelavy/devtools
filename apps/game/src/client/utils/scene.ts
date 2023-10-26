export const loadScene = (position: number[], direction: number[], range = 50): Promise<boolean> => {
  const isLoadSceneStarted = NewLoadSceneStart(
    position[0],
    position[1],
    position[2],
    direction[0],
    direction[1],
    direction[2],
    range,
    0,
  );

  return new Promise(resolve => {
    if (!isLoadSceneStarted) {
      resolve(false);
    }

    const startedAt = GetGameTimer();

    const tick = setTick(() => {
      const timeoutOccurred = GetGameTimer() - startedAt > 1000;
      const isSceneLoaded = IsNewLoadSceneLoaded();

      if (isSceneLoaded || timeoutOccurred) {
        NewLoadSceneStop();

        clearTick(tick);
        resolve(isSceneLoaded);
      }
    });
  });
};
