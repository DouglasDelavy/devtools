// TODO: make one way to remove this event listener
export const onPromise = (eventName: string, callback: (...args: unknown[]) => unknown): void => {
  onNet(eventName, async (eventUniqueId: string, ...args: unknown[]) => {
    const serverId = global.source;

    if (!eventUniqueId) {
      return console.warn(`Promise event (${eventName}) wrong structure called by ${serverId}`);
    }

    try {
      const requestEventName = `${eventName}:${eventUniqueId}`;
      const result = await Promise.resolve(callback(...args));

      emitNet(requestEventName, serverId, result);
    } catch (err) {
      console.error(err);
    }
  });
};
