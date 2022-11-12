import { Debugger } from './modules/debugger';
import { Menu } from './modules/menu';
import { RunCode } from './modules/run-code';
import { UI } from './modules/ui';
import { Animation } from './modules/animation';
import { Entity } from './modules/entity';
import { World } from './modules/world';

const RESOURCE_NAME = GetCurrentResourceName();

let _tick: number;

setTimeout(() => {
  UI.start();

  Debugger.start();
  RunCode.start();
  Menu.start();
  Animation.start();
  Entity.start();
  World.start();

  _tick = setTick(() => {
    Debugger.tick();
    World.tick();
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
  Animation.shutdown();
  Entity.shutdown();
  World.shutdown();
});
