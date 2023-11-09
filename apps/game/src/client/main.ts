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
import { Freecam } from '@modules/freecam';
import { Tracking } from '@modules/tracking';
import { Sound } from '@modules/sounds';
import { Appearance } from '@modules/appearance';
import { Timecycle } from '@modules/timecycle';

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
  Freecam.start();
  Tracking.start();
  Sound.start();
  Appearance.start();
  Timecycle.start();

  _tick = setTick(() => {
    Debugger.tick();
    World.tick();
    Freecam.tick();
    Tracking.tick();
  });
}, 0);

on('onResourceStop', (resourceName: string) => {
  if (resourceName !== RESOURCE_NAME) return;

  if (_tick) {
    clearTick(_tick);
    _tick = undefined;
  }

  Timecycle.shutdown();
  RunCode.shutdown();
  Debugger.shutdown();
  Menu.shutdown();
  Animation.shutdown();
  Entity.shutdown();
  World.shutdown();
  Vehicle.shutdown();
  Teleport.shutdown();
  Freecam.shutdown();
  Tracking.shutdown();
  Sound.shutdown();
  Appearance.shutdown();

  Permission.shutdown();
  UI.shutdown();
});
