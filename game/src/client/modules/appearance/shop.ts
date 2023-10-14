import { getString } from '@utils/buffer';

const GET_SHOP_PED_QUERY_OUTFIT = '0x6d793f03a631fe56';
const GET_SHOP_PED_OUTFIT = '0xB7952076E444979D';
const GET_SHOP_PED_OUTFIT_COMPONENT_VARIANT = '0x19F2A026EDF0013F';
const GET_SHOP_PED_OUTFIT_PROP_VARIANT = '0xA9F9C2E0FDE11CBB';

const GET_SHOP_PED_COMPONENT = '0x74C0E2A57EC66760';
const GET_SHOP_PED_PROP = '0x5D5CAFF661DDF6FC';

const GET_TATTOO_SHOP_DLC_ITEM_DATA = '0xFF56381874F82086';

export const getTattooShopDlcItemData = (
  characterType: number,
  index: number,
  buffer: ArrayBuffer,
  bufferArray: Uint32Array,
): Appearance.ShopPedTattoo => {
  Citizen.invokeNative(GET_TATTOO_SHOP_DLC_ITEM_DATA, characterType, index, bufferArray);

  const { 0: unk1, 2: unk2, 4: tattooCollectionHash, 6: tattooNameHash, 8: unk3, 10: zoneId, 12: unk4 } = bufferArray;

  return {
    unk1,
    unk2,
    tattooCollectionHash,
    tattooNameHash,
    unk3,
    zoneId,
    unk4,
    textLabel: getString(buffer, 56),
  };
};

export const getTattooShopDlcItems = (characterType: number): Appearance.ShopPedTattoo[] => {
  const max = GetNumTattooShopDlcItems(characterType);
  if (max === 0) return;

  const result: Appearance.ShopPedTattoo[] = [];

  // Reusable Buffer
  const buffer = new ArrayBuffer(120);
  const bufferArray = new Uint32Array(buffer);

  for (let i = 0; i < max; i++) {
    result.push(getTattooShopDlcItemData(characterType, i, buffer, bufferArray));

    bufferArray.fill(0);
  }

  return result;
};

const getShopPedQueryOutfit = (
  index: number,
  buffer: ArrayBuffer,
  bufferArray: Uint32Array,
): Appearance.ShopPedOutfit => {
  Citizen.invokeNative(GET_SHOP_PED_QUERY_OUTFIT, index, bufferArray);

  const { 0: lockHash, 2: hash, 4: price, 6: totalProps, 8: totalComponents, 10: unk2, 12: unk3 } = bufferArray;

  return {
    lockHash,
    hash,
    price,
    totalProps,
    totalComponents,
    unk2,
    unk3,
    textLabel: getString(buffer, 56),
  };
};

export const getShopPedQueryOutfits = (characterType: number): Appearance.ShopPedOutfit[] => {
  const max = SetupShopPedOutfitQuery(characterType, false);
  if (max === 0) return;

  const result: Appearance.ShopPedOutfit[] = [];

  // Reusable Buffer
  const buffer = new ArrayBuffer(120);
  const bufferArray = new Uint32Array(buffer);

  for (let i = 0; i < max; i++) {
    result.push(getShopPedQueryOutfit(i, buffer, bufferArray));

    bufferArray.fill(0);
  }

  return result;
};

export const getShopPedOutfit = (outfitHash: number): Appearance.ShopPedOutfit => {
  const buffer = new ArrayBuffer(120);
  const bufferArray = new Uint32Array(buffer);

  Citizen.invokeNative(GET_SHOP_PED_OUTFIT, outfitHash, bufferArray);

  const { 0: lockHash, 2: hash, 4: price, 6: totalProps, 8: totalComponents, 10: unk2, 12: unk3 } = bufferArray;

  return {
    lockHash,
    hash,
    price,
    totalProps,
    totalComponents,
    unk2,
    unk3,
    textLabel: getString(buffer, 56),
  };
};

export const getShopPedOutfitComponentVariant = (
  outfitHash: number,
  index: number,
): Appearance.ShopPedComponentVariant => {
  const buffer = new ArrayBuffer(20);
  const bufferArray = new Uint32Array(buffer);

  Citizen.invokeNative(GET_SHOP_PED_OUTFIT_COMPONENT_VARIANT, outfitHash, index, bufferArray);

  const { 0: hash, 2: enumValue, 4: componentType } = bufferArray;

  return { hash, enumValue, componentType };
};

export const getShopPedOutfitPropVariant = (outfitHash: number, index: number): Appearance.ShopPedPropVariant => {
  const buffer = new ArrayBuffer(20);
  const bufferArray = new Uint32Array(buffer);

  Citizen.invokeNative(GET_SHOP_PED_OUTFIT_PROP_VARIANT, outfitHash, index, bufferArray);

  const { 0: hash, 2: enumValue, 4: componentType } = bufferArray;

  return { hash, enumValue, componentType };
};

export const getShopPedComponent = (componentHash: number): Appearance.ShopPedComponent => {
  const buffer = new ArrayBuffer(136);
  const bufferArray = new Uint32Array(buffer);

  Citizen.invokeNative(GET_SHOP_PED_COMPONENT, componentHash, bufferArray);

  const {
    0: lockHash,
    2: uniqueNameHash,
    4: locate,
    6: drawableIndex,
    8: textureIndex,
    10: unk1,
    12: eCompType,
    14: unk2,
    16: unk3,
  } = bufferArray;

  return {
    lockHash,
    uniqueNameHash,
    locate,
    drawableIndex,
    textureIndex,
    unk1,
    eCompType,
    unk2,
    unk3,
    textLabel: getString(buffer, 72),
  };
};

export const getShopPedProp = (propHash: number): Appearance.ShopPedProp => {
  const buffer = new ArrayBuffer(136);

  const bufferArray = new Uint32Array(buffer);

  Citizen.invokeNative(GET_SHOP_PED_PROP, propHash, bufferArray);

  const {
    0: lockHash,
    2: uniqueNameHash,
    4: locate,
    6: propIndex,
    8: textureIndex,
    10: unk1,
    12: eAnchorPoint,
    14: unk2,
    16: unk3,
  } = bufferArray;

  return {
    lockHash,
    uniqueNameHash,
    locate,
    propIndex,
    textureIndex,
    unk1,
    eAnchorPoint,
    unk2,
    unk3,
    textLabel: getString(buffer, 72),
  };
};
