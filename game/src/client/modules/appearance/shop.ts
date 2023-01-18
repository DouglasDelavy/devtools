const REPLACE_PATTERN = /\u0000/g;

const GET_SHOP_PED_QUERY_OUTFIT = '0x6d793f03a631fe56';
const GET_SHOP_PED_OUTFIT = '0xB7952076E444979D';
const GET_SHOP_PED_OUTFIT_COMPONENT_VARIANT = '0x19F2A026EDF0013F';
const GET_SHOP_PED_OUTFIT_PROP_VARIANT = '0xA9F9C2E0FDE11CBB';

const GET_SHOP_PED_COMPONENT = '0x74C0E2A57EC66760';
const GET_SHOP_PED_PROP = '0x5D5CAFF661DDF6FC';

const getString = (buffer: ArrayBuffer, offset: number, length = 64): string => {
  return String.fromCharCode.apply(null, new Uint8Array(buffer, offset, length)).replace(REPLACE_PATTERN, '');
};

const getShopPedQueryOutfit = (index: number): Appearance.ShopPedOutfit => {
  const buffer = new ArrayBuffer(128);
  const bufferArray = new Uint32Array(buffer);

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

  for (let i = 0; i < max; i++) {
    const outfit = getShopPedQueryOutfit(i);

    result.push(outfit);
  }

  return result;
};

export const getShopPedOutfit = (outfitHash: number): Appearance.ShopPedOutfit => {
  const buffer = new ArrayBuffer(128);
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
