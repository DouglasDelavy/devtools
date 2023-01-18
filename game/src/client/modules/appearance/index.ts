import { Outfits } from './outfits';

const DEFAULT_PED_COMPONENTS = [
  { id: 1, drawable: 0, texture: 0 },
  { id: 6, drawable: 34, texture: 0 },
  { id: 7, drawable: 0, texture: 0 },
  { id: 8, drawable: 15, texture: 0 },
  { id: 9, drawable: 0, texture: 0 },
  { id: 10, drawable: 0, texture: 0 },
  { id: 11, drawable: 0, texture: 0 },
];

const setPedComponent = (ped: number, component: Appearance.Component): void => {
  SetPedComponentVariation(ped, component.id, component.drawable, component.texture, 0);
};

const setPedProp = (ped: number, prop: Appearance.Prop): void => {
  SetPedPropIndex(ped, prop.id, prop.drawable, prop.texture, false);
};

const clearAllPedComponents = (ped: number): void => {
  DEFAULT_PED_COMPONENTS.forEach(component => setPedComponent(ped, component));
};

const start = (): void => {
  Outfits.start();
};

const shutdown = (): void => {
  Outfits.shutdown();
};

export const Appearance = {
  start,
  shutdown,

  setPedComponent,
  clearAllPedComponents,
  setPedProp,
};
