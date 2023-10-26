export const waitForNetworkIdExist = async (networkId: number, timeoutInMs = 5000): Promise<boolean> => {
  return new Promise(resolve => {
    const endAt = GetGameTimer() + timeoutInMs;

    const interval = setInterval(() => {
      const timeoutOccurred = GetGameTimer() > endAt;
      const networkIdExist = NetworkDoesNetworkIdExist(networkId);

      if (networkIdExist || timeoutOccurred) {
        clearInterval(interval);

        resolve(networkIdExist);
      }
    }, 50);
  });
};
