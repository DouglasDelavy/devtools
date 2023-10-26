import { vec3 } from 'gl-matrix';

import { clamp } from '@utils/math';

import { Log } from '@modules/logger';
import { Permission } from '@modules/permission';

import { PERMISSIONS } from '@shared/permission';

import { Camera } from './camera';
import { CONTROLS } from './controls';

const DISABLED_CONTROLS = Object.values(CONTROLS);

const LOOK_SENSITIVITY = 5;

const MOVE_MULTIPLIER = 1;
const MOVE_MULTIPLIER_FAST = 5;
const MOVE_MULTIPLIER_SLOW = 5;

let _isActive: boolean;
let _isFrozen: boolean;
let _speed: number;
let _camera: Camera;

const getSpeedMultiplier = (): number => {
  const slow = GetDisabledControlNormal(0, CONTROLS.MOVE_SLOW);
  const fast = GetDisabledControlNormal(0, CONTROLS.MOVE_FAST);

  const increase = GetDisabledControlNormal(0, CONTROLS.DECREASE_SPEED);
  const decrease = GetDisabledControlNormal(0, CONTROLS.INCREASE_SPEED);

  const increaseSpeed = 1 + (0.8 - 1) * increase;
  const decreaseSpeed = 1 + (0.8 - 1) * decrease;

  _speed = clamp((_speed * increaseSpeed) / decreaseSpeed, 0.1, 100);

  const fastSpeed = 1 + (MOVE_MULTIPLIER_FAST - 1) * fast;
  const slowSpeed = 1 + (MOVE_MULTIPLIER_SLOW - 1) * slow;

  const speedMultiplier = (_speed * fastSpeed) / slowSpeed;
  const frameMultiplier = GetFrameTime() * 60;

  return speedMultiplier * frameMultiplier;
};

const getTargetEntity = (): number => {
  const playerPed = PlayerPedId();
  const vehicle = GetVehiclePedIsIn(playerPed, false);
  const isInVehicle = vehicle !== 0 && DoesEntityExist(vehicle) && GetPedInVehicleSeat(vehicle, -1) === playerPed;

  return isInVehicle ? vehicle : playerPed;
};

const disableControlsThisFrame = (): void => {
  DISABLED_CONTROLS.forEach(control => DisableControlAction(0, control, true));
};

const updateTargetPosition = (position: vec3): void => {
  if (GetFrameCount() % 60 !== 0) return;

  const entity = getTargetEntity();

  SetEntityCoords(entity, position[0], position[1], position[2], false, false, false, false);
};

const enable = (): void => {
  if (_isActive) return;

  const entity = getTargetEntity();

  const position = GetGameplayCamCoord();
  const rotation = GetGameplayCamRot(2);

  FreezeEntityPosition(entity, true);
  SetEntityVisible(entity, false, false);

  if (IsEntityAVehicle(entity)) {
    SetVehicleUndriveable(entity, true);
  }

  _camera = new Camera(position, rotation);
  RenderScriptCams(true, true, 250, true, true);

  _isActive = true;
};

const disable = (): void => {
  if (!_isActive) return;

  const entity = getTargetEntity();

  const position = _camera.getPosition();
  const rotation = _camera.getRotation();

  SetEntityVisible(entity, true, false);
  FreezeEntityPosition(entity, false);

  if (IsEntityAVehicle(entity)) {
    SetVehicleUndriveable(entity, false);
  }

  SetEntityHeading(entity, rotation[2]);
  SetEntityCoords(entity, position[0], position[1], position[2], false, false, false, false);

  _camera.destroy();
  _camera = undefined;

  RenderScriptCams(false, true, 250, true, true);

  _isActive = false;
};

const isActive = (): boolean => {
  return _isActive;
};

const setPosition = (x: number, y: number, z: number): void => {
  if (!_isActive) return;

  setFrozen(true);

  _camera.setPosition(x, y, z);

  setTimeout(() => {
    setFrozen(false);
  }, 100);
};

const setRotation = (x: number, y: number, z: number): void => {
  if (!_isActive) return;

  setFrozen(true);

  _camera.setRotation(x, y, z);

  setTimeout(() => {
    setFrozen(false);
  }, 100);
};

const setFrozen = (state: boolean): void => {
  _isFrozen = state;
};

const command = (): void => {
  if (!Permission.isAllowed(PERMISSIONS.NOCLIP)) return;

  _isActive ? disable() : enable();
};

const start = (): void => {
  _isActive = false;
  _isFrozen = false;
  _speed = MOVE_MULTIPLIER;

  RegisterCommand('noclip', command, false);

  Log.debug(`[FREECAM] Module started`);
};

const tick = (): void => {
  if (!_isActive || _isFrozen || IsPauseMenuActive()) return;

  disableControlsThisFrame();

  const [vecX, vecY] = _camera.getMatrix();
  const vecZ = vec3.fromValues(0, 0, 1);

  const speed = getSpeedMultiplier();

  const mouseX = GetDisabledControlNormal(0, CONTROLS.LOOK_UP_DOWN);
  const mouseY = GetDisabledControlNormal(0, CONTROLS.LOOK_LEFT_RIGHT);
  const moveUp = GetDisabledControlNormal(0, CONTROLS.MOVE_UP);
  const moveDown = GetDisabledControlNormal(0, CONTROLS.MOVE_DOWN);

  const moveX = GetDisabledControlNormal(0, CONTROLS.MOVE_X);
  const moveY = GetDisabledControlNormal(0, CONTROLS.MOVE_Y);
  const moveZ = moveDown - moveUp;

  const moveXMultiplied = moveX * speed;
  const moveXVec = vec3.fromValues(moveXMultiplied, moveXMultiplied, moveXMultiplied);

  const moveYMultiplied = -moveY * speed;
  const moveYVec = vec3.fromValues(moveYMultiplied, moveYMultiplied, moveYMultiplied);

  const moveZMultiplied = moveZ * speed;
  const moveZVec = vec3.fromValues(moveZMultiplied, moveZMultiplied, moveZMultiplied);

  let rotation = _camera.getRotation() as vec3;
  let position = _camera.getPosition() as vec3;

  position = vec3.add(position, position, vec3.multiply(vecX, vecX, moveXVec));
  position = vec3.add(position, position, vec3.multiply(vecY, vecY, moveYVec));
  position = vec3.add(position, position, vec3.multiply(vecZ, vecZ, moveZVec));

  rotation = [rotation[0] + -mouseX * LOOK_SENSITIVITY, rotation[1], rotation[2] + -mouseY * LOOK_SENSITIVITY];

  _camera.setPosition(position[0], position[1], position[2]);
  _camera.setRotation(rotation[0], rotation[1], rotation[2]);

  updateTargetPosition(position);
};

const shutdown = (): void => {
  disable();

  _isActive = undefined;
  _isFrozen = undefined;
  _speed = undefined;

  Log.debug(`[FREECAM] Module stopped`);
};

export const Freecam = {
  enable,
  disable,
  isActive,
  setPosition,
  setRotation,

  start,
  tick,
  shutdown,
};
