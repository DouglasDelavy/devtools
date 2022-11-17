/* eslint-disable @typescript-eslint/no-explicit-any */

import { generate } from '../../shared/utils/snowflake';

const EVENT_TIMEOUT_IN_MS = 15 * 1000;

export function emitPromise<T = unknown>(eventName: string, ...args: any[]): Promise<T> {
  return new Promise((resolve, reject) => {
    const eventUniqueId = generate();
    const listenEventName = `${eventName}:${eventUniqueId}`;

    const timeout = setTimeout(() => {
      removeEventListener(listenEventName, event);
      reject(`${eventName} has timed out after ${EVENT_TIMEOUT_IN_MS} ms`);
    }, EVENT_TIMEOUT_IN_MS);

    const event = (data: T): void => {
      removeEventListener(listenEventName, event);
      clearTimeout(timeout);
      resolve(data);
    };

    onNet(listenEventName, event);
    emitNet(eventName, eventUniqueId, ...args);
  });
}
