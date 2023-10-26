export const fadeOutScreen = (durationInMs: number): Promise<void> => {
  return new Promise(resolve => {
    DoScreenFadeOut(durationInMs);

    const tick = setTick(() => {
      if (IsScreenFadedOut()) {
        clearTick(tick);

        resolve();
      }
    });
  });
};

export const fadeInScreen = (durationInMs: number): Promise<void> => {
  return new Promise(resolve => {
    DoScreenFadeIn(durationInMs);

    const tick = setTick(() => {
      if (IsScreenFadedIn()) {
        clearTick(tick);

        resolve();
      }
    });
  });
};
