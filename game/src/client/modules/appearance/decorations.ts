import { UI } from '@modules/ui';

import { getTattooShopDlcItems } from './shop';
import { PED_MODEL_TO_CHARACTER_TYPE } from './index';

const getPedDecorations = (): Record<number, Appearance.ShopPedTattoo[]> => {
  const playerPed = PlayerPedId();
  const playerPedModel = GetEntityModel(playerPed);

  const characterType = PED_MODEL_TO_CHARACTER_TYPE[playerPedModel];
  if (characterType === undefined) return;

  const result: Record<number, Appearance.ShopPedTattoo[]> = {};

  const tattoos = getTattooShopDlcItems(characterType);

  for (const tattoo of tattoos) {
    if (!result[tattoo.zoneId]) {
      result[tattoo.zoneId] = [];
    }

    result[tattoo.zoneId].push(tattoo);
  }

  return result;
};

const addPedDecoration = ({ collectionHash, nameHash }): void => {
  const playerPed = PlayerPedId();

  AddPedDecorationFromHashes(playerPed, collectionHash, nameHash);
};

const clearPedDecorations = (): void => {
  const playerPed = PlayerPedId();

  ClearPedDecorations(playerPed);
};

const start = (): void => {
  UI.register('appearance:getTattoos', getPedDecorations);
  UI.register('appearance:clearTattoos', clearPedDecorations);
  UI.register('appearance:applyTattoo', addPedDecoration);
};

const shutdown = (): void => {
  //
};

export const Decorations = {
  start,
  shutdown,
};
