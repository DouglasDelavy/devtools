import { UI } from '@modules/ui';

import { getTattooShopDlcItems } from './shop';
import { PED_MODEL_TO_CHARACTER_TYPE } from './index';

let _decorations: Appearance.Decoration[];

const getDecorations = (): Record<number, Appearance.ShopPedTattoo[]> => {
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

const getPedDecorations = (): Appearance.Decoration[] => {
  return _decorations;
};

const setPedDecorations = (ped: number, decorations: Appearance.Decoration[]): void => {
  if (!_decorations) return;

  decorations.forEach(decoration => {
    _decorations.push({ collectionHash: decoration.collectionHash, nameHash: decoration.nameHash });

    AddPedDecorationFromHashes(ped, decoration.collectionHash, decoration.nameHash);
  });
};

const ensurePedDecorations = (ped: number): void => {
  ClearPedDecorations(ped);

  _decorations.forEach(decoration => AddPedDecorationFromHashes(ped, decoration.collectionHash, decoration.nameHash));
};

const addPedDecoration = ({ collectionHash, nameHash }): void => {
  const playerPed = PlayerPedId();

  ensurePedDecorations(playerPed);

  AddPedDecorationFromHashes(playerPed, collectionHash, nameHash);
};

const applyPedDecoration = ({ collectionHash, nameHash }): void => {
  const index = _decorations.findIndex(
    decoration => decoration.collectionHash === collectionHash && decoration.nameHash === nameHash,
  );

  const playerPed = PlayerPedId();

  if (index >= 0) {
    _decorations.splice(index, 1);
  } else {
    _decorations.push({ collectionHash, nameHash });
  }

  ensurePedDecorations(playerPed);
};

const clearPedDecorations = (): void => {
  const playerPed = PlayerPedId();

  ClearPedDecorations(playerPed);

  _decorations.length = 0;
};

const start = (): void => {
  _decorations = [];

  UI.register('appearance:getTattoos', getDecorations);
  UI.register('appearance:clearTattoos', clearPedDecorations);
  UI.register('appearance:setTattoo', addPedDecoration);
  UI.register('appearance:applyTattoo', applyPedDecoration);
};

const shutdown = (): void => {
  _decorations = undefined;
};

export const Decorations = {
  start,
  shutdown,

  getPedDecorations,
  setPedDecorations,
};
