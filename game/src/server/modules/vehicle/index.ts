import { Permission } from '@modules/permission';

import { onPromise } from '@utils/rpc';

import { PERMISSIONS } from '@shared/permission';
import { joaatString } from '@shared/utils/joaat';
import { Log } from '@modules/logger';

const CREATE_AUTOMOBILE_HASH = joaatString('CREATE_AUTOMOBILE');

const create = (modelHash: number, position: number[], heading: number): number => {
  return Citizen.invokeNative(CREATE_AUTOMOBILE_HASH, modelHash, position[0], position[1], position[2], heading);
};

const onCreateVehicle = (modelHash: number, position: number[], heading: number): number => {
  const serverId = global.source;

  if (!Permission.isPlayerAllowed(serverId.toString(), PERMISSIONS.VEHICLE_CREATE)) return 0;

  const vehicleIndex = Vehicle.create(modelHash, position, heading);
  const vehicleNetworkId = NetworkGetNetworkIdFromEntity(vehicleIndex);

  Log.debug(`[VEHICLE] create vehicle index ${vehicleIndex} networkId ${vehicleNetworkId}`);

  return vehicleNetworkId;
};

const start = (): void => {
  onPromise('devtools:createVehicle', onCreateVehicle);
};

const shutdown = (): void => {
  // TODO: remove onPromise listener
};

export const Vehicle = {
  create,
  start,
  shutdown,
};
