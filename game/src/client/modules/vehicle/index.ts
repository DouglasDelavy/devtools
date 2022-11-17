import { emitPromise } from '@utils/rpc';
import { loadModel } from '@utils/model';
import { waitForNetworkIdExist } from '@utils/network';

import { UI } from '@modules/ui';
import { Log } from '@modules/logger';

const createVehicleServerSetter = async (modelHash: number, position: number[], heading: number): Promise<number> => {
  const vehicleNetworkId = await emitPromise<number>('devtools:createVehicle', modelHash, position, heading);
  const networkIdExist = await waitForNetworkIdExist(vehicleNetworkId);

  if (!networkIdExist) return 0;

  return NetworkGetEntityFromNetworkId(vehicleNetworkId);
};

const createVehicleClientSetter = async (
  modelHash: number,
  position: number[],
  heading: number,
  isNetworked: boolean,
  isScriptHost: boolean,
): Promise<number> => {
  const modelLoaded = await loadModel(modelHash);
  if (!modelLoaded) return 0;

  return CreateVehicle(modelHash, position[0], position[1], position[2], heading, isNetworked, isScriptHost);
};

const create = async ({
  model,
  position,
  heading = 0.0,
  isNetworked = false,
  isScriptHost = false,
  isServerSetter = false,
}: Vehicle.Create): Promise<number> => {
  const modelHash = typeof model === 'string' ? GetHashKey(model) : model;

  return isServerSetter
    ? createVehicleServerSetter(modelHash, position, heading)
    : createVehicleClientSetter(modelHash, position, heading, isNetworked, isScriptHost);
};

const onCreate = async ({ model, inside, isNetworked, isScriptHost, isServerSetter }): Promise<number> => {
  const playerPed = PlayerPedId();
  const heading = GetEntityHeading(playerPed);
  const position = GetOffsetFromEntityInWorldCoords(playerPed, 0.0, 5.0, 0.0);

  const vehicleIndex = await Vehicle.create({ model, position, heading, isServerSetter, isNetworked, isScriptHost });
  if (!vehicleIndex) return 0;

  if (inside) {
    SetPedIntoVehicle(playerPed, vehicleIndex, -1);
  }

  Log.info(`[VEHICLE] Created vehicle ${model} with index ${vehicleIndex}`);

  return vehicleIndex;
};

const getVehiclePedIsIn = (): number => {
  const playerPed = PlayerPedId();

  return GetVehiclePedIsIn(playerPed, false);
};

const getModels = (): string[] => {
  return GetAllVehicleModels();
};

const start = (): void => {
  UI.register('vehicle:getPedIsIn', getVehiclePedIsIn);
  UI.register('vehicle:getModels', getModels);
  UI.register('vehicle:create', onCreate);
};

const shutdown = (): void => {
  // TODO
};

export const Vehicle = {
  create,

  start,
  shutdown,
};
