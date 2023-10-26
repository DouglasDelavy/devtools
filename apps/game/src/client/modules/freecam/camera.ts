import { vec3 } from 'gl-matrix';

import { clamp, eulerToMatrix } from '@utils/math';

const CAMERA_NAME = 'DEFAULT_SCRIPTED_CAMERA';

export class Camera {
  private _handle: number;
  private _matrix: [vec3, vec3, vec3];

  constructor(position: number[], rotation: number[], fov = 50) {
    this._handle = CreateCam(CAMERA_NAME, true);

    this.setPosition(position[0], position[1], position[2]);
    this.setRotation(rotation[0], rotation[1], rotation[2]);
    this.setFov(fov);
  }

  public getMatrix(): [vec3, vec3, vec3] {
    return this._matrix;
  }

  public getPosition(): number[] {
    return GetCamCoord(this._handle);
  }

  public setPosition(x: number, y: number, z: number): void {
    LockMinimapPosition(x, y);

    SetFocusPosAndVel(x, y, z, 0, 0, 0);
    SetCamCoord(this._handle, x, y, z);
  }

  public getRotation(): number[] {
    return GetCamRot(this._handle, 2);
  }

  public setRotation(x: number, y: number, z: number): void {
    const rotation = Camera.clampRotation(x, y, z);

    LockMinimapAngle(Math.floor(rotation[2]));
    SetCamRot(this._handle, rotation[0], rotation[1], rotation[2], 2);

    this._matrix = eulerToMatrix(rotation);
  }

  public setFov(value: number): void {
    const fov = clamp(value, 0, 90);

    SetCamFov(this._handle, fov);
  }

  public isActive(): boolean {
    return IsCamActive(this._handle);
  }

  public destroy(): void {
    if (!DoesCamExist(this._handle)) return;

    DestroyCam(this._handle, false);

    ClearFocus();
    UnlockMinimapPosition();
    UnlockMinimapAngle();
  }

  public static clampRotation(x: number, y: number, z: number): number[] {
    const outX = clamp(x, -90, 90);
    const outY = y % 360;
    const outZ = z % 360;

    return [outX, outY, outZ];
  }
}
