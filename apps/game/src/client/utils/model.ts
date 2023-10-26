export const loadModel = async (model: number, timeout = 5000): Promise<boolean> => {
  if (!IsModelInCdimage(model) || !IsModelValid(model)) return false;

  return new Promise(resolve => {
    RequestModel(model);

    const endAt = GetGameTimer() + timeout;

    const interval = setInterval(() => {
      const timeoutOccurred = GetGameTimer() > endAt;
      const modelLoaded = HasModelLoaded(model);

      if (modelLoaded || timeoutOccurred) {
        clearInterval(interval);

        resolve(modelLoaded);
      }
    }, 50);
  });
};
