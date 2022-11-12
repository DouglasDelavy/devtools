import { UI } from '../ui';

let _density: World.Density;

const setDensity = (density: World.Density): void => {
  _density = density;
};

const getDensity = (): World.Density => {
  return _density;
};

const start = (): void => {
  UI.register('world:getDensity', getDensity);
  UI.register('world:setDensity', setDensity);
};

const tick = (): void => {
  if (!_density) return;

  SetVehicleDensityMultiplierThisFrame(_density.vehicle);
  SetRandomVehicleDensityMultiplierThisFrame(_density.randomVehicle);
  SetParkedVehicleDensityMultiplierThisFrame(_density.parkedVehicle);

  SetPedDensityMultiplierThisFrame(_density.ped);
  SetScenarioPedDensityMultiplierThisFrame(_density.scenarioPed, _density.scenarioPed);
};

const shutdown = (): void => {
  _density = undefined;
};

export const WorldDensity = {
  start,
  tick,
  shutdown,
};
