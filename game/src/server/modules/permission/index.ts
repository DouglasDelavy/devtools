import { Log } from '@modules/logger';

import { PERMISSIONS } from '@shared/permission';

const PERMISSION_ENABLED_CONVAR = 'sv_devtools_permissions';

const _permissions = Object.values(PERMISSIONS);

const isEnabled = (): boolean => {
  return GetConvar(PERMISSION_ENABLED_CONVAR, 'false') === 'true';
};

const isPlayerAllowed = (playerServerId: string, permission: string): boolean => {
  if (!isEnabled()) return true;

  return IsPlayerAceAllowed(playerServerId, permission);
};

const setPermissionsForPlayer = (playerServerId: number): void => {
  const playerServerIdAsString = playerServerId.toString();
  const permissions = _permissions.filter(permission => isPlayerAllowed(playerServerIdAsString, permission));

  emitNet('devtools:client:setPermissions', playerServerId, permissions);
};

const onRequestPermission = (): void => {
  const playerServerId = source;

  setPermissionsForPlayer(playerServerId);
};

const start = (): void => {
  onNet('devtools:server:requestPermissions', onRequestPermission);

  Log.debug('[PERMISSION] module started');
};

const shutdown = (): void => {
  removeEventListener('devtools:server:requestPermissions', onRequestPermission);

  Log.debug('[PERMISSION] module destroyed');
};

export const Permission = {
  start,
  isPlayerAllowed,
  setPermissionsForPlayer,
  shutdown,
};
