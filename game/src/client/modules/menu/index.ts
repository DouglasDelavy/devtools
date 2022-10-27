import { Log } from '../../utils/logger';

import { UI } from '../ui';

const UI_COMPONENT_NAME = 'menu';

let _displaying: boolean;

const display = (): void => {
  if (_displaying) return;

  UI.display(UI_COMPONENT_NAME);
  UI.focus(true, true);

  _displaying = true;
};

const hide = (): void => {
  if (!_displaying) return;

  UI.hide(UI_COMPONENT_NAME);
  UI.focus(false, false);

  _displaying = false;
};

const toggle = (): void => {
  _displaying ? hide() : display();
};

const start = (): void => {
  _displaying = false;

  UI.register('menu:close', hide);

  RegisterCommand('menu', toggle, false);

  Log.debug('[MENU] started component');
};

const shutdown = (): void => {
  Log.debug('[MENU] destroyed component');
};

export const Menu = {
  start,
  shutdown,
};
