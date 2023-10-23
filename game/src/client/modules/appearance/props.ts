import { UI } from '@modules/ui';

import { getShopPedProp } from './shop';

const PROPS = [0, 1, 2, 6, 7];

const getPedPropName = (ped: number, propId: number, drawable: number, texture: number): string => {
  const propHash = GetHashNameForProp(ped, propId, drawable, texture);
  if (propHash === 0) return;

  const shopProp = getShopPedProp(propHash);
  if (!shopProp) return;

  return GetLabelText(shopProp.textLabel);
};

const onGetProps = () => {
  const playerPed = PlayerPedId();
  const components = [];

  PROPS.forEach(id => {
    const drawable = GetPedPropIndex(playerPed, id);
    const texture = GetPedPropTextureIndex(playerPed, id);
    const maxDrawables = GetNumberOfPedPropDrawableVariations(playerPed, id) - 1;
    const maxTextures = GetNumberOfPedPropTextureVariations(playerPed, id, drawable) - 1;

    components.push({ id, drawable, texture, maxTextures, maxDrawables });
  });

  return components;
};

const onSetProp = ({ propId, drawable, texture }) => {
  const playerPed = PlayerPedId();
  const maxTextures = GetNumberOfPedPropTextureVariations(playerPed, propId, drawable) - 1;
  const propName = getPedPropName(playerPed, propId, drawable, texture);

  if (drawable === -1) {
    ClearPedProp(playerPed, propId);
  } else {
    SetPedPropIndex(playerPed, propId, drawable, texture, false);
  }

  return { maxTextures, propName };
};

const start = (): void => {
  UI.register('appearance:getProps', onGetProps);
  UI.register('appearance:setProp', onSetProp);
};

const shutdown = (): void => {
  //
};

export const Props = {
  start,
  shutdown,
};
