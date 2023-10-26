import { Log } from '@modules/logger';
import { Permission } from '@modules/permission';
import { PERMISSIONS } from '@shared/permission';

const onDeleteEntity = (networkId: number): void => {
  const serverId = global.source;

  if (!Permission.isPlayerAllowed(serverId.toString(), PERMISSIONS.ENTITY_DELETE)) return;

  const entity = NetworkGetEntityFromNetworkId(networkId);
  if (DoesEntityExist(entity)) {
    DeleteEntity(entity);

    Log.debug(`[ENTITY] Deleting entity ${entity} with networkId ${networkId}`);
  }
};

const start = (): void => {
  onNet('devtools:server:deleteEntity', onDeleteEntity);
};

const shutdown = (): void => {
  removeEventListener('devtools:server:deleteEntity', onDeleteEntity);
};

export const Entity = {
  start,
  shutdown,
};
