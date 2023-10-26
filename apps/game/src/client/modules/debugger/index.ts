import { UI } from '@modules/ui';
import { Log } from '@modules/logger';
import { Settings } from '@modules/settings';
import { Permission } from '@modules/permission';

import { PERMISSIONS } from '@shared/permission';

const UI_RESOURCE_NAME = 'debugger';
const KVP_RESOURCE_KEY = 'debugger';

let _displaying: boolean;

const formatVec3 = (vector: number[]): string => {
  return `x: ${vector[0].toFixed(2)} y: ${vector[1].toFixed(2)} z: ${vector[2].toFixed(2)}`;
};

const update = (): void => {
  const playerId = PlayerId();
  const playerPed = PlayerPedId();

  const playerStamina = GetPlayerStamina(playerId);

  const playerPedHealth = GetEntityHealth(playerPed);
  const playerPedArmor = GetPedArmour(playerPed);
  const playerPedSpeed = GetEntitySpeed(playerPed);
  const playerPedModel = GetEntityModel(playerPed);
  const [, playerPedWeapon] = GetCurrentPedWeapon(playerPed, true);

  const playerPedPos = GetEntityCoords(playerPed, false);
  const playerPedRot = GetEntityRotation(playerPed, 2);

  const gameTimer = GetGameTimer();
  const frameCount = GetFrameCount();

  UI.emit('debugger:data', {
    health: playerPedHealth,
    armor: playerPedArmor,
    stamina: Math.floor(playerStamina),
    speed: Math.floor(playerPedSpeed),
    model: playerPedModel,
    weapon: playerPedWeapon,
    position: formatVec3(playerPedPos),
    rotation: formatVec3(playerPedRot),
    game_timer: gameTimer,
    frame_count: frameCount,
  });
};

const hide = (): void => {
  if (!_displaying) return;

  _displaying = false;

  UI.hide(UI_RESOURCE_NAME);
  Settings.setBool(KVP_RESOURCE_KEY, _displaying);

  Log.debug(`[DEBUGGER] hide UI`);
};

const display = (): void => {
  if (_displaying) return;

  if (!Permission.isAllowed(PERMISSIONS.DEBUGGER)) return;

  _displaying = true;

  UI.display(UI_RESOURCE_NAME);
  Settings.setBool(KVP_RESOURCE_KEY, _displaying);

  Log.debug(`[DEBUGGER] display UI`);
};

const command = (): void => {
  _displaying ? hide() : display();
};

const onUILoaded = (): void => {
  if (!_displaying) return;

  UI.display(UI_RESOURCE_NAME);
};

const start = (): void => {
  _displaying = Settings.getBool(KVP_RESOURCE_KEY);

  RegisterCommand('cl_debugger', command, false);

  on('ui:loaded', onUILoaded);

  Log.debug(`[DEBUGGER] module started`);
};

const tick = (): void => {
  if (!_displaying) return;

  if (GetFrameCount() % 30 === 0) {
    update();
  }
};

const shutdown = (): void => {
  _displaying = false;

  removeEventListener('ui:loaded', onUILoaded);

  Log.debug(`[DEBUGGER] module destroyed`);
};

export const Debugger = {
  start,
  tick,
  shutdown,
};
