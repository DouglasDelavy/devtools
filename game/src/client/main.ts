import { UI } from '@modules/ui';
import { Permission } from '@modules/permission';
import { Debugger } from '@modules/debugger';
import { Menu } from '@modules/menu';
import { RunCode } from '@modules/run-code';
import { Animation } from '@modules/animation';
import { Entity } from '@modules/entity';
import { World } from '@modules/world';
import { Vehicle } from '@modules/vehicle';
import { Teleport } from '@modules/teleport';

const RESOURCE_NAME = GetCurrentResourceName();

let _tick: number;

setTimeout(() => {
  UI.start();
  Permission.start();

  Debugger.start();
  RunCode.start();
  Menu.start();
  Animation.start();
  Entity.start();
  World.start();
  Vehicle.start();
  Teleport.start();

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

  RunCode.shutdown();
  Debugger.shutdown();
  Menu.shutdown();
  Animation.shutdown();
  Entity.shutdown();
  World.shutdown();
  Vehicle.shutdown();
  Teleport.shutdown();

  Permission.shutdown();
  UI.shutdown();
});
