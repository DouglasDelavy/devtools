import { UI } from '../ui';
import { Appearance, PED_MODEL_TO_CHARACTER_TYPE } from './';

import {
  getShopPedComponent,
  getShopPedOutfitComponentVariant,
  getShopPedOutfitPropVariant,
  getShopPedProp,
  getShopPedQueryOutfits,
  getShopPedOutfit,
} from './shop';

const setPedOutfit = (ped: number, outfit: Appearance.ShopPedOutfit): void => {
  ClearAllPedProps(ped);

  Appearance.clearAllPedComponents(ped);

  for (let i = 0; i < outfit.totalComponents; i++) {
    const variant = getShopPedOutfitComponentVariant(outfit.hash, i);
    const component = getShopPedComponent(variant.hash);

    Appearance.setPedComponent(ped, {
      id: component.eCompType,
      drawable: component.drawableIndex,
      texture: component.textureIndex,
    });
  }

  for (let i = 0; i < outfit.totalProps; i++) {
    const variant = getShopPedOutfitPropVariant(outfit.hash, i);
    const prop = getShopPedProp(variant.hash);

    Appearance.setPedProp(ped, {
      id: prop.eAnchorPoint,
      drawable: prop.propIndex,
      texture: prop.textureIndex,
    });
  }
};

const getOutfits = (): Appearance.ShopPedOutfit[] => {
  const playerPed = PlayerPedId();
  const playerPedModel = GetEntityModel(playerPed);

  const characterType = PED_MODEL_TO_CHARACTER_TYPE[playerPedModel];
  if (characterType === undefined) return [];

  const outfits = getShopPedQueryOutfits(characterType);
  return outfits.map(outfit => ({ ...outfit, textLabel: GetLabelText(outfit.textLabel) }));
};

const getOutfit = (outfitHash: number): Appearance.Outfit => {
  const outfit = getShopPedOutfit(outfitHash);
  const components: Appearance.ShopPedComponent[] = [];
  const props: Appearance.ShopPedProp[] = [];

  for (let i = 0; i < outfit.totalComponents; i++) {
    const variant = getShopPedOutfitComponentVariant(outfit.hash, i);
    const component = getShopPedComponent(variant.hash);

    components.push(component);
  }

  for (let i = 0; i < outfit.totalProps; i++) {
    const variant = getShopPedOutfitPropVariant(outfit.hash, i);
    const prop = getShopPedProp(variant.hash);

    props.push(prop);
  }

  return { ...outfit, components, props };
};

const setOutfit = (outfit: Appearance.ShopPedOutfit): void => {
  const playerPed = PlayerPedId();

  setPedOutfit(playerPed, outfit);
};

const start = (): void => {
  UI.register('appearance:getOutfits', getOutfits);
  UI.register('appearance:getOutfit', getOutfit);
  UI.register('appearance:applyOutfit', setOutfit);
};

const shutdown = (): void => {
  //
};

export const Outfits = {
  start,
  shutdown,
};
