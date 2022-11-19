import { UI } from '@modules/ui';

import { fadeOutScreen } from '@utils/screen';
import { loadScene } from '@utils/scene';
import { loadColisionAroundEntity } from '@utils/collision';

import { parseJSON } from '@shared/utils/parse';
import { generate } from '@shared/utils/snowflake';

const TELEPORT_ITEMS_KVP_KEY = 'devtools:teleport:items';

const getTargetEntity = (): number => {
  const playerPed = PlayerPedId();
  const vehicle = GetVehiclePedIsIn(playerPed, false);
  const isInVehicle = vehicle !== 0 && DoesEntityExist(vehicle) && GetPedInVehicleSeat(vehicle, -1) === playerPed;

  return isInVehicle ? vehicle : playerPed;
};

const getCoordsForTargetEntity = (): number[] => {
  const entity = getTargetEntity();

  return GetEntityCoords(entity, false);
};

const findSafeCoordsToTeleport = async (entity: number, position: number[]): Promise<number[] | undefined> => {
  for (let zz = 950.0; zz >= 0; zz -= 25) {
    let z = zz;

    if (zz % 2 !== 0) {
      z = 950 - zz;
    }

    RequestCollisionAtCoord(position[0], position[1], z);

    await loadScene([position[0], position[1], z], [0, 0, 0], 50);

    SetEntityCoords(entity, position[0], position[1], z, false, false, false, true);

    await loadColisionAroundEntity(entity);

    const [isFound, groundZ] = GetGroundZFor_3dCoord(position[0], position[1], z, false);

    if (isFound) {
      return [position[0], position[1], groundZ];
    }
  }
};

const teleportEntityWithSafeMode = async (entity: number, position: number[]): Promise<void> => {
  const startPosition = GetEntityCoords(entity, false);

  FreezeEntityPosition(entity, true);
  await fadeOutScreen(500);

  const safePosition = await findSafeCoordsToTeleport(entity, position);
  if (safePosition) {
    SetEntityCoords(entity, safePosition[0], safePosition[1], safePosition[2], false, false, false, true);
  } else {
    SetEntityCoords(entity, startPosition[0], startPosition[1], startPosition[2], false, false, false, true);
  }

  FreezeEntityPosition(entity, false);

  DoScreenFadeIn(500);
  SetGameplayCamRelativePitch(0, 1);
};

const teleportEntityWithoutSafeMode = (entity: number, position: number[]): void => {
  SetEntityCoords(entity, position[0], position[1], position[2], false, false, false, true);
};

const teleport = (position: number[], safeMode = false): void => {
  const entity = getTargetEntity();

  safeMode ? teleportEntityWithSafeMode(entity, position) : teleportEntityWithoutSafeMode(entity, position);
};

const teleportToWaypoint = (): void => {
  const isWaypointActive = IsWaypointActive();
  if (!isWaypointActive) return;

  const waypointBlip = GetFirstBlipInfoId(GetWaypointBlipEnumId());
  const position = GetBlipInfoIdCoord(waypointBlip);

  teleport(position, true);
};

const getItems = (): Teleport.Item[] => {
  return parseJSON<Teleport.Item[]>(GetResourceKvpString(TELEPORT_ITEMS_KVP_KEY)) || [];
};

const setItems = (items: Teleport.Item[]): void => {
  SetResourceKvp(TELEPORT_ITEMS_KVP_KEY, JSON.stringify(items));
};

const addItem = (item: Teleport.CreateItem): string => {
  const items = getItems();
  const id = generate();

  items.push({ ...item, id });

  setItems(items);

  return id;
};

const removeItem = (id: string): void => {
  const items = getItems();

  const index = items.findIndex(item => item.id === id);
  if (index <= 0) return;

  items.splice(index, 1);

  setItems(items);
};

const toggleItemSpawnPoint = (id: string): void => {
  const items = getItems();

  const item = items.find(item => item.id === id);
  if (!item) return;

  const currentSpawnPoint = items.find(item => item.isSpawnPoint);
  if (currentSpawnPoint && currentSpawnPoint.id !== id) {
    currentSpawnPoint.isSpawnPoint = false;
    item.isSpawnPoint = true;
  } else {
    item.isSpawnPoint = !item.isSpawnPoint;
  }

  setItems(items);
};

const teleportToSpawnPoint = (): void => {
  const items = getItems();

  const item = items.find(item => item.isSpawnPoint);
  if (!item) return;

  teleport(item.coords, false);
};

const start = (): void => {
  UI.register('teleport:getCoords', getCoordsForTargetEntity);

  UI.register('teleport:start', teleport);
  UI.register('teleport:waypoint', teleportToWaypoint);

  UI.register('teleport:getItems', getItems);
  UI.register('teleport:add', addItem);
  UI.register('teleport:toggleSpawnPoint', toggleItemSpawnPoint);
  UI.register('teleport:remove', removeItem);

  on('playerSpawned', teleportToSpawnPoint);
};

const shutdown = (): void => {
  removeEventListener('playerSpawned', teleportToSpawnPoint);
};

export const Teleport = {
  start,
  shutdown,
};
