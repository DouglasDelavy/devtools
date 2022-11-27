import { vec3 } from 'gl-matrix';

import { Settings } from '@modules/settings';
import { Permission } from '@modules/permission';

import { PERMISSIONS } from '@shared/permission';

const KVP_RESOURCE_KEY = 'tracker';

const DISTANCE_TO_TRACK_ENTITY = 10.0;

const TEXT_ENTRY_KEY = 'TRACKED_OBJECT_TEXT';
const TEXT_ENTRY_TEXT = 'Entity: ~1~ ~n~ Model: ~1~ ~n~ Network: ~a~ ~n~ Mission Entity: ~a~ ~n~ Visible: ~a~';

let _displaying: boolean;
let _trackedObjects: Set<number>;

const trackNearestObjectsTick = (): void => {
  if (GetFrameCount() % 60 !== 0) return;

  _trackedObjects.clear();

  const playerPed = PlayerPedId();
  const playerPedCoords = GetEntityCoords(playerPed, false) as vec3;
  const objects: number[] = GetGamePool('CObject');

  objects.forEach(entity => {
    const entityCoords = GetEntityCoords(entity, false) as vec3;
    const distanceToPlayerPed = vec3.distance(playerPedCoords, entityCoords);

    if (distanceToPlayerPed < DISTANCE_TO_TRACK_ENTITY) {
      _trackedObjects.add(entity);
    }
  });
};

const drawTrackedObjectsTick = (): void => {
  _trackedObjects.forEach(entity => {
    if (!IsEntityOnScreen(entity)) return;
    const entityCoords = GetEntityCoords(entity, false);

    const [onScreen, screenX, screenY] = World3dToScreen2d(entityCoords[0], entityCoords[1], entityCoords[2]);
    if (onScreen) {
      SetTextScale(0.35, 0.35);
      SetTextFont(4);
      SetTextCentre(true);
      SetTextProportional(true);
      SetTextColour(255, 255, 255, 215);

      BeginTextCommandDisplayText(TEXT_ENTRY_KEY);
      AddTextComponentInteger(entity);

      const model = GetEntityModel(entity);
      AddTextComponentInteger(model);

      const isNetwork = String(NetworkGetEntityIsNetworked(entity));
      AddTextComponentString(isNetwork);

      const isMissionEntity = IsEntityAMissionEntity(entity);
      AddTextComponentString(String(isMissionEntity));

      const isVisible = IsEntityVisible(entity);
      AddTextComponentString(String(isVisible));

      EndTextCommandDisplayText(screenX, screenY);
    }
  });
};

const hide = (): void => {
  if (!_displaying) return;

  _displaying = false;

  Settings.setBool(KVP_RESOURCE_KEY, _displaying);
};

const display = (): void => {
  if (_displaying) return;

  if (!Permission.isAllowed(PERMISSIONS.TRACKER)) return;

  _displaying = true;

  Settings.setBool(KVP_RESOURCE_KEY, _displaying);
};

const command = (): void => {
  _displaying ? hide() : display();
};

const start = (): void => {
  _displaying = Settings.getBool(KVP_RESOURCE_KEY);

  _trackedObjects = new Set();

  RegisterCommand('cl_tracker', command, false);

  AddTextEntry(TEXT_ENTRY_KEY, TEXT_ENTRY_TEXT);
};

const tick = (): void => {
  if (!_displaying) return;

  drawTrackedObjectsTick();

  trackNearestObjectsTick();
};

const shutdown = (): void => {
  _trackedObjects.clear();

  _displaying = undefined;
  _trackedObjects = undefined;
};

export const Tracking = {
  start,
  tick,
  shutdown,
};
