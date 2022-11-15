import { Log } from '@modules/logger';

let _permissions: string[];

const isAllowed = (permission: string[] | string): boolean => {
  if (!_permissions) return false;

  if (Array.isArray(permission)) {
    return _permissions.some(perm => permission.includes(perm));
  }

  return _permissions.includes(permission);
};

const setPermissions = (permissions: string[]): void => {
  _permissions = permissions;
};

const get = (): string[] => _permissions;

const start = (): void => {
  _permissions = [];

  onNet('devtools:client:setPermissions', setPermissions);

  emitNet('devtools:server:requestPermissions');

  Log.debug('[PERMISSION] module started');
};

const shutdown = (): void => {
  _permissions = undefined;

  removeEventListener('devtools:client:setPermissions', setPermissions);

  Log.debug('[PERMISSION] module destroyed');
};

export const Permission = {
  get,
  isAllowed,
  start,
  shutdown,
};
