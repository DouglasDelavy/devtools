const _events: Record<string, Function[]> = {};

const on = (type: string, handler: Function): void => {
  if (!_events[type]) {
    _events[type] = [handler];

    return;
  }

  if (_events[type].includes(handler)) {
    return console.warn(`This handler already declared for event ${type}`);
  }

  _events[type].push(handler);
};

const off = (type: string, handler: Function): void => {
  if (!_events[type]) return;

  const index = _events[type].indexOf(handler);
  if (index < 0) return;

  _events[type].splice(index, 1);
};

const emit = (type: string, ...payload: unknown[]): void => {
  const event = new MessageEvent('message', { data: { type, payload } });

  window.dispatchEvent(event);
};

export const Events = {
  on,
  off,
  emit,
};
