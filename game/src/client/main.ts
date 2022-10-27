import { Debugger } from './modules/debugger';
import { Menu } from './modules/menu';
import { RunCode } from './modules/run-code';
import { UI } from './modules/ui';

const RESOURCE_NAME = GetCurrentResourceName();

let _tick: number;

setTimeout(() => {
  UI.start();

  Debugger.start();
  RunCode.start();
  Menu.start();

  _tick = setTick(() => {
    Debugger.tick();
  });
}, 0);

on('onResourceStop', (resourceName: string) => {
  if (resourceName !== RESOURCE_NAME) return;

  if (_tick) {
    clearTick(_tick);
    _tick = undefined;
  }

  UI.shutdown();
  RunCode.shutdown();
  Debugger.shutdown();
  Menu.shutdown();
});
