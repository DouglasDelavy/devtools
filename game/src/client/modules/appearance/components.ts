import { UI } from '@modules/ui';
import { getShopPedComponent } from './shop';

const COMPONENTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const getPedComponentName = (ped: number, componentId: number, drawable: number, texture: number): string => {
  const componentHash = GetHashNameForComponent(ped, componentId, drawable, texture);
  if (componentHash === 0) return;

  const shopComponent = getShopPedComponent(componentHash);
  if (!shopComponent) return;

  return GetLabelText(shopComponent.textLabel);
};

const onGetComponents = () => {
  const playerPed = PlayerPedId();
  const components = [];

  COMPONENTS.forEach(id => {
    const drawable = GetPedDrawableVariation(playerPed, id);
    const texture = GetPedTextureVariation(playerPed, id);
    const maxDrawables = GetNumberOfPedDrawableVariations(playerPed, id) - 1;
    const maxTextures = GetNumberOfPedTextureVariations(playerPed, id, drawable) - 1;

    components.push({ id, drawable, texture, maxTextures, maxDrawables });
  });

  return components;
};

const onSetComponent = ({ componentId, drawable, texture }) => {
  const playerPed = PlayerPedId();
  const maxTextures = GetNumberOfPedTextureVariations(playerPed, componentId, drawable) - 1;
  const componentName = getPedComponentName(playerPed, componentId, drawable, texture);

  SetPedComponentVariation(playerPed, componentId, drawable, texture, 0);

  return { maxTextures, componentName };
};

const start = (): void => {
  UI.register('appearance:getComponents', onGetComponents);
  UI.register('appearance:setComponent', onSetComponent);
};

const shutdown = (): void => {
  //
};

export const Components = {
  start,
  shutdown,
};
