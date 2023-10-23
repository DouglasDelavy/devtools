import { UI } from '../ui';

const DEFAULT_CAMERA_FOV = 50.0;
const CAMERAS_SETTINGS = {
  default: {
    coords: [0, 2.4, 0.2],
    point: [-0.5, 0, -0.05],
  },
  head: {
    coords: [0, 0.9, 0.65],
    point: [-0.2, 0, 0.6],
  },
  body: {
    coords: [0, 1.2, 0.2],
    point: [-0.25, 0, 0.2],
  },
  pants: {
    coords: [0, 1.2, -0.3],
    point: [-0.25, 0, -0.5],
  },
  bottom: {
    coords: [0, 0.98, -0.7],
    point: [-0.25, 0, -0.9],
  },
};

let _camera: number;

const createCamera = (): void => {
  if (_camera) return;

  const camera = CAMERAS_SETTINGS['default'];

  const playerPed = PlayerPedId();

  const cameraCoords = GetOffsetFromEntityInWorldCoords(
    playerPed,
    camera.coords[0],
    camera.coords[1],
    camera.coords[2],
  );
  const cameraPointCoords = GetOffsetFromEntityInWorldCoords(
    playerPed,
    camera.point[0],
    camera.point[1],
    camera.point[2],
  );

  _camera = CreateCamWithParams(
    'DEFAULT_SCRIPTED_CAMERA',
    cameraCoords[0],
    cameraCoords[1],
    cameraCoords[2],
    0.0,
    0.0,
    0.0,
    DEFAULT_CAMERA_FOV,
    false,
    0,
  );
  PointCamAtCoord(_camera, cameraPointCoords[0], cameraPointCoords[1], cameraPointCoords[2]);

  SetCamActive(_camera, true);
  RenderScriptCams(true, true, 1000, false, false);
};

const deleteCamera = (): void => {
  if (!_camera) return;

  RenderScriptCams(false, true, 1000, false, false);

  DestroyCam(_camera, false);
  _camera = undefined;
};

const setCameraType = (type: keyof typeof CAMERAS_SETTINGS): void => {
  if (!_camera || IsCamInterpolating(_camera)) return;

  const camera = CAMERAS_SETTINGS[type];
  if (!camera) return;

  const playerPed = PlayerPedId();
  const cameraCoords = GetOffsetFromEntityInWorldCoords(
    playerPed,
    camera.coords[0],
    camera.coords[1],
    camera.coords[2],
  );
  const cameraPointCoords = GetOffsetFromEntityInWorldCoords(
    playerPed,
    camera.point[0],
    camera.point[1],
    camera.point[2],
  );

  SetCamParams(
    _camera,
    cameraCoords[0],
    cameraCoords[1],
    cameraCoords[2],
    0.0,
    0.0,
    0.0,
    DEFAULT_CAMERA_FOV,
    750,
    0,
    0,
    2,
  );
  PointCamAtCoord(_camera, cameraPointCoords[0], cameraPointCoords[1], cameraPointCoords[2]);
};

const turnPed = (ped: number, type: 'left' | 'right'): void => {
  const coords = GetEntityCoords(ped, false);
  const targetHeading = GetEntityHeading(ped) - (type === 'left' ? 90.0 : -90.0);

  TaskGoStraightToCoord(ped, coords[0], coords[1], coords[2], 8.0, -1, targetHeading, 0.1);
};

const onToggleCamera = (): void => {
  _camera ? deleteCamera() : createCamera();
};

const onDestroyCamera = (): void => {
  deleteCamera();
};

const onSetCameraType = (type: keyof typeof CAMERAS_SETTINGS): void => {
  setCameraType(type);
};

const onTurnPed = (type: 'left' | 'right'): void => {
  const playerPed = PlayerPedId();

  turnPed(playerPed, type);
};

const start = (): void => {
  UI.register('appearance:destroyCamera', onDestroyCamera);
  UI.register('appearance:toggleCamera', onToggleCamera);
  UI.register('appearance:setCameraType', onSetCameraType);
  UI.register('appearance:turnPed', onTurnPed);
};

const shutdown = (): void => {
  deleteCamera();
};

export const Cameras = {
  start,
  shutdown,
};
