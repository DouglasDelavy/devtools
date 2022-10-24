import { Log } from '../../utils/logger';

import { UI } from '../ui';

const UI_RESOURCE_NAME = 'debugger';
const KVP_RESOURCE_KEY = 'cl_debugger';

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
  const [_, playerPedWeapon] = GetCurrentPedWeapon(playerPed, true);

  const playerPedPos = GetEntityCoords(playerPed, false);
  const playerPedRot = GetEntityRotation(playerPed, 2);

  UI.emit('debugger:data', {
    health: playerPedHealth,
    armor: playerPedArmor,
    stamina: Math.floor(playerStamina),
    speed: Math.floor(playerPedSpeed),
    model: playerPedModel,
    weapon: playerPedWeapon,
    position: formatVec3(playerPedPos),
    rotation: formatVec3(playerPedRot),
  });
};

const hide = (): void => {
  if (!_displaying) return;

  _displaying = false;

  UI.hide(UI_RESOURCE_NAME);

  SetResourceKvpInt(KVP_RESOURCE_KEY, Number(_displaying));

  Log.debug(`[DEBUGGER] hide UI`);
};

const display = (): void => {
  if (_displaying) return;

  _displaying = true;

  UI.display(UI_RESOURCE_NAME);

  SetResourceKvpInt(KVP_RESOURCE_KEY, Number(_displaying));

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
  _displaying = Boolean(GetResourceKvpInt(KVP_RESOURCE_KEY));

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
