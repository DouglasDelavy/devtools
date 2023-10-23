import { UI } from '@modules/ui';
import { loadModel } from '@utils/model';

import { Decorations } from './decorations';
import { Outfits } from './outfits';
import { Cameras } from './cameras';
import { Components } from './components';
import { Props } from './props';

export const DEFAULT_PED_COMPONENTS = [
  { id: 1, drawable: 0, texture: 0 },
  { id: 3, drawable: 15, texture: 0 },
  { id: 4, drawable: 21, texture: 0 },
  { id: 6, drawable: 34, texture: 0 },
  { id: 7, drawable: 0, texture: 0 },
  { id: 8, drawable: 15, texture: 0 },
  { id: 9, drawable: 0, texture: 0 },
  { id: 10, drawable: 0, texture: 0 },
  { id: 11, drawable: -1, texture: 0 },
];

export const PED_MODEL_TO_CHARACTER_TYPE = {
  [GetHashKey('player_zero')]: 0,
  [GetHashKey('player_one')]: 1,
  [GetHashKey('player_two')]: 2,
  [GetHashKey('mp_m_freemode_01')]: 3,
  [GetHashKey('mp_f_freemode_01')]: 4,
};

const setPedComponent = (ped: number, component: Appearance.Component): void => {
  SetPedComponentVariation(ped, component.id, component.drawable, component.texture, 0);
};

const setPedProp = (ped: number, prop: Appearance.Prop): void => {
  SetPedPropIndex(ped, prop.id, prop.drawable, prop.texture, false);
};

const clearAllPedComponents = (ped: number): void => {
  DEFAULT_PED_COMPONENTS.forEach(component => setPedComponent(ped, component));
};

const onClearAllPedComponents = (): void => {
  const playerPed = PlayerPedId();

  clearAllPedComponents(playerPed);
};

const onSetPlayerModel = async (model: string): Promise<void> => {
  const playerId = PlayerId();
  const modelHash = GetHashKey(model);

  await loadModel(modelHash);

  SetPlayerModel(playerId, modelHash);
  SetPedDefaultComponentVariation(PlayerPedId());
};

const start = (): void => {
  Outfits.start();
  Decorations.start();
  Cameras.start();
  Components.start();
  Props.start();

  UI.register('appearance:clearPedComponents', onClearAllPedComponents);
  UI.register('appearance:model', onSetPlayerModel);
};

const shutdown = (): void => {
  Props.shutdown();
  Components.shutdown();
  Cameras.shutdown();
  Decorations.shutdown();
  Outfits.shutdown();
};

export const Appearance = {
  start,
  shutdown,

  setPedComponent,
  clearAllPedComponents,
  setPedProp,
};
