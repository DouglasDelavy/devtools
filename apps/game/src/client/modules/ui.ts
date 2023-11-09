const emit = (eventName: string, ...args: unknown[]): void => {
  SendNUIMessage({ type: eventName, payload: args });
};

const display = (resourceName: string): void => {
  emit('renderResource', resourceName, true);
};

const hide = (resourceName: string): void => {
  emit('renderResource', resourceName, false);
};

const register = (name: string, handler: (data: unknown) => unknown): void => {
  RegisterNuiCallbackType(name);

  on(`__cfx_nui:${name}`, async (data: unknown, callback: (data: unknown) => void) => {
    const response = await Promise.resolve(handler(data));

    callback(response);
  });
};

const unregister = (name: string): void => {
  UnregisterRawNuiCallback(name);
};

const focus = (hasFocus: boolean, hasCursor: boolean, keepInput = false): void => {
  SetNuiFocus(hasFocus, hasCursor);
  SetNuiFocusKeepInput(keepInput);
};

const onLoaded = (): void => {
  TriggerEvent('ui:loaded');
};

const start = (): void => {
  UI.register('ui:loaded', onLoaded);
};

const shutdown = (): void => {
  // TODO
};

export const UI = {
  display,
  hide,
  register,
  unregister,
  emit,
  focus,
  start,
  shutdown,
};
